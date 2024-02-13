const db = require('../config/db');
const model = {
    getBooking : () => {
        return new Promise((resolve, reject) => {
            db.query('select * from booking')
            .then((res)=>{
                resolve(res.rows);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    addBooking : (schedule_id, user_id, seat, total_ticket, total_payment, payment_method) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into booking (schedule_id, user_id, seat, total_ticket, total_payment, payment_method) 
            values($1, $2, $3, $4, $5, $6)`, [schedule_id, user_id, seat, total_ticket, total_payment, payment_method])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateBooking : (payment_method, id) => {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.query(`update booking set payment_method = $1, updated_at = now() where id = $2`, [payment_method, id] )
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    deleteBooking : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from booking where id = $1`, [id])
            .then((res)=>{
                resolve(res.rowCount);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};  

module.exports = model;