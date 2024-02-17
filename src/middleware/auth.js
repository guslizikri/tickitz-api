const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const middleware = {
    authentication : (req, res, next) => {
        const {authorization} = req.headers;
        
        if (!authorization) {
            return response(res, 401, "Access denied. Log in to continue");
        }
        console.log(authorization);
        const token = authorization.replace("Bearer ", "");
        console.log(token);
        jwt.verify(token,process.env.JWT_KEY, (error, decode) =>{
            if (error) {
                return response(res, 401, error);
            }
            console.log(decode);
            req.decodeToken = decode;
            next();
        });
    },
    isAdmin : (req, res, next) => {
        role = req.decodeToken.role.toLowerCase();
        console.log(role);
        if (role !== 'admin') {
            return response(res, 401, "Invalid Role");
        }
        next();
    },
    isUser : (req, res, next) => {
        role = req.decodeToken.role.toLowerCase();
        console.log(role);
        if (role !== 'user') {
            return response(res, 401, "Invalid Role");
        }
        next();
    },
    
};

module.exports = middleware;