const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
      },
      permissions:
       {
        type:Array,
        default: [],
       },
      delstatus: {
        type: Boolean,
        default: false
    },
      createddate: {
        type: Date,
        default: Date.now,
      },
      updateddate: {
        type: Date,
        default: null,
      },


});

module.exports = mongoose.model("Role", roleSchema);