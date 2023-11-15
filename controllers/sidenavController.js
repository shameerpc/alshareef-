require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const sidenav = require('../models/sidenavModel');
const commonMethods = require('../utilities/common');
const sidenavService = new modelService(sidenav);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose=require("mongoose");
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');


exports.create = async (req, res, next) => {
  console.log("hii");
  console.log(req.body);
  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await sidenavService.create({
    title: req.body.title,
    iconurl: req.body.iconurl,
    status:req.body.status,
    page: mongoose.Types.ObjectId(req.body.page),
    sortorder:req.body.sortorder
  });
  if (res.data) {
   
    try {
     
      return res.status(201).json({
        status: "success",
        message: "sidenav retrieved successfully",
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
exports.updatesidenav = async (req, res, next) => {
    sidenav.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      
               
      updateItem.page= mongoose.Types.ObjectId(req.body.page),
      updateItem.status = req.body.status;
      updateItem.sortorder = req.body.sortorder;
        updateItem.title = req.body.title;
        updateItem.iconurl = req.body.iconurl;
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

});
}
exports.deletesidenav = async (req, res, next) => {
  console.log(req.params.id)
  const data = await sidenav.findById(req.params.id, function (err, ditItem) {
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
  exports.getsidenav = (req, res) => {

    sidenav.find({
              delstatus: false
          }).sort({
              sortorder: 1
          })
          .then(function (list) {
              
             
              res.json({
                  status: "success",
                  message: "sidenav retrieved successfully",
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
  exports.getsidenavbyid= async (req,res,next) => {
    sidenav.findById(req.params.id).populate('page')
    .then((result)=>{
      console.log(result);
     if(!!result){
      result.Image = config.api.LOCAL_URL+ "uploads/division/" + result.Image
      // result.page_id.Image =  config.api.BASE_URL+ "uploads/pages/" + result.page_id.Image;
     }

      res.json({
        status: "success",
        message:'sidenav details loading..',
        data: result
      });
    })
  }   
  exports.getsidenavstatus= async (req,res, next)=>{
    sidenav.find({
      status: true,
      delstatus: false
  }).sort({
      sortorder: 1
  })
  .then(function (list) {
    list.filter(data=>{
      data.Image = config.api.BASE_URL+ "uploads/sidenav/" + data.Image;
      })
      res.json({
          status: "success",
          message: "sidenav retrieved successfully",
          data: list
      });
  })
  .catch((err) => {
      res.json({
          status: "error",
          message: err,
      });
  })
  } 
  exports.getbyslug = async (req, res, next) => {
    res.data = await sidenavService.getByslug(req.params.slug);
    if (res.data) {
      return next();
    } else {
      debug('Error occured while fetching perticular sidenavService');
    }
  }
     

  