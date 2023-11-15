require("express-async-errors");
const modelService = require("../services/modelService");
const aboutus = require("../models/aboutusModel");
const aboutusService = new modelService(aboutus);
const fs = require("fs");
const sharp = require("sharp");
const mongoose = require("mongoose");
const config = require('../config/config');
const { check, validationResult }
    = require('express-validator');

exports.create = async (req, res, next) => {
  let image = "";
  let bannerid = null;
  // if (!!req.file) {
  //   image = req.file.filename;
  // }

  if (!!req.body.bannerid) {
    bannerid = mongoose.Types.ObjectId(req.body.bannerid);
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.data = await aboutusService.create({
      title: req.body.title,
      description: req.body.description,
      shortdescription: req.body.shortdescription,
      ourvalue_description: req.body.ourvalue_description,
      ourvision_description: req.body.ourvision_description,
      ourvalue_points: req.body.ourvalue_points,
      // Image: image,
      status: req.body.status,
      bannerid: bannerid,
    });
    if (res.data) {
      console.log(res.data);
      try {
        // sharp(req.file.path)
        //   .resize(200, 200)
        //   .toFile(
        //     "uploads/aboutus/thumbs/" + "thumbnails-" + req.file.originalname,
        //     (err, resizeImage) => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.log(resizeImage);
        //       }
        //     }
        //   );

        return res.status(201).json({
          status: "success",
          message: "aboutus retrieved successfully",
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
exports.updateaboutus = async (req, res, next) => {
  let bannerid = null;

  if (!!req.body.bannerid) {
    bannerid = mongoose.Types.ObjectId(req.body.bannerid);
  }

  console.log(bannerid);
  aboutus.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      // if (req.file) {
      //   const path = "./uploads/aboutus/" + updateItem.Image;

      //   try {
      //     fs.unlinkSync(path);
      //     //file removed
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }

      updateItem.title = req.body.title;
      updateItem.description = req.body.description;
      updateItem.shortdescription = req.body.shortdescription;
      updateItem.updateddate = new Date();
      // if (req.file) {
      //   updateItem.Image = req.file.filename;
      // }
      updateItem.ourvalue_description = req.body.ourvalue_description;
      updateItem.ourvision_description = req.body.ourvision_description;
      updateItem.ourvalue_points = req.body.ourvalue_points;
      updateItem.status = req.body.status;
      updateItem.bannerid = bannerid;

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
exports.deleteaboutus = async (req, res, next) => {
  console.log(req.params.id);
  const data = await aboutus.findById(req.params.id, function (err, ditItem) {
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
exports.getaboutus = async (req, res) => {
  aboutus
    .findOne({
      delstatus: false,
    })
    .sort({
      sortorder: 1,
    })
    .populate("bannerid")
    .then(function (list) {
      if(!!list?.bannerid?.Image){
        list.bannerid.Image = config.api.BASE_URL+ "uploads/banner/" + list.bannerid.Image
      }
      res.json({
        status: "success",
        message: "about retrieved successfully",
        data: list,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    });
  // const aboutusdata = await aboutus.findOne( (err, result) => {

  //   console.log(result)
  //   if (err) {
  //     consosle.log(err)
  //     res.json({
  //       status: "error",
  //       message: err,
  //     });
  //   } else {
  //     res.json({
  //       status: "success",
  //       message: 'aboutus details loading..',
  //       data: result
  //     });
  //   }
  // })
};
