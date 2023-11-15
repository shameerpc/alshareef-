require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const messagesfromexecutives= require('../models/messagesfromexecutivesModel');
const commonMethods = require('../utilities/common');
const messagesfromexecutivesService = new modelService(messagesfromexecutives);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose=require("mongoose");
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');

exports.create = async (req, res, next) => {
  try { 
    let image="";
    if( typeof req.file != "undefined"){
      image=req.file.filename
      }
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await messagesfromexecutivesService.create({
    name: req.body.name,
    Image: image,
    designation: req.body.designation,
    messege: req.body.messege,
    status: req.body.status,
    createdby:req.body.userId
  });
  if (res.data) {
     console.log("h9i");
    try {
      if(image){
      sharp(req.file.path).resize(200, 200).toFile('uploads/messegesfromexecutives/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
    }
      return res.status(201).json({
        status: "success",
        message: "leadershipteam retrieved successfully",
        data: res.data
      });
  } catch (error) {
    console.log(error);
      console.error(error);
  }
    return next();
  }
}catch (error) {
  console.log(error)
  }
}
exports.updatemessegesfromexecutives = async (req, res, next) => {
    messagesfromexecutives.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
        if(req.file){
          
            const path = './uploads/messegesfromexecutives/'+updateItem.Image
    
            try {
              fs.unlinkSync(path)
              //file removed
            } catch(err) {
              console.error(err)
            }
          }
      updateItem.name = req.body.name;
      if(req.file){
        updateItem.Image = req.file.filename
      }  
      updateItem.designation= req.body.designation
      updateItem.messege = req.body.messege
      updateItem.createdby = req.body.userId
      updateItem.status = req.body.status

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
exports.deletemessegesfromexecutives = async (req, res, next) => {
  console.log(req.params.id)
  const data = await messagesfromexecutives.findById(req.params.id, function (err, ditItem) {
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
exports.getmessegesfromexecutives = (req, res) => {
    messagesfromexecutives.find({
            delstatus: false
        }).sort({
            sortorder: 1
        })
        .then(function (list) {
          for(i=0;i<list.length;i++){
            list[i].Image=config.api.LOCAL_URL+"uploads/messegesfromexecutives/" + list[i].Image
           }
            res.json({
                status: "success",
                message: "messagesfromexecutives retrieved successfully",
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
exports.getmessegesfromexecutivesbyid = async (req, res, next) => {
    messagesfromexecutives.findById(req.params.id)
    .then((result)=>{
      console.log(result);
     if(!!result){
      result.Image = config.api.BASE_URL+ "uploads/messegesfromexecutives/" + result.Image
      
     }

      res.json({
        status: "success",
        message:'leadershipteam details loading..',
        data: result
      });
    })
   
}         
  