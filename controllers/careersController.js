require("express-async-errors");
const modelService = require("../services/modelService");
const Careers = require("../models/careersModel");
const careersService = new modelService(Careers);
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");
const nodemailerdata = require("../middleware/nodemailer");

const config = require("../config/config");
const { check, validationResult } = require("express-validator");

exports.create = async (req, res, next) => {
  console.log(req.connection.remoteAddress);
  try {
    const MAX_USERS = 5;

    const ipAddress = req.connection.remoteAddress;
    const ipaddressCount = await Careers.countDocuments({
      ipAddress: ipAddress,
    });
    console.log(ipaddressCount);
    if (ipaddressCount >= 5) {
      return res.status(403).json({
        error: "You have exceeded the maximum number of account creations.",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let image = "";
    let bannerid = null;
    if (typeof req.file != "undefined") {
      image = req.file.filename;
    }

    if (!!req.body.bannerid) {
      bannerid = mongoose.Types.ObjectId(req.body.bannerid);
    }
    res.data = await careersService.create({
      title: req.body.title,
      ipAddress: ipAddress,
      description: req.body.description,
      Image: image,
      createdby: req.body.userId,
      sortorder: req.body.sortorder,
      status: req.body.status,
      bannerid: bannerid,
    });
    if (res.data) {
      nodemailerdata.sendEmail;

      console.log(res.data);
      try {
        if ((image = "")) {
          sharp(req.file.path)
            .resize(200, 200)
            .toFile(
              "uploads/career/thumbs/" + "thumbnails-" + req.file.originalname,
              (err, resizeImage) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(resizeImage);
                }
              }
            );
        }

        return res.status(201).json({
          status: "success",
          message: "careers retrieved successfully",
          data: res.data,
        });
      } catch (error) {
        console.error(error);
      }
      return next();
    }

    debug("Error occured while saving  data");
    throw new Error();
  } catch (error) {
    console.log(error);
  }
};

exports.updatecareer = async (req, res, next) => {
  let bannerid = null;

  if (!!req.body.bannerid) {
    bannerid = mongoose.Types.ObjectId(req.body.bannerid);
  }
  Careers.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      if (req.file) {
        const path = "./uploads/career/" + updateItem.Image;

        try {
          fs.unlinkSync(path);
          //file removed
        } catch (err) {
          console.error(err);
        }
      }

      updateItem.title = req.body.title;
      updateItem.description = req.body.description;
      updateItem.updateddate = new Date();
      if (req.file) {
        updateItem.Image = req.file.filename;
      }
      updateItem.sortorder = req.body.sortorder;
      updateItem.status = req.body.status;
      updateItem.createdby = req.body.email;
      updateItem.bannerid = req.body.bannerid;

      updateItem.save((err) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
          res.json({
            status: "success",
            message: "Updated Successfully",
            data: updateItem,
          });
        }
      });
    }
  });
};
exports.deletecareer = async (req, res, next) => {
  console.log(req.params.id);
  const data = await Careers.findById(req.params.id, function (err, ditItem) {
    if (!ditItem) {
      res.json({
        status: "error",
        message: "no record find with the given id",
      });
    }

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    ditItem.delstatus = true;
    ditItem.save(function (err) {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      } else {
        res.json({
          status: "success",
          message: "Deleted Successfully",
          data: ditItem,
        });
      }
    });
  });
};
exports.getcareer = async (req, res) => {
  Careers.findOne({
    delstatus: false,
  })
    .sort({
      sortorder: 1,
    })
    .populate("bannerid")
    .then(function (result) {
      if (!!result) {
        result.Image = config.api.BASE_URL + "uploads/career/" + result.Image;
        if (!!result?.bannerid?.Image) {
          result.bannerid.Image =
            config.api.BASE_URL + "uploads/banner/" + result.bannerid.Image;
        }
      }
      res.json({
        status: "success",
        message: "career retrieved successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    });
};
