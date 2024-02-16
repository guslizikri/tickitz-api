const model = require('../models/movie');
const response = require('../utils/response');

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
            const {title, director, casts, synopsis, duration, img, release_date} = req.body;
            const data = await model.addMovie(title, director, casts, synopsis, duration, img, release_date);
            return response(res, 201, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    updateMovie : async (req, res) => {
        try {
            const {title} = req.body;
            const id = req.params.id;
            const data = await model.updateMovie(title, id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    
    
    deleteMovie : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteMovie(id);
            return response(res, 200, data);
        } catch (error) {
            return response(res, 500, error.message);
        }
    }
};

module.exports = controller;
