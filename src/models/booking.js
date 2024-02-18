const db = require('../config/db');
const model = {
    getBooking : () => {
        return new Promise((resolve, reject) => {
            db.query('select * from booking limit 5')
            .then((res)=>{
                let result = res.rows;
                if (result <= 0) {
                    result = "Data not found";
                }
                resolve(result);
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
                resolve(`${res.rowCount} data created`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateBooking : ({schedule_id, user_id, seat, total_ticket, total_payment, payment_method}, id) => {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.query(
                `update booking set
                    schedule_id = COALESCE(NULLIF($1, ''), schedule_id), 
                    user_id = COALESCE(NULLIF($2, ''), user_id), 
                    seat = COALESCE(NULLIF($3, ''), seat), 
                    total_ticket = COALESCE(NULLIF($4, ''), total_ticket), 
                    total_payment = COALESCE(NULLIF($5, ''), total_payment), 
                    payment_method = coalesce($6, payment_method),
                    updated_at = now() 
                where id = $7`, 
                [schedule_id, user_id, seat, total_ticket, total_payment, payment_method, id] )
            .then((res)=>{
                resolve(`${res.rowCount} data updated`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    deleteBooking : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from booking where id = $1`, [id])
            .then((res)=>{
                resolve(`${res.rowCount} data deleted`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};  

module.exports = model;