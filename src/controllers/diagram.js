const model = require("../models/diagram");
const response = require("../utils/response");

const controller = {
  //   getDiagram: async (req, res) => {
  //     try {
  //       // decodeToken ngambil dari auth
  //       const data = await model.getDiagram(req.decodeToken.id);
  //       return response(res, 200, data);
  //     } catch (error) {
  //       return response(res, 500, error.message);
  //     }
  //   },
  getDiagram: async (req, res) => {
    try {
      // decodeToken ngambil dari auth
      const data = await model.getByWeek(req.decodeToken.id);
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
};

module.exports = controller;
