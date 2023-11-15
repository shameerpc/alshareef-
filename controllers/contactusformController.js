require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Contactusform = require('../models/contactusformModel');
const commonMethods = require('../utilities/common');
const contactusformService = new modelService(Contactusform);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult }
    = require('express-validator');
const config = require('../config/config');

exports.create = async (req, res, next) => {
  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  console.log("hii");
  console.log(req.body)
  res.data = await contactusformService.create({
    yourname: req.body.yourname,
    youremail: req.body.youremail,
    subject: req.body.subject,
    yourmessage: req.body.yourmessage
  });
  if (res.data) {
    console.log(res.data)
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
catch (error) {
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
exports.updatecontactusform = async (req, res, next) => {
    Contactusform.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.yourname= req.body.yourname,
      updateItem.youremail= req.body.youremail,
      updateItem.subject= req.body.subject,
      updateItem.yourmessage= req.body.yourmessage

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
exports.getcontactusform = async (req, res, next) => {
  const data = await Contactusform.find((err, result) => {
    console.log(result);
    if (result) {
      // const response = {
      //   data: result,
      // };
      res.json({
        status: "success",
        message: 'contactus details loading..',
        data: result
      });

      // return next();
    } else {
      debug('Error occured while fetching all pages');
      throw new Error();
    }
  })
}
exports.getcontactusformbyid = async (req, res, next) => {
  console.log(req)
  const contactusdata = await Contactusform.findOne({_id : req.params.id }, (err, result) => {
    console.log("hiiii")
    
       
    console.log(result)
    if (err) {
      console.log("error")
      res.json({      
        status: "error",
        message: err,
      });
    } else {
      console.log("success");
      res.json({
        status: "success",
        message: 'contact details loading..',
        data: result
      });
    }
  })
}  