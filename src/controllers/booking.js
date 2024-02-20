const model = require('../models/booking');
const response = require('../utils/response');

const controller = {
    getBooking : async (req, res) => {
        try {
            // decodeToken ngambil dari auth 
            const data = await model.getBooking(req.decodeToken.id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    getDetailBooking : async (req, res) => {
        try {
            const data = await model.getDetailBooking(req.params.id, req.decodeToken.id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    addBooking : async (req, res) => {
        try {
            const {schedule_id, seat, total_ticket, total_payment, payment_method} = req.body;
            console.log(req.body);
            const data = await model.addBooking(schedule_id, req.decodeToken.id, seat, total_ticket, total_payment, payment_method);
            return response(res, 201, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    updateBooking : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.updateBooking(req.body, id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    deleteBooking : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteBooking(id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    }
};

module.exports = controller;