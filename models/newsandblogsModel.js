var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var { Schema } = mongoose;
var slugs = require("mongoose-url-slugs");

var newsandblogsSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    type: String
  },
  seotitle: {
    type: String,
    default: "",
  },
  seo_metadata: {
    type: String,
    default: "",
  },

  createddate: {
    type: Date,
    default: Date.now,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
},
  // publishedby: {
  //     type: String,
  //     default: null
  //   },
  updateddate: {
    type: Date,
    default: null,
  },
  // gallery: {
  //   type: Array,
  //   default: [],
  // },
  images: [
    {
      filename: String,
      path: String,
      thumbpath: String
      // Any other relevant image metadata (e.g., size, contentType, etc.) can be added here
    }
  ],
  delstatus: {
    type: Boolean,
    default: false,
  },

  publisher: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
  published_date: {
    type: String,
    // default: Date.now,
  },
  unpublished_date: {
    type: String,
   // default: Date.now,
  },
  sortorder: {
    type: Number,
    default: "",
},
  isapproved: {
    type: Boolean,
    default: false,
  },
  
  
  
},{
  versionKey: false // Exclude the __v field from results
});
newsandblogsSchema.plugin(slugs("title"));

module.exports = mongoose.model("newsandblogs", newsandblogsSchema);
