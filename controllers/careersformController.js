require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const careersform = require('../models/careersformModel');
const commonMethods = require('../utilities/common');
const careersformService = new modelService(careersform);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { check, validationResult }
    = require('express-validator');
const sharp= require("sharp")
const config = require('../config/config');
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "450b140558be89",
    pass: "c4ff97a7c02093"
  }
});



exports.create = async (req, res, next) => {


  try { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    let uploadyourcv="";
    if( typeof req.file != "undefined"){
        uploadyourcv=req.file.filename
      }

  res.data = await careersformService.create({
    Fullname: req.body.Fullname,
    Youremail: req.body.Youremail,
    Uploadyourcv: uploadyourcv,
    Contactno: req.body.Contactno,
    Jobtitle: req.body.Jobtitle,
    
  });
  if (res.data) {
    console.log(res.data)
    try {
     
      console.log("heloo") 
      // const mail = require('../services/mailService');
      // await  mail.sendMail; 
      let mailOptions = {
        from: 'vipitha.seeroo@yopmail.com',
        to: 'sarath@yopmail.com',
        subject: 'RECEIVED A NEW CV',
        text : `
        Name : ${ req.body.Youremail}
        Job Title : ${req.body.Jobtitle}
        Contact Number : ${req.body.Contactno}`
    };
    transport.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
      return res.status(201).json({
        status: "success",
        message: "careersform retrieved successfully",
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

exports.updatecareersform = async (req, res, next) => {
    
 
    careersform.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      if(req.file){
        
        const path = './uploads/careersform/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        
        updateItem.Fullname = req.body.Fullname;
        updateItem.Youremail = req.body.Youremail;
        updateItem.updateddate = new Date();
        if(req.file){
        updateItem.Uploadyourcv = req.file.filename
        }
        updateItem.Jobtitle = req.body.Jobtitle;

      
        updateItem.save((err) => {

            if (!err) {
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
exports.deletecareersform = async (req, res, next) => {
  console.log(req.params.id)
  const data = await careersform.findById(req.params.id, function (err, ditItem) {
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
  exports.getcareersform = (req, res) => {

    careersform.find({
              delstatus: false
          }).sort({
              sortorder: 1
          })
          .then(function (list) {
            for(i=0;i<list.length;i++){
              list[i].Image=config.api.BASE_URL+"uploads/careersform/" + list[i].Image
             }
              res.json({
                  status: "success",
                  message: "career retrieved successfully",
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
  exports.getcareersformbyid= async (req,res,next) => {
    console.log("hiicareerrs")
    const careersedata = await careersform.findOne({ _id: req.params.id }, (err, result) => {
     
      console.log(result)
      result.Image = config.api.LOCAL_URL+"uploads/careersform/" + result.Image
      console.log(result.Image)
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
          message: 'careersform details loading..',
          data: result
        });
      }
    })
  }        
  exports.getcareersformstatus= async (req,res, next)=>{
    careersform.find({
      status: true,
      delstatus: false
  }).sort({
      sortorder: 1
  })
  .then(function (list) {
    list.filter(data=>{
      data.Image = config.api.BASE_URL+ "uploads/careersform/" + data.Image;
      })
      res.json({
          status: "success",
          message: "career retrieved successfully",
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