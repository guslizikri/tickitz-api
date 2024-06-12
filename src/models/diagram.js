const db = require("../config/db");
const model = {
  getDiagram: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select b.*, m.title, s.* from schedule as s  
                join booking as b on s.id = b.schedule_id
                join movie as m on m.id = s.movie_id`
      )
        .then((res) => {
          let result = res.rows;
          if (result <= 0) {
            result = "Data not found";
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getByWeek: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select sum(b.total_payment), m.title  from schedule as s  
                join booking as b on s.id = b.schedule_id
                join movie as m on m.id = s.movie_id
                group by m.title`
      )
        .then((res) => {
          let result = res.rows;
          if (result <= 0) {
            result = "Data not found";
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = model;
