var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var messagesfromexecutivesSchema = new Schema(
    {

        name: {
            type: String
        },
        designation: {
            type: String
        },
        messege: {
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
        status: {
            type: Boolean,
            default: false
        },
        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true
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


    }

);

module.exports = mongoose.model('messagesfromexecutives', messagesfromexecutivesSchema);