var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var gallerySchema = new Schema(
    {

        title: {
            type: String
        },
        Image: {
            type: String,
            required: false,
            default: null
        },
        delstatus: {
            type: Boolean,
            default: false
        },
        page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pages',
            default: null
        },
        sortorder: {
            type: Number,
            default: "",
        },
        status: {
            type: Boolean,
            default: false
        }


    }

);

module.exports = mongoose.model('gallery', gallerySchema);