const multer = require("multer");
const response = require("../utils/response");
const path = require("path");
const { error } = require("console");

const middleware = {
  uploadMovie: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/upload/movie");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
      },
    });
    const imageFilter = (req, file, cb) => {
      const allowedExtentions = [".jpeg", ".jpg", ".png"];
      const extName = path.extname(file.originalname).toLowerCase();
      const exactExt = allowedExtentions.includes(extName);
      if (exactExt) {
        return cb(null, true);
      }
      const error = new Error();
      return cb(
        "invalid file extention. Only PNG, JPG, and JPEG files are allowed",
        false
      );
    };
    const upload = multer({
      storage: storage,
      fileFilter: imageFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // Batas ukuran file (contoh: 5 MB)
      },
    }).single("image");
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return response(res, 500, err);
      } else if (err) {
        // An unknown error occurred when uploading.
        return response(res, 500, err);
      }
      // Everything went fine.
      next();
    });
  },
  uploadUser: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/upload/user");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
      },
    });
    const imageFilter = (req, file, cb) => {
      const allowedExtentions = [".jpeg", ".jpg", ".png"];
      const extName = path.extname(file.originalname).toLowerCase();
      const exactExt = allowedExtentions.includes(extName);
      if (exactExt) {
        return cb(null, true);
      }
      return cb(
        "invalid file extention. Only PNG, JPG, and JPEG files are allowed",
        false
      );
    };
    const upload = multer({
      storage: storage,
      fileFilter: imageFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // Batas ukuran file (contoh: 5 MB)
      },
    }).single("image");
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return response(res, 500, err);
      } else if (err) {
        // An unknown error occurred when uploading.
        return response(res, 500, err);
      }
      // Everything went fine.
      next();
    });
  },
};

module.exports = middleware;
