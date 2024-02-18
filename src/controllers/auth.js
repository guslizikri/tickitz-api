const model = require('../models/user');
const response = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// tidak mempunyai model karena akan memakai model user

const genToken = (id, role) =>{
    const payload = {
        id: id,
        role: role
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'});
    return token;
};
const controller = {
    login : async (req, res) => {
        try {
            const { password, role, id } = await model.getPassByUsername(req.body.username);
            if (!password) {
                return response(res, 401, "Invalid Username");
            }
            const passwordUser = req.body.password;
            const check = await bcrypt.compare(passwordUser, password);
            if(check){
                const  tokenJwt = genToken(id, role);
                return response(res, 200, {message: "Login Succesful", id: id, token: tokenJwt});
            }else{
                return response(res, 401, "Incorrect Password");
            }
        } catch (error) {
            response(res, 200, error.message);
        }
    }
};
    
module.exports = controller;


