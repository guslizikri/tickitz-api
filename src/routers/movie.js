const express = require('express');
const routers = express.Router();
const movieController = require('../controllers/movie.js');
const authMiddleware = require('../middleware/auth.js');
const uploadMiddleware = require('../middleware/upload.js');


routers.get("/", authMiddleware.authentication, movieController.getMovie);
routers.post("/",  authMiddleware.authentication, authMiddleware.isAdmin, uploadMiddleware.uploadMovie, movieController.addMovie);
routers.patch("/:id",authMiddleware.authentication, uploadMiddleware.uploadMovie, movieController.updateMovie);
routers.delete("/:id", authMiddleware.authentication,  movieController.deleteMovie);
routers.use("/image", express.static("./public/upload/movie"));

module.exports = routers;