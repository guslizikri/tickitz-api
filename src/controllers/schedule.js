const model = require("../models/schedule");
const response = require("../utils/response");

const controller = {
  getSchedule: async (req, res) => {
    try {
      const data = await model.getSchedule();
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },

  addSchedule: async (req, res) => {
    try {
      const { movie_id, location, price, start_date, end_date, time } =
        req.body;
      const data = await model.addSchedule(
        movie_id,
        location,
        price,
        start_date,
        end_date,
        time
      );
      return response(res, 201, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const id = req.params.id;
      // merubah data body karena jika form tidak diisi maka menghasilkan string kosong,
      // dan tidak bisa ditangani oleh query null if (tipe data kolom salain string),
      const body = {
        location: req.body.location,
        price: req.body.price ? req.body.price : null,
        movie_id: req.body.movie_id ? Number(req.body.movie_id) : null,
        time: req.body.time ? req.body.time : null,
        start_date: req.body.start_date ? req.body.start_date : null,
        end_date: req.body.end_date ? req.body.end_date : null,
      };
      const data = await model.updateSchedule(body, id);
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error);
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await model.deleteSchedule(id);
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
};

module.exports = controller;
