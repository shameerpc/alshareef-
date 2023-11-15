require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const navmenu = require('../models/navmenuModel');
const commonMethods = require('../utilities/common');
const navmenuService = new modelService(navmenu);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');
const mongoose=require("mongoose");

exports.create = async (req, res, next) => {
  console.log(req.body);
  console.log("hii");
  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

  if(req.body.page != ''){
    res.data = await navmenuService.create({
      name: req.body.name,
      // url: req.body.url,
      status: req.body.status,
      sortorder: req.body.sortorder,
      page: mongoose.Types.ObjectId(req.body.page),
    });
  }else{
    res.data = await navmenuService.create({
      name: req.body.name,
      // url: req.body.url,
      status: req.body.status,
      sortorder: req.body.sortorder,
    });
  }

  
  if (res.data) {
    try {
      return res.status(201).json({
        status: "success",
        message: "navmenu retrieved successfully",
        data: res.data
      });
    } catch (error) {
      console.error(error);
    }
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}catch (error) {
  console.log(error)
  }
}
exports.updatenavmenu = async (req, res, next) => {
  navmenu.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.name = req.body.name;
      // updateItem.url = req.body.url;
      updateItem.status =  req.body.status;
      updateItem.sortorder = req.body.sortorder;
      if(req.body.page != '')
      updateItem.page = mongoose.Types.ObjectId(req.body.page);

      updateItem.save((err) => {

        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
          res.json({
            status: "success",
            message: 'Updated Successfully',
            data: updateItem
          });
        }

      });
    }

  }
  )
}
exports.deletenavmenu = async (req, res, next) => {
  console.log(req.params.id)
  const data = await navmenu.findById(req.params.id, function (err, ditItem) {
    if (!ditItem) {
      res.json({
        status: "error",
        message: "no record find with the given id"
      });
    }

    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    ditItem.delstatus = true;
    ditItem.save(function (err) {

      if (err) {
        res.json({
          status: "error",
          message: err
        });
      } else {
        res.json({
          status: "success",
          message: 'Deleted Successfully',
          data: ditItem
        });
      }

    });
  })
}
// exports.getpage = async (req, res, next) => {
//   const filterResponse = await commonMethods.filterResponse(req.query);

//   const serviceRes = await Service.getAll(filterResponse);
//   const totalCount = await Service.totalCount();
//   if (serviceRes) {

//       const response = {
//         count: totalCount,
//         data: pageRes,
//       };
//       res.data = response;

//       return next();
//     } else {
//       debug('Error occured while fetching all pages');
//       throw new Error();
//     }
//   }
exports.getnavmenu = (req, res) => {
  navmenu.find({
    delstatus: false
  }).sort({
    sortorder: 1
  })
    .then(function (list) {
      for (i = 0; i < list.length; i++) {
        list[i].Image = config.api.LOCAL_URL + "uploads/navmenu/" + list[i].Image
      }
      res.json({
        status: "success",
        message: "navmenu retrieved successfully",
        data: list
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    })
};
exports.getnavmenubyid = async (req, res, next) => {
  const navmenudata = await navmenu.findOne({ _id: req.params.id }, (err, result) => {
    console.log(result)
    if (err) {
      consosle.log(err)
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: 'our navmenu details loading..',
        data: result
      });
    }
  })
}

exports.getnavmenubystatus = (req, res) => {
  navmenu.find({
    delstatus: false,
    status : true
  }).sort({
    sortorder: 1
  })
    .then(function (list) {
      for (i = 0; i < list.length; i++) {
        list[i].Image = config.api.LOCAL_URL + "uploads/navmenu/" + list[i].Image
      }
      res.json({
        status: "success",
        message: "nav menu by status retrieved successfully",
        data: list
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    })
};