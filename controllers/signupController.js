require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
const signupService = new modelService(User);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken")
require("dotenv").config();
  


const signup = {

    postdata: async (req,res, next) => {
        try {
            const { username, email, password } = req.body
            if (!(username && email && password)) {
                res.status(400).send("all input is required")
            }
            const oldUser = await User.findOne({ email })
            if (oldUser) {
                res.status(409).send("this user is already exist")
            }
            encryptedPassword = await bcrypt.hash(password, 10)

            const user = await signupService.create({
                username:username,
                email:email.toLowerCase(),
                password:encryptedPassword,
                //image:req.file.filename
            });
        
            const token=jwt.sign(
                {userid:User._id,email},
                process.env.SECRET_KEY,
                {expiresIn:'2h'}
            )
            user.token=token
            return res.status(200).json(user)
            console.log(user)
            
        }
        catch(err) {
           console.log(err)
        }
    }
}
  
module.exports= signup;