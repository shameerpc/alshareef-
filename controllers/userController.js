const modelService = require('../services/modelService');
const User = require('../models/userModel');
const userService = new modelService(User);
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require("../middleware/MailerConfig"); // Import the function


exports.create = async (req, res, next) => {
    try {
        // Validate the request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            username: req.body.username,
            email: req.body.email,
            status:req.body.status,
            password: hashedPassword,
            roles: mongoose.Types.ObjectId(req.body.roles),
        };

        const newUser = await userService.create(userData);

        if (newUser) {
            // Send the welcome email
            await sendWelcomeEmail(newUser);

            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: newUser,
            });
        } else {
            return res.status(400).json({
                status: 'error',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred during user creation',
        });
    }
};



exports.updateuser = (req, res) => {
    console.log(req.body)
    User.findById(req.params.id, (err, updateItem) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
           
          updateItem.username = req.body.username;
          updateItem.email = req.body.email;
          updateItem.status= req.body.status;
          updateItem.password = req.body.password;
          updateItem.roles = mongoose.Types.ObjectId(req.body.roles)

    
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
  
  exports.deleteuser = async (req, res, next) => {
    console.log(req.params.id)
    const data = await User.findById(req.params.id, function (err, ditItem) {
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

exports.getuser = async (req, res, next) => {
 
    User.findOne({
      delstatus: false
  })
  .then(function (list) {
    

      res.json({
          status: "success",
          message: "users retrieved successfully",
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
exports.getusersbyid = async (req, res, next) => {
  User.findOne({
    _id : req.params.id ,
    delstatus: false
})
.then(function (list) {
    res.json({
        status: "success",
        message: "Users retrieved successfully",
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