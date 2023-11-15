const sharp=require("sharp")

exports.upload_thumbs = () => {
    sharp(req.file.path).resize(200, 200).toFile('uploads/aboutus/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
        if (err) {
            console.log(err);
        } else {
            console.log(resizeImage);
        }
    })
};
