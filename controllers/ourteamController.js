require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Ourteam = require('../models/ourteamModel');
const commonMethods = require('../utilities/common');
const ourteamService = new modelService(Ourteam);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const { check, validationResult }
  = require('express-validator');

exports.create = async (req, res, next) => {
  console.log("hu");
  try { 
    let image="";
    if( typeof req.file != "undefined"){
      image=req.file.filename
      }

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  res.data = await ourteamService.create({
    Name: req.body.Name,
    designation: req.body.designation,
    Image: image,
    sortorder: req.body.sortorder,
    status: req.body.status
  });
  if (res.data) {
    try {
      if(image){
      sharp(req.file.path).resize(200, 200).toFile('uploads/ourteam/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
    }
      return res.status(201).json({
        status: "success",
        message: "ourteam retrieved successfully",
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
exports.updateourteam = async (req, res, next) => {
    Ourteam.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
        if(req.file){
          
            const path = './uploads/ourteam/'+updateItem.Image
    
            try {
              fs.unlinkSync(path)
              //file removed
            } catch(err) {
              console.error(err)
            }
          }
      updateItem.Name = req.body.Name;
      updateItem.designation = req.body.designation;
      if(req.file){
        updateItem.Image = req.file.filename
      }   
      updateItem.sortorder = req.body.sortorder
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
exports.deleteourteam = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Ourteam.findById(req.params.id, function (err, ditItem) {
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
exports.getourteam = (req, res) => {
  Ourteam.find({
            delstatus: false
        }).sort({
            sortorder: 1
        })
        .then(function (list) {
          for(i=0;i<list.length;i++){
            list[i].Image=config.api.LOCAL_URL+"uploads/ourteam/" + list[i].Image
           }
            res.json({
                status: "success",
                message: "Ourteam retrieved successfully",
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
exports.getourteambyid = async (req, res, next) => {
  const ourteamdata = await Ourteam.findOne({ _id: req.params.id }, (err, result) => {

    console.log(result.Image)
    console.log(result.Image)
    result.Image = config.api.BASE_URL+"uploads/ourteam/" + result.Image
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
        message: 'our team details loading..',
        data: result
      });
    }
  })
}         
exports.getourteamsstatus= async (req,res, next)=>{
  Ourteam.find({
    status: true,
    delstatus: false
}).sort({
    sortorder: 1
})
.then(function (list) {
  list.filter(data=>{
    data.Image = config.api.BASE_URL+ "uploads/ourteam/" + data.Image;
    })
    res.json({
        status: "success",
        message: "Ourteam retrieved successfully",
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