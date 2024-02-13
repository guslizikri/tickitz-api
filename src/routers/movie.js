const express = require('express');
const routers = express.Router();
const movieController = require('../controllers/movie.js');

routers.get("/", movieController.getMovie);
routers.post("/", movieController.addMovie);
routers.patch("/:id", movieController.updateMovie);
routers.delete("/:id", movieController.deleteMovie);

module.exports = routers;