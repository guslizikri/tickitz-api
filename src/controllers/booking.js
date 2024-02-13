const model = require('../models/booking');

const controller = {
    getBooking : async (req, res) => {
        try {
            const data = await model.getBooking();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addBooking : async (req, res) => {
        try {
            const {schedule_id, user_id, seat, total_ticket, total_payment, payment_method} = req.body;
            console.log(req.body);
            const data = await model.addBooking(schedule_id, user_id, seat, total_ticket, total_payment, payment_method);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateBooking : async (req, res) => {
        try {
            const {payment_method} = req.body;
            const id = req.params.id;
            const data = await model.updateBooking(payment_method, id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    deleteBooking : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteBooking(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = controller;