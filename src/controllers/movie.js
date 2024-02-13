const model = require('../models/movie');

const controller = {
    getMovie : async (req, res) => {
        try {
            const {title, release_date} = req.query;
            // get movie by name and release dat
            if (title && release_date) {
                const data = await model.getMovieByNameAndDate(title, release_date);
                res.status(200).json(data);
            // get movie by name
            }else if(title){
                const data = await model.getMovieByName(title);
                res.status(200).json(data);
            }else if (Object.keys(req.query).length === 0) {
                const data = await model.getMovie();
                res.status(200).json(data);
            } else {
                res.status(404).send("Not Found");
            }
            
            // res.send(data)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    addMovie : async (req, res) => {
        try {
            const {title, director, casts, synopsis, duration, img, release_date} = req.body;
            const data = await model.addMovie(title, director, casts, synopsis, duration, img, release_date);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateMovie : async (req, res) => {
        try {
            const {title} = req.body;
            const id = req.params.id;
            const data = await model.updateMovie(title, id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    
    deleteMovie : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await model.deleteMovie(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = controller;
