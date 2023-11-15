var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var contactusformSchema = new Schema(
  {
    yourname: {
        type: String
      },
      youremail: {
      type: String
    },
    subject: {
      type: String
    },
    yourmessage:{
        type: String
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

module.exports = mongoose.model('contactusform', contactusformSchema);