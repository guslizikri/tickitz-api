const model = require('../models/movie');
const response = require('../utils/response');
const fs = require('fs');

const controller = {
    getMovie : async (req, res) => {
        try {
            const {title, release_date} = req.query;
            // get movie by name and release dat
            if (title && release_date) {
                const data = await model.getMovieByNameAndDate(title, release_date);
                return response(res, 200, data);
            // get movie by name
            }else if(title){
                const data = await model.getMovieByName(title);
                return response(res, 200, data);
            }else if (Object.keys(req.query).length === 0) {
                const data = await model.getMovie();
                return response(res, 200, data);
            } else {
                return response(res, 404, "Not Found");
            }
            
            // res.send(data)
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    addMovie : async (req, res) => {
        try {
            
            console.log(req.body);
            console.log(req.file);
            req.body.img = `http://localhost:3001/movie/image/${req.file.filename}`;
            const data = await model.addMovie(req.body);
            return response(res, 201, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    updateMovie : async (req, res) => {
        try {
            const id = req.params.id;
            const dataExist = await model.getMovieById(id);
            if (dataExist === false) {
                return response(res, 404, "Data not found");
            }
            
            console.log(req.file);
            req.body.img = await req.file? `http://localhost:3001/movie/image/${req.file.filename}` : "";
            if (req.body.img) {
                const imgName = dataExist[0].img.replace("http://localhost:3001/movie/image/", "");
                const path = `./public/upload/movie/${imgName}`;
                fs.unlinkSync(path);
            }
            const data = await model.updateMovie(req.body, id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    
    deleteMovie : async (req, res) => {
        try {
            const id = req.params.id;
            const dataExist = await model.getMovieById(id);
            if (dataExist === false) {
                return response(res, 404, "Data not found");
            }
            const imgName = dataExist[0].img.replace("http://localhost:3001/movie/image/", "");
            const path = `./public/upload/movie/${imgName}`;
            fs.unlinkSync(path, (error) => {
                throw error;
            });
            const data = await model.deleteMovie(id);
            return response(res, 200, dataExist);
        } catch (error) {
            return response(res, 500, error.message);
        }
    }
};

module.exports = controller;
