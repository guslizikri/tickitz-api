const db = require('../config/db');
const model = {
    getSchedule : () => {
        return new Promise((resolve, reject) => {
            db.query('select * from schedule limit 5')
            .then((res)=>{
                let result = res.rows;
                if (res.rows <= 0) {
                    result = "Data not Found";
                }
                resolve(result);
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
                resolve(`${res.rowCount} data created`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateSchedule : ({movie_id, location, price, start_date, end_date, time}, id) => {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.query(
                `update schedule set 
                    movie_id = COALESCE(NULLIF($1, ''), movie_id), 
                    location = COALESCE(NULLIF($2, ''), location), 
                    price = COALESCE(NULLIF($3, ''), price), 
                    start_date = COALESCE(NULLIF($4, ''), start_date), 
                    end_date = COALESCE(NULLIF($5, ''), end_date), 
                    time = coalesce($6, time),
                    updated_at = now() 
                    where id = $2`, [movie_id, location, price, start_date, end_date, time, id] )
            .then((res)=>{
                resolve(`${res.rowCount} data updated`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    deleteSchedule : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from schedule where id = $1`, [id])
            .then((res)=>{
                resolve(`${res.rowCount} data deleted`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};

module.exports = model;