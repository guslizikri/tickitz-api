const model = require('../models/booking');
const response = require('../utils/response');

const controller = {
    getBooking : async (req, res) => {
        try {
            const data = await model.getBooking();
            response(res, 200, data);
        } catch (error) {
            response(res, 500, error.message);
        }
    },
    addBooking : async (req, res) => {
        try {
            const {schedule_id, user_id, seat, total_ticket, total_payment, payment_method} = req.body;
            console.log(req.body);
            const data = await model.addBooking(schedule_id, user_id, seat, total_ticket, total_payment, payment_method);
            response(res, 200, data);
        } catch (error) {
            response(res, 500, error.message);
        }
    },
    updateBooking : async (req, res) => {
        try {
            const {payment_method} = req.body;
            const id = req.params.id;
            const data = await model.updateBooking(payment_method, id);
            response(res, 200, data);
        } catch (error) {
            response(res, 500, error.message);
        }
    },
    
    deleteBooking : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteBooking(id);
            response(res, 200, data);
        } catch (error) {
            response(res, 500, error.message);
        }
    }
};

module.exports = controller;