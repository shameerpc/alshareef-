var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var bannerSchema = new Schema(
    {
        title: {
            type: String,
            default:""
        },
        description: {
            type: String,
            default:""

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
            required: false,
            default: null
        },
        isHomepage: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: false
        },
        createddate: {
            type: Date,
            default: Date.now
        },
        buttonurl: {
            type: String,
            default:""
        },
        buttontext: {
            type: String,
            default:""
        }


    }
);

module.exports = mongoose.model('banner', bannerSchema);  