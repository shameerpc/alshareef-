// models/EmailSubscription.js
const mongoose = require('mongoose');

const emailSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: false
},
  createddate: {
    type: Date,
    default: Date.now,
  },
  updateddate: {
    type: Date,
    default: Date.now,
  },
  unsubscribeDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('EmailSubscription', emailSubscriptionSchema);
