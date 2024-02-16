const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    const {authorization} = req.headers;
    
    if (!authorization) {
        return response(res, 401, "Invalid Username");
    }
    console.log(authorization);
    return response(res, 200, "Inv login");

};
module.exports = authCheck;