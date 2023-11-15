require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const division = require('../models/divisionModel');
const commonMethods = require('../utilities/common');
const divisionService = new modelService(division);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const mongoose=require("mongoose");
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');


exports.create = async (req, res, next) => {
  console.log(req.body)
  console.log(req.file.filename)
  try { 
    let image="";
    if( typeof req.file != "undefined"){
      image=req.file.filename
      }
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await divisionService.create({
    divisionName: req.body.divisionName,
    is_multiple: req.body.is_multiple,
    description: req.body.description,
    Image: image,
    page: mongoose.Types.ObjectId(req.body.page),
    createdby: req.body.userId,
    sortorder: req.body.sortorder,
    status: req.body.status,

  });
  if (res.data) {
    console.log("hiii");
    console.log(res.data)
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/division/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      console.log("heloo")
      return res.status(201).json({
        status: "success",
        message: "division retrieved successfully",
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
exports.updatedivision = async (req, res, next) => {
    division.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      if(req.file){
        
        const path = './uploads/division/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        
        updateItem.divisionName = req.body.divisionName;
        updateItem.is_multiple = req.body.is_multiple;
        updateItem.updateddate = new Date();
        if(req.file){
        updateItem.Image = req.file.filename
        }
        updateItem.sortorder = req.body.sortorder;
        updateItem.createdby = req.body.email
        updateItem.status = req.body.status
        updateItem.description = req.body.description
        updateItem.page= mongoose.Types.ObjectId(req.body.page)
      
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
exports.deletedivision = async (req, res, next) => {
  console.log(req.params.id)
  const data = await division.findById(req.params.id, function (err, ditItem) {
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
  exports.getdivision = (req, res) => {

    division.find({
              delstatus: false
          }).populate('page').sort({
              sortorder: 1
          })
          .then(function (list) {
              
               for(i=0;i<list.length;i++){
                list[i].Image= config.api.BASE_URL+"uploads/division/" + list[i].Image
               }
              res.json({
                  status: "success",
                  message: "division retrieved successfully",
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
  exports.getdivisionbyid= async (req,res,next) => {
 
    division.findById(req.params.id).populate({
      path: 'page',
      match: { delstatus: false }
  })
    .then((result)=>{
      console.log(result);
     if(!!result){
      if(!!result.Image){
        result.Image = config.api.LOCAL_URL+ "uploads/division/" + result.Image
      }
      if(!!result.page.Image){
        result.page.Image =  config.api.LOCAL_URL+ "uploads/pages/" + result.page.Image;
      }
     }

      res.json({
        status: "success",
        message: 'division details loading..',
        data: result
      });
    })
      
  }   
  exports.getdivisionstatus= async (req,res, next)=>{
    division.find({
      status: true,
      delstatus: false
  }).sort({
      sortorder: 1
  })
  .then(function (list) {
    list.filter(data=>{
      data.Image = config.api.LOCAL_URL+ "uploads/division/" + data.Image;
      })
      res.json({
          status: "success",
          message: "division retrieved successfully",
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
  