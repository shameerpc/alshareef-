require("express-async-errors");
const modelService = require("../services/modelService");
const dotenv = require("dotenv");
const newsandblogs = require("../models/newsandblogsModel");
const commonMethods = require("../utilities/common");
const newsandblogsService = new modelService(newsandblogs);
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const sharp= require('sharp');
const mongoose = require("mongoose");
const Gallery = require("../models/galleryModel");
const fs = require("fs");
const moment = require("moment");
const config = require("../config/config");
const User = require('../models/userModel');
const { check, validationResult } = require("express-validator");


exports.create = async (req, res, next) => {

  try {
    console.log(req.body.userId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const images = req.files ? req.files.map(file => ({
      filename: file.filename,
      path: config.api.BASE_URL + file.path,
      thumbpath: config.api.BASE_URL + 'uploads/newsandblogs/thumbs/' + 'thumbnails-' + file.filename,
    })) : [];

    const newsandblogsData = {
      title: req.body.title,
      description: req.body.description,
      images: images,
      sortorder: req.body.sortorder,
      createdby: mongoose.Types.ObjectId(req.body.userId),
      seotitle: req.body.seotitle || '',
      seo_metadata: req.body.seo_metadata || '',
      status: req.body.status || 0,
      publisher: req.body.publisher || '',
    };
     
    const user = await User.findById(req.body.userId);
    console.log("user data= "+user)

    const isAdmin = user ? user.roles.includes('ADMIN') : false;
    
    if (!isAdmin) {
      newsandblogsData.status = 4;
      newsandblogsData.isapproved = true;
      newsandblogsData.published_date = new Date(); // Assuming published_date should be set to the current date for non-admin approved content
    }
    

    if (req.body.status === 2) {
      const publishdate = new Date();
      const formattedDate = moment(publishdate).format('DD/MM/YYYY');
      newsandblogsData.published_date = formattedDate;
    } else if (req.body.status === 3) {
      const unpublisheddate = new Date();
      const formattedDate = moment(unpublisheddate).format('DD/MM/YYYY');
      newsandblogsData.unpublished_date = formattedDate;
    }

    const createdNewsAndBlogs = await newsandblogsService.create(newsandblogsData);

    if (images.length > 0) {
      for (const image of images) {
        try {
          const imageFilename = image.filename;
          const imagePath = `uploads/newsandblogs/${imageFilename}`;
          const thumbPath = `uploads/newsandblogs/thumbs/thumbnails-${imageFilename}`;

          // Resize and save thumbnail
          const imageBuffer = await fs.promises.readFile(imagePath); // Use the asynchronous version
          await sharp(imageBuffer)
            .resize(200, 200)
            .toFile(thumbPath);

          console.log('Image resized:', imageFilename);
        } catch (resizeError) {
          console.error('Error resizing image:', resizeError);
        }
      }
    }

    return res.status(201).json({
      status: 'success',
      message: 'News and blogs created successfully',
      data: createdNewsAndBlogs,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};





// exports.updatenewsandblogs = async (req, res, next) => {
//   console.log("hii");
//   try {
//     const updateItem = await newsandblogs.findById(req.params.id);

//     if (!updateItem) {
//       return res.status(404).json({ status: 'error', message: 'News or blog post not found' });
//     }

//     // Check if new images are uploaded or preserve the existing ones
//     const images = req.files ? req.files.map(file => ({
//       filename: file.filename,
//       path: config.api.BASE_URL + file.path,
//       thumbpath: config.api.BASE_URL + 'uploads/newsandblogs/thumbs/' + 'thumbnails-' + file.filename,
//     })) : updateItem.images; // Preserving existing images if no new ones are uploaded

//     // Check if the status and dates are provided in the request
//     if (req.body.status === 2 || req.body.status === 3) {
//       const currentDate = new Date();
//       const formattedDate = moment(currentDate).format('DD/MM/YYYY');

//       if (req.body.status === 2) {
//         updateItem.published_date = formattedDate;
//         updateItem.unpublished_date = undefined; // Clear any existing unpublished date
//       } else {
//         updateItem.unpublished_date = formattedDate;
//         updateItem.published_date = undefined; // Clear any existing published date
//       }
//     }

//     // Update the fields
//     updateItem.title = req.body.title;
//     updateItem.description = req.body.description;
//     updateItem.images = images;
//     updateItem.createdby = req.body.userId;
//     updateItem.seotitle = req.body.seotitle;
//     updateItem.seo_metadata = req.body.seo_metadata;
//     updateItem.status = req.body.status;
//     updateItem.publisher = req.body.publisher;

//     const updatedItem = await updateItem.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'Updated Successfully',
//       data: updatedItem,
//     });
//   } catch (error) {
//     console.error('Server Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal Server Error',
//     });
//   }
// };

exports.updatenewsandblogs = async (req, res, next) => {
  console.log("hii");
  try {
    const updateItem = await newsandblogs.findById(req.params.id);

    if (!updateItem) {
      return res.status(404).json({ status: 'error', message: 'News or blog post not found' });
    }

    // Retain old images if no new ones are uploaded
    let images = updateItem.images;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        path: config.api.BASE_URL + file.path,
        thumbpath: config.api.BASE_URL + 'uploads/newsandblogs/thumbs/' + 'thumbnails-' + file.filename,
      }));
      images = images.concat(newImages); // Merge old and new images
    }

    // Check if the status and dates are provided in the request
    if (req.body.status === 2 || req.body.status === 3) {
      const currentDate = new Date();
      const formattedDate = moment(currentDate).format('DD/MM/YYYY');

      if (req.body.status === 2) {
        updateItem.published_date = formattedDate;
        updateItem.unpublished_date = undefined; // Clear any existing unpublished date
      } else {
        updateItem.unpublished_date = formattedDate;
        updateItem.published_date = undefined; // Clear any existing published date
      }
    }

    // Update the fields
    updateItem.title = req.body.title;
    updateItem.description = req.body.description;
    updateItem.images = images; // Assign the merged images
    updateItem.createdby = req.body.userId;
    updateItem.seotitle = req.body.seotitle;
    updateItem.sortorder= req.body.sortorder,
    updateItem.seo_metadata = req.body.seo_metadata;
    updateItem.status = req.body.status;
    updateItem.publisher = req.body.publisher;

    const updatedItem = await updateItem.save();



if (images.length > 0) {
  for (const image of images) {
    try {
      const imageFilename = image.filename;
      const imagePath = `uploads/newsandblogs/${imageFilename}`;
      const thumbPath = `uploads/newsandblogs/thumbs/thumbnails-${imageFilename}`;

      // Check if the image file exists before resizing
      if (fs.existsSync(imagePath)) {
        const imageBuffer = await fs.promises.readFile(imagePath);
        await sharp(imageBuffer)
          .resize(200, 200)
          .toFile(thumbPath);

        console.log('Image resized:', imageFilename);
      } else {
        console.error('Image not found:', imageFilename);
      }
    } catch (resizeError) {
      console.error('Error resizing image:', resizeError);
    }
  }
}




    res.status(200).json({
      status: 'success',
      message: 'Updated Successfully',
      data: updatedItem,
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};




exports.deletenewsandblogs = async (req, res, next) => {
  console.log(req.params.id);
  const data = await newsandblogs.findById(
    req.params.id,
    function (err, ditItem) {
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
    }
  );
};
exports.getnewsandblogsstatus = async (req, res, next) => {
  try {
    const no_of_docs_each_page = 4;
    const currentPageNumber = req.query.page || 1; // Get the current page number from query parameters (default to 1 if not provided)

    // Calculate the number of documents to skip and the limit per page
    const skip = (currentPageNumber - 1) * no_of_docs_each_page;
    const limit = no_of_docs_each_page;
    // Aggregate the data
    const newsandblog = await newsandblogs.aggregate([
      {
        $match: {
          delstatus: false,
          status: 2,
        },
      },
      {
        $lookup: {
          from: "galleries",
          localField: "gallery",
          foreignField: "_id",
          as: "gallery",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Modify the result to include image URLs
    if (newsandblog && newsandblog.length > 0) {
      newsandblog.forEach((item) => {
        if (item.gallery && item.gallery.length > 0) {
          item.gallery.forEach((image) => {
            image.Image =
              config.api.BASE_URL + "uploads/gallery/" + image.Image;
          });
        }
        // Truncate the description to 200 characters (adjust as needed)
        if (item.description && item.description.length > 200) {
          item.description = item.description.substring(0, 200) + "...";
        }
      });
    }

    // Send the modified result as a JSON response
    res.json({
      status: "success",
      message: "getnewsandblogsstatus Successfully",
      data: newsandblog,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
    console.error(err);
    next(err); // Pass the error to the next middleware or error handler
  }
};

// exports.getpage = async (req, res, next) => {
//   const filterResponse = await commonMethods.filterResponse(req.query);

//   const serviceRes = await Service.getAll(filterResponse);
//   const totalCount = await Service.totalCount();
//   if (serviceRes) {

//       const response = {
//         count: totalCount,
//         data: pageRes,
//       };
//       res.data = response;

//       return next();
//     } else {
//       debug('Error occured while fetching all pages');
//       throw new Error();
//     }
//   }
exports.getnewsandblogs = (req, res) => {
  newsandblogs
    .find({
      delstatus: false,
    })
    .sort({
      sortorder: 1,
    })
    .then(function (list) {
      // for(i=0;i<list.length;i++){
      //   list[i].Image=config.api.LOCAL_URL+"uploads/newsandblogs/" + list[i].Image
      //  }
      res.json({
        status: "success",
        message: "newsandblogs retrieved successfully",
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

exports.getnewsandblogsbyid = async (req, res, next) => {
  try {
    const result = await newsandblogs.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ status: "error", message: "News or blog post not found" });
    }

    res.json({
      status: "success",
      message: "News and blogs details loaded",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving news or blog post:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};



// Endpoint to remove specific images by their IDs from a newsandblogs post
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.imageId; // Assuming imageId is a path parameter
    const postId = req.params.postId;

    if (!imageId) {
      return res.status(400).json({ status: false, error: "Image ID is missing or invalid", code: 400 });
    }

    const post = await newsandblogs.findById(postId);

    if (!post) {
      return res.status(404).json({ status: false, error: 'News or blog post not found', code: 404 });
    }

    if (!post.images || !Array.isArray(post.images)) {
      return res.status(404).json({ status: false, error: 'No images found for this post', code: 404 });
    }

    const filteredImages = post.images.filter(image => {
      if (image && image._id) {
        return image._id.toString() !== imageId; // Filtering by imageId
      }
      return false;
    });

    post.images = filteredImages;

    const updatedPost = await post.save();

    res.status(200).json({ status: true, message: 'Image removed', post: updatedPost });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error removing image', error: error.message, code: 500 });
  }
}






exports.getrecentnewsandblogs = async (req, res, next) => {
  try {
    console.log("getrecentnewsandblogs");

    // const recentBlogs = await newsandblogs.find({ delstatus: false,status: 2 })
    // .sort({ published_date: -1 })
    // .limit(3);// Limit the results to 3 blogs

    // console.log("recentBlogs" + recentBlogs);
    const recentBlogs = await newsandblogs.aggregate([
      {
        $match: {
          delstatus: false,
          status: 2,
        },
      },
      {
        $lookup: {
          from: "galleries",
          localField: "gallery",
          foreignField: "_id",
          as: "gallery",
        },
      },
      {
        $sort: { published_date: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    // Modify the result to include image URLs
    if (recentBlogs && recentBlogs.length > 0) {
      recentBlogs.forEach((item) => {
        if (item.gallery && item.gallery.length > 0) {
          item.gallery.forEach((image) => {
            image.Image =
              config.api.BASE_URL + "uploads/gallery/" + image.Image;
          });
        }
      });
    }
    console.log(recentBlogs);

    // Respond with a JSON object containing the recent blogs
    res.json({
      status: "success",
      message: "recentBlogs details loading..",
      data: recentBlogs,
    });
  } catch (err) {
    console.error("err" + err);
    next(err); // Pass the error to the next middleware or error handler
  }
};
exports.getarchievecount = async (req, res, next) => {
  try {
    console.log(":getarchievecount");
    const counts = await newsandblogs.aggregate([
      {
        $match: {
          delstatus: false,
          status: 2,
          // published_date: { $type: "date" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createddate" },
            month: { $month: "$createddate" },
          },
          count: { $sum: 1 }, // Count the documents in each group
        },
      },
      {
        $sort: { "_id.month": 1, "_id.year": 1 }, // Sort by year and month
      },
    ]);
     console.log(counts);

    const result = counts.map((item) => ({
      month: new Date(item._id.year, item._id.month - 1, 1).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
        }
      ),
      //month:item._id.month,
      // year:item._id.year,
      count: item.count,
    }));
    console.log(result);

    res.json({
      status: "success",
      message: "archievecount details loading..",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getbyslug = async (req, res, next) => {
  try {
    const result = await newsandblogs.aggregate([
      {
        $match: { slug: req.params.slug },
      },
      {
        $lookup: {
          from: 'galleries', // The name of the "Gallery" collection
          localField: 'gallery',
          foreignField: '_id',
          as: 'gallery',
        },
      },
    ]);

    if (result && result.length > 0) {
      // Assuming you're expecting a single document
      const newsAndBlogsData = result[0];

      // To access the gallery details, you can use 'newsAndBlogsData.galleryDetails'
      newsAndBlogsData.gallery.forEach((image) => {
        //console.log('Image Path:', image.imagePath);
        // Assuming 'Image' is the field containing the image path
        image.Image = config.api.BASE_URL + "uploads/gallery/" + image.Image;
      });

      res.json({
        status: "success",
        message: "getbyslug details loaded.",
        data: newsAndBlogsData, // Return the aggregated data
      });
    } else {
      console.log('No newsandblogs found with the provided slug.');
      res.json({
        status: "error",
        message: "No newsandblogs found with the provided slug.",
        data: null,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data.",
      data: null,
    });
  }
};

  
 



