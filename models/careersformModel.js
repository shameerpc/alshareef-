var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var careersformSchema = new Schema(
  {
    Fullname: {
        type: String
      },
      Youremail: {
      type: String
    },
    Contactno: {
      type: Number
    },
    Jobtitle: {
      type: String
    },
    Uploadyourcv:{
        type: String
    },
    delstatus: {
        type: Boolean,
        default: false
    },
    createddate: {
      type: Date,
      default: Date.now
    },
    updateddate: {
      type: Date,
      default: null
    }


  }
);

module.exports = mongoose.model('careersform', careersformSchema);