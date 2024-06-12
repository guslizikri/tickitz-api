const express = require("express");
const routers = express.Router();
const diagramController = require("../controllers/diagram.js");
const authMiddleware = require("../middleware/auth.js");

routers.get(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  diagramController.getDiagram
);

module.exports = routers;
