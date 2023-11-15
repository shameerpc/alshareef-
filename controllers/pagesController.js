require("express-async-errors");

const modelService = require("../services/modelService");
const pages = require("../models/pagesModel");
const pagesService = new modelService(pages);
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");
const config = require("../config/config");
const { check, validationResult } = require("express-validator");
const Gallery = require("../models/galleryModel");

exports.create = async (req, res, next) => {
  try {
    let image = "";
    if (typeof req.file != "undefined") {
      image = req.file.filename;
    } else if(!!req.body.filename_) {
      image = req.body.filename_
    }

    let gallerysdata = [];
    let pagesdata = [];
    let bannerid = null;

    if (req.body.pages.constructor === Array) {
      pagesdata = req.body.pages;
    } else if (!!req.body.pages) {
      pagesdata = req.body.pages.split(",");
    }

    if (req.body.gallery.constructor === Array) {
      gallerysdata = req.body.gallery;
    } else if (!!req.body.gallery) {
      gallerysdata = req.body.gallery.split(",");
    }

    if (!!req.body.bannerid) {
      bannerid = mongoose.Types.ObjectId(req.body.bannerid);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.data = await pagesService.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      seotitle: req.body.seotitle,
      address: req.body.address,
      contactInfo: req.body.contactInfo,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      youtube: req.body.youtube,
      twitter: req.body.twitter,
      facebooklink: req.body.facebooklink,
      instalink: req.body.instalink,
      linkedinlink: req.body.linkedinlink,
      mapembedurl: req.body.mapembedurl,
      sortorder: req.body.sortorder ,
      gallery: gallerysdata.map((x) => mongoose.Types.ObjectId(x)),
      pages: pagesdata.map((x) => mongoose.Types.ObjectId(x)),
      Image: image,
      createdby: mongoose.Types.ObjectId(req.body.userId),
      slider_templateid: req.body.slider_templateid,
      bannerid: bannerid,
      contactInfo: req.body.contactInfo,
    });

    if (res.data) {
      try {
        if (image) {
          sharp(req.file.path)
            .resize(200, 200)
            .toFile(
              "uploads/pages/thumbs/" + "thumbnails-" + req.file.originalname,
              (err, resizeImage) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(resizeImage);
                }
              }
            );
        }
        return res.status(201).json({
          status: "success",
          message: "pages created successfully",
          data: res.data,
        });
      } catch (error) {
        console.error(error);
      }
      return next();
    }
    debug("Error occured while saving  data");
    throw new Error();
  } catch (error) {
    console.log(error);
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    let image = "";
    if (typeof req.file != "undefined") {
      image = req.file.filename;
    } 

   
      try {
        if (image) {
          sharp(req.file.path)
            .resize(200, 200)
            .toFile(
              "uploads/pages/thumbs/" + "thumbnails-" + req.file.originalname,
              (err, resizeImage) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(resizeImage);
                }
              }
            );
        }
        return res.status(201).json({
          status: "success",
          message: "pages image uploaded successfully",
          data: image,
        });
      } catch (error) {
        console.error(error);
      }
      return next();
    
  } catch (error) {
    console.log(error);
  }
};
exports.updatepage = async (req, res, next) => {
  try {
    let gallerysdata = [];
    let pagesdata = [];
    let bannerid = null;

    if (req.body.pages.constructor === Array) {
      pagesdata = req.body.pages;
    } else if (!!req.body.pages) {
      pagesdata = req.body.pages.split(",");
    }

    if (req.body.gallery.constructor === Array) {
      gallerysdata = req.body.gallery;
    } else if (!!req.body.gallery) {
      gallerysdata = req.body.gallery.split(",");
    }
    if (!!req.body.bannerid) {
      bannerid = mongoose.Types.ObjectId(req.body.bannerid);
    }
    pages.findById(req.params.id, (err, updateItem) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      } else {
        console.log(updateItem.Image);
        if (req.file) {
          const path = "./uploads/pages/" + updateItem.Image;

          try {
            fs.unlinkSync(path);
            //file removed
          } catch (err) {
            console.error(err);
          }
        }
        updateItem.title = req.body.title;
        updateItem.status = req.body.status;
        (updateItem.division = req.body.division),
          (updateItem.seotitle = req.body.seotitle),
          (updateItem.gallery = gallerysdata.map((x) =>
            mongoose.Types.ObjectId(x)
          )),
          (updateItem.pages = pagesdata.map((x) => mongoose.Types.ObjectId(x))),
          (updateItem.seo_metadata = req.body.seo_metadata);
        if (req.file) {
          updateItem.Image = req.file.filename;
        } else if(!!req.body.filename_) {
          updateItem.Image = req.body.filename_;
        }
        updateItem.description = req.body.description;
        (updateItem.address = req.body.address),
          (updateItem.phonenumber = req.body.phonenumber),
          (updateItem.email = req.body.email),
          (updateItem.youtube = req.body.youtube),
          (updateItem.twitter = req.body.twitter),
          (updateItem.facebooklink = req.body.facebooklink),
          (updateItem.instalink = req.body.instalink),
          (updateItem.linkedinlink = req.body.linkedinlink),
          (updateItem.mapembedurl = req.body.mapembedurl),
          (updateItem.updateddate = new Date());
          (updateItem.slider_templateid = req.body.slider_templateid),
          (updateItem.bannerid = bannerid),
          (updateItem.contactInfo = req.body.contactInfo);
          (updateItem.sortorder =req.body.sortorder)

        updateItem.save((err) => {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
          } else {
            res.json({
              status: "success",
              message: "Updated Successfully",
              data: updateItem,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error, "Any data");
  }
};
//   console.log(updateData)
//   const data = await pages.findOne({_id:req.params.id,delstatus:false},function(err,result){
//     if (err) {
//       res.json({status: "error", message: err, })
//   } else {
//      console.log(result);
//   }});
//   if (res.data) {

//     return next();
//   } else {
//     debug('Error occured while updating page');
//     throw new Error();
//   }
// }

// // save the contact and check for errors

exports.deletepage = async (req, res, next) => {
  console.log(req.params.id);
  const data = await pages.findById(req.params.id, function (err, ditItem) {
    if (!ditItem) {
      res.json({
        status: "error",
        message: "no record find with the given id",
      });
    }

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    ditItem.delstatus = true;
    ditItem.save(function (err) {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      } else {
        res.json({
          status: "success",
          message: "Deleted Successfully",
          data: ditItem,
        });
      }
    });
  });
};
exports.getpage = (req, res) => {
  pages
    .find({
      delstatus: false,
    })
    .sort({
      sortorder: 1,
    })
    .then(function (list) {
      for (i = 0; i < list.length; i++) {
        list[i].Image = config.api.LOCAL_URL + "uploads/pages/" + list[i].Image;
      }

      res.json({
        status: "success",
        message: "page retrieved successfully",
        data: list,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    });
};

exports.getpagebyid = async (req, res, next) => {
  pages.findById(req.params.id).then((result) => {
    console.log(result);
    if (!!result) {
      result.Image = config.api.BASE_URL + "uploads/pages/" + result.Image;
      result.gallery.Image =
        config.api.BASE_URL + "uploads/gallery/" + result.gallery.Image;
    }

    res.json({
      status: "success",
      message: "gallery details loading..",
      data: result,
    });
  });
};

exports.getpagesstatus = async (req, res, next) => {
  console.log("hi");
  //   console.log("hii");
  //   pages.find({
  //     status: true,
  //     delstatus: false
  // }).sort({
  //     sortorder: 1
  // })
  // .then(function (list) {
  //   list.filter(data=>{
  //     data.Image = config.api.BASE_URL+ "uploads/pages/" + data.Image;
  //     })
  //     res.json({
  //         status: "success",
  //         message: "pages retrieved successfully",
  //         data: list
  //     });
  // })
  // .catch((err) => {
  //     res.json({
  //         status: "error",
  //         message: err,
  //     });
  // })

  const page = pages
    .aggregate([
      {
        $match: {
          delstatus: false,
        },
        $lookup: {
          from: "gallery",
          localField: "gallery",
          foreignField: "_id",
          as: "gallery",
        },
      },
    ])
    .exec(function (err, pages) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(pages);
    });
  console.log(page);
};

exports.getbyslug = async (req, res, next) => {
  pages
    .findOne({
      delstatus: false,
      slug: req.params.slug,
    })
    .populate("bannerid")
    .then(async (data) => {
       let pages_ = [];
      let gallery_ = [];
      if(!!data.pages && !!data.pages.length){
      let  pageIds = data.pages.map((x) => mongoose.Types.ObjectId(x));
       pages_ = await pages.find({ _id: { $in: pageIds } });

      }
      if(!!data.gallery && !!data.gallery.length){
     let  galleryIds = data.gallery.map((x) => mongoose.Types.ObjectId(x));
       gallery_ = await Gallery.find({ _id: { $in: galleryIds } }).populate("page");

      }
      
      for (let item of gallery_) {
        item.Image = config.api.BASE_URL + "uploads/gallery/" + item.Image;
      }
      for (let item of pages_) {
        item.Image = config.api.BASE_URL + "uploads/pages/" + item.Image;
        let pagalleryIds = item.gallery.map((x) => mongoose.Types.ObjectId(x));
        let pagallery_ = await Gallery.find({ _id: { $in: pagalleryIds } }).populate("page");
        for (let item1 of pagallery_) {
          item1.Image = config.api.BASE_URL + "uploads/gallery/" + item1.Image;
        }
        item.gallery = pagallery_;
      }
      data.pages = pages_;
      data.gallery = gallery_;
      if (!!data.Image) {
       
        data.Image = config.api.BASE_URL + "uploads/pages/" + data.Image;
      }
      if (!!data.bannerid) {
        data.bannerid.Image =
          config.api.LOCAL_URL + "uploads/banner/" + data.bannerid.Image;
      }

      res.json({
        status: "success",
        message: "pages retrieved successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    });
};
