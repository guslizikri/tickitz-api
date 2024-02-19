const express = require('express');
const routers = express.Router();
const bookingController = require('../controllers/booking.js');
const authMiddleware = require('../middleware/auth.js');

routers.get("/", authMiddleware.authentication, authMiddleware.isUser, bookingController.getBooking);
routers.get("/:id", authMiddleware.authentication, authMiddleware.isUser, bookingController.getDetailBooking);
routers.post("/", authMiddleware.authentication, authMiddleware.isUser, bookingController.addBooking);
routers.patch("/:id", authMiddleware.authentication, authMiddleware.isAdmin, bookingController.updateBooking);
routers.delete("/:id", authMiddleware.authentication, authMiddleware.isAdmin, bookingController.deleteBooking);

module.exports = routers;