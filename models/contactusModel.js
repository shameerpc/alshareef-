const { array } = require('mongoose/lib/utils');

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var contactusSchema = new Schema(
  {
    title: {
      type: 'string'
    },  
    description: {
      type: 'string'
    },
    quote: {
      type: 'string'
    },
    // mapcordinates: {
    //   type: Array
    // },
    mapembedurl: {
      type: 'string'
    },
    facebooklink: {
      type: 'string'
    },
    linkedinlink: {
      type: 'string'
    },
    instalink: {
      type: 'string'
    },
    twitter: {
      type: 'string'
    },
    mapurl: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phonenumber: {
      type: 'string'
    },
    address: {
      type: String
    },
    Image: {
      type: String,
      default: null
  },
    delstatus: {
      type: Boolean,
      default: false
    },
    createddate: {
      type: Date,
      default: Date.now
    },
    updatedby: {
      type: String,
      default: null
    },
    updateddate: {
      type: Date,
      default: null
    },
    status: {
      type: Boolean,
      default: true
  },
  bannerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banner",
    default: null,
  },
  contact_title :{
    type: 'string'
  }
  }
);

module.exports = mongoose.model('contactus', contactusSchema);