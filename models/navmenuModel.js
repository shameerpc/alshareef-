const mongoose = require('mongoose');
var slugs = require('mongoose-url-slugs');

const navmenuSchema = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages',
    default: null,
    index: true
  },
  slug: {
    type: String
  },
  status: {
    type: Boolean
  },
  sortorder:{
    type: String
  },
  delstatus: {
    type: Boolean,
    default: false
}
  
});
navmenuSchema.plugin(slugs('name'));

module.exports = mongoose.model('Navmenu', navmenuSchema);

