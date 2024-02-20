const express = require('express');
const routers = express.Router();
const scheduleController = require('../controllers/schedule.js');
const authMiddleware = require('../middleware/auth.js');

routers.get("/", scheduleController.getSchedule);
routers.post("/", authMiddleware.isAdmin, scheduleController.addSchedule);
routers.patch("/:id", authMiddleware.isAdmin, scheduleController.updateSchedule);
routers.delete("/:id", authMiddleware.isAdmin, scheduleController.deleteSchedule);

module.exports = routers;