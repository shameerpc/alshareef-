require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const footer = require('../models/footerModel');
const commonMethods = require('../utilities/common');
const footerService = new modelService(footer);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');


exports.create = async (req, res, next) => {
  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await footerService.create({
    title: req.body.title,
    links: req.body.links,


  });
  if (res.data) {
    console.log(res.data)
    try {
   
      return res.status(201).json({
        status: "success",
        message: "footer retrieved successfully",
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
exports.updatefooter = async (req, res, next) => {
    footer.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
     
        
        updateItem.title = req.body.title;
        updateItem.links = req.body.links

  
      
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
exports.deletefooter = async (req, res, next) => {
  console.log(req.params.id)
  const data = await footer.findById(req.params.id, function (err, ditItem) {
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
  exports.getfooter = (req, res) => {

    footer.find({
              delstatus: false
          }).sort({
              sortorder: 1
          })
          .then(function (list) {
              
            
              res.json({
                  status: "success",
                  message: "footer retrieved successfully",
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
  exports.getfooterbyid= async (req,res,next) => {
    const footerdata = await footer.findOne({ _id: req.params.id }, (err, result) => {
     
 
      if (err) {
        consosle.log(err)
        res.json({
          status: "error",
          message: err,
        });
      } else {
        res.json({
          status: "success",
          message: 'footer details loading..',
          data: result
        });
      }
    })
  }   
   