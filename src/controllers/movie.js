const model = require('../models/movie');
const response = require('../utils/response');
const fs = require('fs');

const controller = {
    getMovie : async (req, res) => {
        try {
            const {title, release_date} = req.query;
            console.log(req.decodeToken.id);
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
            req.body.img = await req.file? `http://localhost:3001/movie/image/${req.file.filename}` : "";
            const dataExist = await model.getMovieById(id);
            if (dataExist === false) {
                return response(res, 404, "Data not found");
            }
            // merubah data body karena jika form tidak diisi maka menghasilkan string kosong,
            // dan tidak bisa ditangani oleh query null if (tipe data kolom salain string),
            const body = {
                title : req.body.title,
                director : req.body.director,
                casts : req.body.casts,
                synopsis : req.body.synopsis,
                img : req.body.img,
                duration : req.body.duration? req.body.duration : null,
                release_date : req.body.release_date? req.body.release_date : null,
            };
            const data = await model.updateMovie(body, id);
            console.log(req.file);
            // cek apakah update mengirim file?
            if (req.body.img) {
                // proses menghapus file sebelumnya
                const imgName = dataExist[0].img.replace("http://localhost:3001/user/image/", "");
                const path = `./public/upload/movie/${imgName}`;
                fs.unlinkSync(path);
            }
            
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
            const data = await model.deleteMovie(id);

            const imgName = dataExist[0].img.replace("http://localhost:3001/movie/image/", "");
            const path = `./public/upload/movie/${imgName}`;
            fs.unlinkSync(path, (error) => {
                throw error;
            });
            return response(res, 200, dataExist);
        } catch (error) {
            return response(res, 500, error.message);
        }
    },
    fetchBy : async (req, res) => {
        try {
            const params = {
                page: req.query.page || 1,
                limit: req.query.limit || 5,
                orderBy: req.query.orderBy || 'created_at',
                search: req.query.search
            };
            const result = await model.getBy(params);
            return respone(res, 200, result);
        } catch (error) {
            console.log(error);
            return respone(res, 500, error.message);
        }
    }
    
    
};

module.exports = controller;
