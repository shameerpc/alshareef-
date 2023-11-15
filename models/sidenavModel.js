const mongoose = require('mongoose');
var slugs = require('mongoose-url-slugs');

const sidenavSchema = new mongoose.Schema({
  title: {
    type: String
  },
  iconurl: {
    type: String
  },
  slug: {
    type: String
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages',
    default: null,
    index: true
  },
  status: {
    type: String
  },
  sortorder: {
    type: String,
    default: "",
  },
  delstatus: {
    type: Boolean,
    default: false
  }

});

sidenavSchema.plugin(slugs('title'));

module.exports = mongoose.model('sidenav', sidenavSchema);