const model = require('../models/schedule');
const response = require('../utils/response');

const controller = {
    getSchedule : async (req, res) => {
        try {
            const data = await model.getSchedule();
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },

    addSchedule : async (req, res) => {
        try {
            const {movie_id, location, price, start_date, end_date, time} = req.body;
            console.log(req.body);
            const data = await model.addSchedule(movie_id, location, price, start_date, end_date, time);
            return response(res, 201, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    updateSchedule : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.updateSchedule(req.body, id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    deleteSchedule : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteSchedule(id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    }
};

module.exports = controller;