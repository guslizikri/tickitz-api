const model = require('../models/schedule');

const controller = {
    getSchedule : async (req, res) => {
        try {
            const data = await model.getSchedule();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addSchedule : async (req, res) => {
        try {
            const {movie_id, location, price, start_date, end_date, time} = req.body;
            console.log(req.body);
            const data = await model.addSchedule(movie_id, location, price, start_date, end_date, time);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateSchedule : async (req, res) => {
        try {
            const {location} = req.body;
            const id = req.params.id;
            const data = await model.updateSchedule(location, id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteSchedule : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteSchedule(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = controller;