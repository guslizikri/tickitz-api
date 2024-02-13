const db = require('../config/db');
const model = {
    getMovie : () => {
        return new Promise((resolve, reject) => {
            db.query('select * from movie')
            .then((res)=>{
                resolve(res.rows);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    getMovieByName : (name) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from movie where title like $1`, [`%${name}%`])
            .then((res)=>{
                resolve(res.rows);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    getMovieByNameAndDate : (name, release_date) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from movie where title like $1 or extract(year from release_date) = $2 `, [`%${name}%`, release_date])
            .then((res)=>{
                resolve(res.rows);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    addMovie : (title, director, casts, synopsis, duration, img, release_date) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into movie (title, director, casts, synopsis, duration, img, release_date) 
            values($1, $2, $3, $4, $5, $6, $7)`, [title, director, casts, synopsis, duration, img, release_date])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateMovie : (title, id) => {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.query(`update movie set title = coalesce($1, title), updated_at = now() where id = $2`, [title, id] )
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    
    deleteMovie : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from movie where id = $1`, [id])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};

module.exports = model;