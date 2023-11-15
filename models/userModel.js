var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var userSchema = new Schema(
  {
    username: {
      type: 'string',
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    image: {
      type : String,
      default:null
    },
    delstatus: {
      type: Boolean,
      default: false
  },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      default:null
    }],
    lastLogin: {
      type: Date, 
      default: null
    },
    updatedby: {
      type: String,
      default: null
    },
  updateddate: {
      type: Date,
      default: null
  },
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiry:{
    type:Date,
    default:null
  },
  status: {
    type: Number,
    enum: [1, 2],
    default: 1, // 1 for enabled, 2 for disabled
  }, 

 
  },
    
      
  
  
  
  {
    timestamps: true,
  }
);

userSchema.plugin(slugs('name'));

module.exports = mongoose.model('User', userSchema);