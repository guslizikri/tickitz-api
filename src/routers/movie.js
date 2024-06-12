const express = require('express');
const routers = express.Router();
const movieController = require('../controllers/movie.js');
const authMiddleware = require('../middleware/auth.js');
const uploadMiddleware = require('../middleware/upload.js');


// routers.get("/",  movieController.getMovie);
// routers.post("/",  authMiddleware.authentication, authMiddleware.isAdmin, uploadMiddleware.uploadMovie, movieController.addMovie);

routers.get("/",  movieController.fetchBy);
routers.get("/:id",  movieController.getDetailMovie);
routers.post("/",  authMiddleware.authentication, authMiddleware.isAdmin, uploadMiddleware.uploadMovie, movieController.save);
routers.patch("/:id",authMiddleware.authentication, authMiddleware.isAdmin, uploadMiddleware.uploadMovie, movieController.updateMovie);
routers.delete("/:id", authMiddleware.authentication, authMiddleware.isAdmin, movieController.deleteMovie);

// routers.get("/",  movieController.fetchBy);
// routers.get("/:id",  movieController.getDetailMovie);
// routers.post("/", uploadMiddleware.uploadMovie, movieController.save);
// routers.patch("/:id", uploadMiddleware.uploadMovie, movieController.updateMovie);
// routers.delete("/:id",   movieController.deleteMovie);

routers.use("/image", express.static("./public/upload/movie"));

module.exports = routers;