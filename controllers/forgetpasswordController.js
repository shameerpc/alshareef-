const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
const signinService = new modelService(User);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const resetToken = jwt.sign({ userID: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    // Send an email to the user with the reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${process.env.LOCAL_URL}/reset-password/${resetToken}`,
    };

    const sendMailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    await sendMailPromise;

    return res
      .status(200)
      .json({ msg: 'Reset token generated. Check your email for instructions.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};
