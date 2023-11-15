require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Contactus = require('../models/contactusModel');
const commonMethods = require('../utilities/common');
const contactusService = new modelService(Contactus);
const bodyParser = require('body-parser');
const { check, validationResult }
    = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const mongoose=require("mongoose");

exports.create = async (req, res, next) => {

  try { 
    
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let bannerid = null

      if (!!req.body.bannerid) {
        bannerid = mongoose.Types.ObjectId(req.body.bannerid)
      }
 
  res.data = await contactusService.create({
    title: req.body.title,
    description:req.body.description,
    facebooklink:req.body.facebooklink,
    linkedinlink:req.body.linkedinlink,
    instalink:req.body.instalink,
    twitter:req.body.twitter,
    quote:req.body.quote,
    //mapcordinates:req.body.mapcordinates,
    mapurl:req.body.mapurl,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
    mapembedurl: req.body.mapembedurl,
    Image : req.body.Image,
    bannerid : bannerid,
    contact_title : req.body.contact_title
  });
  if (res.data) {
   
      return res.status(201).json({
        status: "success",
        message: "contactus retrieved successfully",
        data: res.data
      });
  } else {
    return res.status(400).json({
      status: "error"
    });
  }
}catch (error) {
  console.log(error)
  }
}
// exports.create = async (req, res) => {

//   var Contactus = new Contactus();
//   Contactus.email = req.body.email;
//   Contactus.phonenumber = req.body.phonenumber;
//   Contactus.address = req.body.address;

//   Contactus.save((err) => {
//       if (err) {
//           res.json({
//               status: "error",
//               message: err,
//           });
//       } else {
//           res.json({
//               status: "success",
//               message: 'Successfully Created',
//               data: Contactus
//           });
//       }
//   });
// };
exports.updatecontactus = async (req, res, next) => {
  let bannerid = null

      if (!!req.body.bannerid) {
        bannerid = mongoose.Types.ObjectId(req.body.bannerid)
      }
  Contactus.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.email = req.body.email;
      updateItem.phonenumber = req.body.phonenumber;
      updateItem.title=req.body.title
      updateItem.description=req.body.description
      updateItem.quote=req.body.quote
      updateItem.facebooklink=req.body.facebooklink,
      updateItem.linkedinlink=req.body.linkedinlink,
      updateItem.instalink=req.body.instalink,
      updateItem.twitter=req.body.twitter,
      //updateItem.mapcordinates=req.body.mapcordinates
      updateItem.mapurl=req.body.mapurl
      updateItem.updateddate = new Date();
      updateItem.address = req.body.address
      updateItem.mapembedurl = req.body.mapembedurl,
      updateItem.Image = req.body.Image
      updateItem.bannerid = bannerid,
      updateItem.contact_title = req.body.contact_title

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
exports.deletecontactus = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Contactus.findById(req.params.id, function (err, ditItem) {
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
exports.getcontactus = async (req, res, next) => {
 
    Contactus.findOne({
      delstatus: false
  }).populate("bannerid")
  .then(function (list) {
     if(!!list.bannerid.Image){
      list.bannerid.Image =  config.api.BASE_URL+ "uploads/banner/" + list.bannerid.Image;
     }
    

      res.json({
          status: "success",
          message: "contact retrieved successfully",
          data: list
      });
  })
  .catch((err) => {
      res.json({
          status: "error",
          message: err,
      });
  })
    
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
  //       message: 'contactus details loading..',
  //       data: result
  //     });
  //   }
 
}
exports.getcontactusbyid = async (req, res, next) => {
  Contactus.findOne({
    _id : req.params.id ,
    delstatus: false
})
.then(function (list) {
    res.json({
        status: "success",
        message: "contact retrieved successfully",
        data: list
    });
})
.catch((err) => {
    res.json({
        status: "error",
        message: err,
    });
})
  // const contactusdata = await Contactus.findOne({_id : req.params.id }, (err, result) => {
  //   console.log("hiiii")
    
  //   if (err) {
  //     console.log("error")
  //     res.json({        status: "error",
  //       message: err,
  //     });
  //   } else {
  //     console.log("success");
  //     res.json({
  //       status: "success",
  //       message: 'contact details loading..',
  //       data: result
  //     });
  //   }
  // })
}  
exports.getcontactusstatus= async (req,res, next)=>{
  Contactus.find({
    status: true,
    delstatus: false
}).sort({
    sortorder: 1
})
.then(function (list) {
  list.filter(data=>{
    data.Image = config.api.LOCAL_URL+ "uploads/contactus/" + data.Image;
    })
    const response = Object.assign({}, list);
    res.json({
        status: "success",
        message: "Contactus retrieved successfully",
        data: response
    });
})
.catch((err) => {
    res.json({
        status: "error",
        message: err,
    });
})
}           


