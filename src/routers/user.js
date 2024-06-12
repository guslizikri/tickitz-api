const express = require('express');
const routers = express.Router();
const userController = require('../controllers/user.js');
const authMiddleware = require('../middleware/auth.js');
const uploadMiddleware = require('../middleware/upload.js');

// routers.get("/all", userController.getUser);
routers.get("/", authMiddleware.authentication, userController.getUserIdToken);
routers.post("/", userController.addUser);
// update profile user menggunakan decode token id yang dikirim ke req dari auth
routers.patch("/", authMiddleware.authentication, userController.updateUser);
routers.patch("/image", authMiddleware.authentication, uploadMiddleware.uploadUser, userController.updateImageUser);

// update user untuk role 
// routers.patch("/:id", authMiddleware.authentication,   userController.updateUser);

// melihat gambar user yang tersimpan di local storage
routers.use("/image", express.static("./public/upload/user"));

module.exports = routers;