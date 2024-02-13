const express = require('express');
const routers = express.Router();
const bookingController = require('../controllers/booking.js');

routers.get("/", bookingController.getBooking);
routers.post("/", bookingController.addBooking);
routers.patch("/:id", bookingController.updateBooking);
routers.delete("/:id", bookingController.deleteBooking);

module.exports = routers;