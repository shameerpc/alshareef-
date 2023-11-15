require("express-async-errors");
const modelService = require("../services/modelService");
const dotenv = require("dotenv");
const emailsubscription = require("../models/emailsubscriptionModel");
const commonMethods = require("../utilities/common");
const emailsubscriptionService = new modelService(emailsubscription);
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

exports.checkemail = async (req, res, next) => {
  try {
    const { email, status } = req.body;
    // Check if the email already exists in the database
    const existingSubscription = await emailsubscription.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newSubscription = await emailsubscriptionService.create({
      email:email,
      status: status,
      createddate: new Date(),
      updateddate: new Date(),
    });

    return res.status(201).json({
      status: "success",
      message: "newSubscription retrieved successfully",
      data: newSubscription,
    });
  } catch (error) {
    console.log(error);
  }
};
