const express = require('express');
const routers = express.Router();
const movieRoutes = require('./movie');
const scheduleRoutes = require('./schedule');
const bookingRoutes = require('./booking');

routers.use("/movie", movieRoutes);
routers.use("/schedule", scheduleRoutes);
routers.use("/booking", bookingRoutes);

module.exports = routers;