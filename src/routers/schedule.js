const express = require('express');
const routers = express.Router();
const scheduleController = require('../controllers/schedule.js');

routers.get("/", scheduleController.getSchedule);
routers.post("/", scheduleController.addSchedule);
routers.patch("/:id", scheduleController.updateSchedule);
routers.delete("/:id", scheduleController.deleteSchedule);

module.exports = routers;