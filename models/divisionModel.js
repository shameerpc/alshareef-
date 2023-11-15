var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
// var slugs = require('mongoose-url-slugs');

var divisionSchema = new Schema(
    {
        divisionName: {
            type: String
           
        },
        is_multiple: {
            type: Number,
            index: true
        },
        description: {
            type: String
           
        },

        sortorder: {
            type: Number,
            default: null
        },
        page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pages',
            default: null,
            index: true
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
        Image: {
            type: String,
            required: false,
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
        }


    },
    {
        timestamps: true,
    }
);
// divisionSchema.plugin(slugs('title'));

module.exports = mongoose.model('division', divisionSchema);  