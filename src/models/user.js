const db = require('../config/db');
const model = {
    getUser : () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users ORDER BY created_at DESC')
                .then((res) => {
                    let result = res.rows;
                    if (res.rows <= 0) {
                        result = 'data not found';
                    }
    
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    getPassByUsername : (username) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, password, role FROM users WHERE username = $1', [username])
                .then((res) => {
                    if (res.rows.length) {
                        resolve(res.rows[0]);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    dataExists : (username) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id FROM users WHERE username = $1', [username])
                .then((res) => {
                    if (res.rows.length) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    getByUsername : (username) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, fullname, username, email, role FROM users WHERE username = $1', [username])
                .then((res) => {
                    resolve(res.rows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    addUser : ({ username, password, email }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users
                (username, email, password)
                VALUES($1, $2, $3);            
            `,
                [username, email, password]
            )
                .then((res) => {
                    resolve(`${res.rowCount} user created`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    updateUser : ({ username, password, email, userId }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE users SET
                    username = COALESCE(NULLIF($1, ''), username),
                    password = COALESCE(NULLIF($2, ''), password),
                    email = COALESCE(NULLIF($3, ''), email),
                    updated_at = now()
                WHERE username = $4           
            `,
                [username, password, email, userId]
            )
                .then((res) => {
                    resolve(`${res.rowCount} user updated`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    deleteUser : (username) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE username = $1`, [username])
                .then((res) => {
                    resolve(`${res.rowCount} user deleted`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
 
    
};
module.exports = model;

