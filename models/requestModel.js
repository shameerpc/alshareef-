const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
