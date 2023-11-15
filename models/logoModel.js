const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  title: {
    type: String
  },
  logoUrl: {
    type: String,
    required: true
  },
  delstatus: {
    type: Boolean,
    default: false
},
});

const Logo = mongoose.model('Logo', logoSchema);

module.exports = Logo;