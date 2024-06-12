const model = require("../models/user");
const response = require("../utils/response");
const hashing = require("../utils/hash");
const fs = require("fs");

const controller = {
  getUser: async (req, res) => {
    try {
      const result = await model.getUser();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  getUserIdToken: async (req, res) => {
    try {
      const result = await model.getUserIdToken(req.decodeToken.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },

  // TODO need add data user
  addUser: async (req, res) => {
    try {
      req.body.password = await hashing(req.body.password);
      const cekEmail = await model.dataExistsEmail(req.body.email);
      const cekUsername = await model.dataExists(req.body.username);
      if (cekEmail) {
        return response(res, 401, "Email already exists");
      }
      if (cekUsername) {
        return response(res, 401, "Username already exists");
      }
      const result = await model.addUser(req.body);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const result = await model.updateUser(req.body, req.decodeToken.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  updateImageUser: async (req, res) => {
    try {
      const img = `http://localhost:3001/user/image/${req.file.filename}`;
      const dataExist = await model.getUserById(req.decodeToken.id);
      if (dataExist === false) {
        return response(res, 404, "Data not found");
      }
      const result = await model.updateImageUser(img, req.decodeToken.id);
      // cek apakah update mengirim file dan value db user.img tidak null
      if (img && dataExist[0].img) {
        const imgName = dataExist[0].img.replace(
          "http://localhost:3001/user/image/",
          ""
        );
        const path = `./public/upload/user/${imgName}`;
        fs.unlinkSync(path);
      }
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const result = await model.deleteData(req.user);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
};

module.exports = controller;
