const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footerSchema = new Schema({
  title: { type: String },
  links: { type: Array },
  delstatus: {
    type: Boolean,
    default: false
},
  // add more properties as needed
});
``
module.exports = mongoose.model('Footer', footerSchema);