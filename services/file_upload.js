const multer = require("multer");
const fs = require("fs");

exports.upload = (folderName) => {
  return (imageUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `uploads/${folderName}/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },

      // By default, multer removes file extensions so let's add them back
      // filename: function (req, file, cb) {
      //   cb(null, Date.now() + path.extname(file.originalname));
      // },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
      },
    }),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/
        )
      ) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(null, false);
      }
      cb(null, true);
    },
  }));
};
