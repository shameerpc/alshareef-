

const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
const profileService = new modelService(User);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
//const dotenv = require('dotenv');
const multer  = require('multer')
var jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/response');
const { nextTick } = require('process');
const { response } = require('express');
require("dotenv").config();
const config = require('../config/config');
const sharp = require('sharp');


// //storage

// const profile = {
//     postdata: async (req, res, next) => {
//         try {
//             if(req.file){
                
//                 User.image = req.file.path
//             }
//             // let image = req.files.image;
//             // image.mv(`./public/uploads/${Date.now()}.jpg`, (err, done) => {
//             //     if(err) {
//             //         console.log(err);
//             //     } else {
//             //         console.log(done);
//             //         console.log("image uploaded");
//             //     }
//             // });
//             // const oldUser = await Profile.findOne({ email })
//             // if (oldUser) {
//             //     return res.status(409).send("this user is already exist")
//             // }

              
              




//         } catch (err) {
//             console.log(err)
//         }
//     }
exports.updateprofile = async (req,res) => {
    const currentpasssword=req.body.currentpassword
     if(req.body.currentpasssword){
        var newpassword = await bcrypt.hash(req.body.password, 10)
      } 
     if(req.body.email){
        const oldUser = await User.findOne({ email: req.body.email })
        console.log(oldUser)
     User.findById(req.params.id, (err, updateItem) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
            console.log(updateItem)
               
              
              if(oldUser&oldUser._id != req.params.id){
             // if (oldUser) {
                  return res.status(409).send("this user is already exist")
              }
          }
          console.log(updateItem.password)
          if(currentpasssword==updateItem.password){
              const newpassword=req.body.newpassword
              updateItem.password=newpassword
          }else{
            res.status(403).send({status:false,messege:"invalid password"});
          }
         

          updateItem.username = req.body.username;
          if(req.file){
            updateItem.image= req.file.filename
          }
          updateItem.email= req.body.email;
         
          updateItem.save(function(err){

            if(err){
                res.json({
                    status: "error",
                    message: err,
                });
            }
            else{
                res.json({
                    status: "success",
                    message: 'Updated Successfully',
                    data: updateItem
                });
            }

        });
        

     })
    //   try {
    //       let updates = {
    //           ...req.body,
    //           image: req.file.filename,
    //       }

    //       if(req.body.email){
    //           const oldUser = await User.findOne({ email: req.body.email })
    //           console.log(oldUser)
    //           console.log(req.body._id)
    //           if(oldUser && oldUser._id != req.body._id){
    //          // if (oldUser) {
    //               return res.status(409).send("this user is already exist")
    //           }
    //       }
    //       if(req.body.password){
    //         updates.password = await bcrypt.hash(req.body.password, 10)
    //       }
    //        if (req.file) {
    //         try {
    //             sharp(req.file.path).resize(200, 200).toFile('uploads/profile/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log(resizeImage);
    //                 }
    //             })
    //             return res.status(201).json({
    //                 message: 'File uploded successfully'
    //             });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //            const userdata = await User.findOneAndUpdate({_id:req.body._id},{$set: updates}, { new: true })  
    //            return res.status(200).send(userdata);
    //        }else{
    //           const userdata = await User.findOneAndUpdate({_id:req.body._id},{$set: updates}, { new: true })
    //           return res.status(200).send(userdata);
    //        }
    //   } catch (error) {
    //        console.log(error)      }
           
     }
    }
exports.getuser=async (req,res,next)=>{
        console.log(req.params.id)
       const userdata =await User.findOne({_id:req.params.id},(err,result)=>{
             console.log(result.image)
             result.image=config.api.BASE_URL+"uploads/profile/"+result.image 

             if (err) {
                res.json({
                    status: "error",
                    message: err,
                }); 
            } else {
                res.json({
                    status: "success",
                    message: 'user details loading..',
                    data: result
                });
            }
       })
    }
// exports.passwordcheck=async(req,res)=>{
//     const currentpasssword=req.body.password
   
//     User.findById(req.params.id, (err, updateItem) => {
//         if (err) {
//           res.json({
//             status: "error",
//             message: err,
//           });
//         } else {
//             console.log(updateItem.password)
//             if(currentpasssword==updateItem.password){
//                 const newpassword=req.body.newpassword
//                 updateItem.password=newpassword
//                 if(err){
//                     res.json({
//                         status: "error",
//                         message: err,
//                     });
//                 }
//                 else{
//                     res.json({
//                         status: "success",
//                         message: 'Updated password Successfully',
//                         data: updateItem.password
//                     });
//                 }
//             }
              
// }    
//     })
// }


     //  User.findOne({email:req.body.email},function(err,userdata){
     //       if(userdata){
     //            res.send("this email is already exist");
     //       }else{
     //            console.log(err)
     //       }
     //  })
     //  if(req.body.password){
     //      encryptedPassword = await bcrypt.hash(password, 10)
     //  }
     //  if(req.file.filename){
     //  let data ={
     //      usename:req.body.username,
     //      password:encryptedPassword,
     //      email:req.body.password,
     //      image:req.file.filename
     //  }
     // }else{
     //      // data={
     //      //      usename:req.body.username,
     //      //      password:encryptedPassword,
     //      //      email:req.body.password,  
     //      // }
     // }
     //  User.updateOne({id:req.params._id},(data),(err,responsedata)=>{
     //       console.log(responsedata)
     //  })
     // }
    


    