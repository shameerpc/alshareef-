var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var ourteamSchema = new Schema(
    {

        Name: {
            type: String
        },
        designation: {
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

module.exports = mongoose.model('ourteam', ourteamSchema);