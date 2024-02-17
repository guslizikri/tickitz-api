const express = require('express');
const routers = express.Router();
const movieController = require('../controllers/movie.js');
const authMiddleware = require('../middleware/auth.js');
const uploadMiddleware = require('../middleware/upload.js');


routers.get("/", authMiddleware.authentication, authMiddleware.isAdmin, movieController.getMovie);
routers.post("/", uploadMiddleware.uploadMovie, movieController.addMovie);
routers.patch("/:id",authMiddleware.authentication, movieController.updateMovie);
routers.delete("/:id", authMiddleware.authentication,  movieController.deleteMovie);

module.exports = routers;