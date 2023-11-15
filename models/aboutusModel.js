const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  shortdescription: {
    type: String,
  },
  ourvalue_description: {
    type: String,
  },
  ourvision_description: {
    type: String,
  },
  ourvalue_points: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  delstatus: {
    type: Boolean,
    default: false,
  },
  bannerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banner",
    default: null,
  },
});
module.exports = mongoose.model("aboutus", aboutUsSchema);
