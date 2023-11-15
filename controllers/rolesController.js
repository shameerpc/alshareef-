require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Roles = require('../models/role.model');
const commonMethods = require('../utilities/common');
const rolesService = new modelService(Roles);
const bodyParser = require('body-parser');
const { check, validationResult }
    = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const mongoose=require("mongoose");


exports.create = async (req, res) => {
    console.log("hi");
    try {
        // Validate the request data
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a role based on the request data
        const newRole = await rolesService.create({
            name: req.body.name,
            permissions: req.body.permissions,
        });

        if (newRole) {
            return res.status(201).json({
                status: "success",
                message: "Role created successfully",
                data: newRole,
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: "Role creation failed",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred during role creation",
        });
    }
};


  exports.updateroles = (req, res) => {
    Roles.findById(req.params.id, (err, updateItem) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
           
          updateItem.name = req.body.name;
          updateItem.permissions = req.body.permissions;
    
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
  };
  
  exports.deleteroles = async (req, res, next) => {
    console.log(req.params.id)
    const data = await Roles.findById(req.params.id, function (err, ditItem) {
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

exports.getroles = async (req, res, next) => {
 
    Roles.find({
      delstatus: false
  })
  .then(function (list) {
    

      res.json({
          status: "success",
          message: "roles retrieved successfully",
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
exports.getrolesbyid = async (req, res, next) => {
  Roles.findOne({
    _id : req.params.id ,
    delstatus: false
})
.then(function (list) {
    res.json({
        status: "success",
        message: "Roles retrieved successfully",
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
        
