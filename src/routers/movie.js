const express = require('express');
const routers = express.Router();
const movieController = require('../controllers/movie.js');
const authCheck = require('../middleware/auth.js');

routers.get("/", authCheck, movieController.getMovie);
routers.post("/", authCheck, movieController.addMovie);
routers.patch("/:id",authCheck, movieController.updateMovie);
routers.delete("/:id", authCheck,  movieController.deleteMovie);

module.exports = routers;