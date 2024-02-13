const db = require('../config/db');
const model = {
    getSchedule : () => {
        return new Promise((resolve, reject) => {
            db.query('select * from schedule')
            .then((res)=>{
                resolve(res.rows);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    addSchedule : (movie_id, location, price, start_date, end_date, time) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into schedule (movie_id, location, price, start_date, end_date, time) 
            values($1, $2, $3, $4, $5, $6)`, [movie_id, location, price, start_date, end_date, time])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateSchedule : (title, id) => {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.query(`update schedule set location = $1, updated_at = now() where id = $2`, [title, id] )
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    deleteSchedule : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from schedule where id = $1`, [id])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};

module.exports = model;