const response = require("../utils/response");
const jwt = require("jsonwebtoken");

const middleware = {
  authentication: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return response(res, 401, "Access denied. Log in to continue");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY, (error, decode) => {
      if (error) {
        return response(res, 401, error);
      }
      req.decodeToken = decode;
      next();
    });
  },
  isAdmin: (req, res, next) => {
    role = req.decodeToken.role.toLowerCase();
    if (role !== "admin") {
      return response(res, 401, "Invalid Role");
    }
    next();
  },
  isUser: (req, res, next) => {
    role = req.decodeToken.role.toLowerCase();
    if (role !== "user") {
      return response(res, 401, "Invalid Role");
    }
    next();
  },
};

module.exports = middleware;
