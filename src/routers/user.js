const express = require('express');
const routers = express.Router();
const userController = require('../controllers/user.js');

routers.get("/", userController.getUser);
routers.post("/", userController.addUser);
routers.patch("/:id", userController.updateUser);

module.exports = routers;