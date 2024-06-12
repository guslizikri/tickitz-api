const express = require("express");
const routers = express.Router();
const movieRoutes = require("./movie");
const scheduleRoutes = require("./schedule");
const bookingRoutes = require("./booking");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const diagramRoutes = require("./diagram");

routers.use("/movie", movieRoutes);
routers.use("/schedule", scheduleRoutes);
routers.use("/booking", bookingRoutes);
routers.use("/user", userRoutes);
routers.use("/auth", authRoutes);
routers.use("/diagram", diagramRoutes);

module.exports = routers;
