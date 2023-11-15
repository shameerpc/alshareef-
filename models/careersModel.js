var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var careersSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
            
        },
        ipAddress: {
            type: String,
        },
        delstatus: {
            type: Boolean,
            default: false
        },
        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true
        },
        sortorder: {
            type: Number,
            default: "",
          },
        Image: {
            type: String,
            default: null
        },
        status: {
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
        bannerid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "banner",
            default: null,
          },


    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('careers', careersSchema);  