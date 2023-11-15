var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var { Schema } = mongoose;
var slugs = require("mongoose-url-slugs");

var pagesSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    Image: {
      type: String,
      required: false,
      default: null,
    },
    gallery: {
      type: Array,
      default: [],
    },
    pages: {
      type: Array,
      default: [],
    },
    // gallery: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'gallery'
    // }],
    // pages: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'pages'
    // }],
    slug: {
      type: String,
    },
    sortorder: {
      type: Number,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phonenumber: {
      type: Number,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    contactInfo: {
      type: Array,
      default: [],
    },
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebooklink: {
      type: String,
      default: "",
    },
    instalink: {
      type: String,
      default: "",
    },
    linkedinlink: {
      type: String,
      default: "",
    },
    mapembedurl: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    delstatus: {
      type: Boolean,
      default: false,
    },
    seotitle: {
      type: String,
      default: "",
    },
    seo_metadata: {
      type: String,
      default: "",
    },
    slider_templateid: {
      type: String,
      default: "s1",
    },
    bannerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banner",
      default: null,
    },
    contactInfo: {
      type: Array,
      default: [],
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    createddate: {
      type: Date,
      default: Date.now,
    },
    updatedby: {
      type: String,
      default: null,
    },
    updateddate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

pagesSchema.plugin(slugs("title"));

module.exports = mongoose.model("Pages", pagesSchema);
