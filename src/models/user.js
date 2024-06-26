const db = require("../config/db");
const model = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users ORDER BY created_at DESC")
        .then((res) => {
          let result = res.rows;
          if (res.rows <= 0) {
            result = "data not found";
          }

          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // get user berdasarkan id, mengambil id dari decode token yang dikirim ke objek request melalui midlleware auth
  getUserIdToken: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *, concat(firstname, ' ' ,lastname) as fullname FROM users where id = $1`,
        [id]
      )
        .then((res) => {
          let result = res.rows;
          if (res.rows <= 0) {
            result = "data not found";
          }
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // mengambil seluruh data user berdasarkan username
  getByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE username = $1", [username])
        .then((res) => {
          resolve(res.rows);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // mengambil data user untuk kebutuhan login berdasarkan username
  getPassByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, password, role FROM users WHERE username = $1", [
        username,
      ])
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
  // Cek data apakah ada atau tidak didalam table user with id user
  // Sekarang hanya mengambil id dan img (jika membutuhkan colom lain tambahkan saja)
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, img FROM users WHERE id = $1", [id])
        .then((res) => {
          let result = res.rows;
          if (result <= 0) {
            result = false;
          }
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // Cek data apakah ada atau tidak didalam table user with username
  dataExists: (username) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id FROM users WHERE username = $1", [username])
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
  dataExistsEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id FROM users WHERE email = $1", [email])
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

  // menambahkan user untuk kebutuhan register
  addUser: ({ username, password, email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users
                (username, email, password)
                VALUES($1, $2, $3);            
            `,
        [username, email, password]
      )
        .then((res) => {
          resolve(`Sign-up completed`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // update user

  updateImageUser: (img, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
                    img = $1,
                    updated_at = now()
                WHERE id = $2`,
        [img, id_user]
      )
        .then((res) => {
          resolve(`${res.rowCount} user updated`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateUser: (
    { username, password, firstname, lastname, phone_number, email, role },
    id
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
                    username = COALESCE(NULLIF($1, ''), username),
                    password = COALESCE(NULLIF($2, ''), password),
                    firstname = COALESCE(NULLIF($3, ''), firstname),
                    lastname = COALESCE(NULLIF($4, ''), lastname),
                    phone_number = COALESCE(NULLIF($5, ''), phone_number),
                    email = COALESCE(NULLIF($6, ''), email),
                    role = COALESCE(NULLIF($7, ''), role),
                    updated_at = now()
                WHERE id = $8`,
        [username, password, firstname, lastname, phone_number, email, role, id]
      )
        .then((res) => {
          resolve(`${res.rowCount} user updated`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //hapus user
  deleteUser: (username) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE username = $1`, [username])
        .then((res) => {
          resolve(`${res.rowCount} user deleted`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getBy: async ({ page, limit, orderBy, search }) => {
    try {
      let filterQuery = "";
      let orderQuery = "";
      let metaQuery = "";
      let count = 0;

      if (search) {
        filterQuery += search ? escape("AND movie_name = %L", search) : "";
      }

      if (orderBy) {
        orderQuery += escape("ORDER BY %s", orderBy);
      }

      if (page && limit) {
        const offset = (page - 1) * limit;
        metaQuery += escape("LIMIT %s OFFSET %s", limit, offset);
      }

      db.query(
        `SELECT COUNT(mv.movie_id) as "count" FROM public.movie mv WHERE true ${filterQuery}`
      ).then((v) => {
        count = v.rows[0].count;
      });

      const data = await db.query(`
                SELECT 
                    mv.movie_id,
                    mv.movie_name,
                    mv.movie_banner,
                    mv.release_date,
                    string_agg(g.genre_name, ', ') AS genres,
                    mv.created_at, 
                    mv.updated_at
                FROM public.movie mv
                JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
                JOIN public.genre g ON mg.genre_id = g.genre_id
                WHERE true ${filterQuery}
                GROUP BY mv.movie_id
                ${orderQuery} ${metaQuery}
            `);

      const meta = {
        next:
          count <= 0
            ? null
            : page == Math.ceil(count / limit)
            ? null
            : Number(page) + 1,
        prev: page == 1 ? null : Number(page) - 1,
        total: count,
      };

      if (data.rows <= 0) {
        return "data not found";
      } else {
        data.rows.map((v) => {
          const date = moment(v.release_date);
          v.release_date = date.format("DD MMMM YYYY");
        });
        return { data: data.rows, meta };
      }
    } catch (error) {
      throw error;
    }
  },
};
module.exports = model;
