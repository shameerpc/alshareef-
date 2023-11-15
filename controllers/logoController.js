require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const logo = require('../models/logoModel');
const commonMethods = require('../utilities/common');
const ourlogoService = new modelService(logo);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');

exports.create = async (req, res, next) => {
  console.log("hii");
  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await ourlogoService.create({
    title: req.body.title,
    logoUrl: req.file.filename
  });
  if (res.data) {
    try {
      return res.status(201).json({
        status: "success",
        message: "logo retrieved successfully",
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
// exports.updatelogo = async (req, res, next) => {
//     console.log("hello");
//     logo.findById(req.params.id, (err, updateItem) => {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     } else {
//         if(req.file){
          
//             const path = './uploads/logo/'+updateItem.Image
    
//             try {
//               fs.unlinkSync(path)
//               //file removed
//             } catch(err) {
//               console.error(err)
//             }
//           }
//       updateItem.name = req.body.name;
    
//       if(req.file){
//         updateItem.logoUrl = req.file.filename
//       }   
      
//       updateItem.save((err) => {

//         if (err) {
//           res.json({
//             status: "error",
//             message: err,
//           });
//         } else {
//           res.json({
//             status: "success",
//             message: 'Updated Successfully',
//             data: updateItem
//           });
//         }

//       });
//     }

//   }
//   )
// }
exports.updatelogo = async (req, res, next) => {
  console.log("logo")
  logo.findById(req.params.id, (err, updateItem) => {
  
  if (err) {
      res.json({
          status: "error",
          message: err,
      });
  } else {   
    if(req.file){
      
      const path = './uploads/logo/'+updateItem.logoUrl

      try {
        fs.unlinkSync(path)
        //file removed
      } catch(err) {
        console.error(err)
      }
    }
      
      updateItem.title = req.body.title;
      if(req.file){
      updateItem.logoUrl = req.file.filename
      }
    
    
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
exports.deletelogo = async (req, res, next) => {
  console.log(req.params.id)
  const data = await logo.findById(req.params.id, function (err, ditItem) {
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
exports.getlogo = async(req, res) => {
  const logodata = await logo.findOne( (err, result) => {

    
    console.log(result)
    if (err) {
      console.log(err)
      res.json({
        status: "error",
        message: err,
      });
    } else {
      console.log(result);
      if(!!result){
      result.logoUrl = config.api.BASE_URL+ "uploads/logo/" + result.logoUrl
      }
      res.json({
        status: "success",
        message: 'logo details loading..',
        data: result
      });
    }
  })
  };
    
