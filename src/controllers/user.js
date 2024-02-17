const model = require('../models/user');
const response = require('../utils/response');
const hashing = require('../utils/hash');

const controller = {
    getUser : async (req, res) => {
        try {
            const result = await model.getUser();
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    // TODO need add data user
    addUser : async (req, res) => {
        try {
            req.body.password = await hashing(req.body.password);
            console.log(req.body);
            // const result = await model.addUser(req.body);
            return response(res, 201, result);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    updateUser : async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.params.id);
            const result = await model.updateUser(req.body, req.params.id);
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    delete : async (req, res) => {
        try {
            const result = await model.deleteData(req.user);
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, error.message);
        }
    }
    
};
    
module.exports = controller;


