const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
const signinService = new modelService(User);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
//const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
const { check, validationResult }
    = require('express-validator');
require("dotenv").config();




// Route: Reset Password
exports.resetPassword= async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid or expired token' });
        }
         // Update password and clear reset token fields
         const hashedPassword = await bcrypt.hash(newPassword, 10);
         user.password = hashedPassword;
         user.resetToken = undefined;
         user.resetTokenExpiry = undefined;
 
         await user.save();
 
         res.status(200).json({ msg: 'Password reset successful' });
     } catch (error) {
         console.error(error);
         res.status(500).json({ msg: 'Internal Server Error' });
     }
 };

       


