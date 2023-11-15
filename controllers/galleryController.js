require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Gallery= require('../models/galleryModel');
const commonMethods = require('../utilities/common');
const galleryService = new modelService(Gallery);
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

      let payload = {
        title: req.body.title,
        Image: image,
        sortorder: req.body.sortorder,
        status: req.body.status,
       
      }

      if(!!req.body.page){
        payload.page = mongoose.Types.ObjectId(req.body.page)
              }
  res.data = await galleryService.create(payload);
  if (res.data) {
     console.log("h9i");
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/gallery/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      return res.status(201).json({
        status: "success",
        message: "gallery retrieved successfully",
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
exports.updategallery = async (req, res, next) => {
    Gallery.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
        if(req.file){
          
            const path = './uploads/gallery/'+updateItem.Image
    
            try {
              fs.unlinkSync(path)
              //file removed
            } catch(err) {
              console.error(err)
            }
          }
      updateItem.title = req.body.title;
      if(req.file){
        updateItem.Image = req.file.filename
      }  
      
      if(!!req.body.page && req.body.page != "undefined"){
        updateItem.page= mongoose.Types.ObjectId(req.body.page)
      } else {
        updateItem.page = null
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
exports.deletegallery = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Gallery.findById(req.params.id, function (err, ditItem) {
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
    // ditItem.delstatus = true;
    ditItem.delete(function (err) {

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
exports.getgallery = (req, res) => {
  Gallery.find({
            delstatus: false
        }).sort({
            sortorder: 1
        })
        .then(function (list) {
          for(i=0;i<list.length;i++){
            list[i].Image=config.api.LOCAL_URL+"uploads/gallery/" + list[i].Image
           }
            res.json({
                status: "success",
                message: "Gallery retrieved successfully",
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
exports.getgallerybyid = async (req, res, next) => {
    Gallery.findById(req.params.id).populate({
      path: 'page',
      match: { delstatus: false } 
    })
    .then((result)=>{
      console.log(result);
     if(!!result){
      if(!!result.Image){
        result.Image = config.api.BASE_URL+ "uploads/gallery/" + result.Image
      }
      if(!!result.page?.Image){
        result.page.Image =  config.api.BASE_URL+ "uploads/pages/" + result.page.Image;
      }
     }

      res.json({
        status: "success",
        message:'gallery details loading..',
        data: result
      });
    })
   
}         
exports.getgallerystatus= async (req,res, next)=>{
  Gallery.find({
    status: true,
    delstatus: false
}).sort({
    sortorder: 1
})
.then(function (list) {
  list.filter(data=>{
    data.Image = config.api.BASE_URL+ "uploads/gallery/" + data.Image;
    })
    res.json({
        status: "success",
        message: "gallery retrieved successfully",
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