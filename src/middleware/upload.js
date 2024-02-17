const multer  = require('multer');
const response = require('../utils/response');

const middleware = {
    uploadMovie : (req, res, next) => {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './public/upload/movie');
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
              console.log(file);
              console.log(uniqueSuffix);
              cb(null, file.fieldname + '-' + uniqueSuffix+ '-' + file.originalname );
            }
        });
        const upload = multer({ storage: storage }).single("image");
        upload(req, res,  (err) =>  {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              return response(res,500, err);

            } else if (err) {
              // An unknown error occurred when uploading.
              return response(res, 500, err);

            }
            // Everything went fine.
            next();
          });
    }

    
};

  
  module.exports = middleware;