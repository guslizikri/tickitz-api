const db = require("../config/db");
const escape = require("pg-format");
const moment = require("moment");
const model = {
  getMovie: () => {
    return new Promise((resolve, reject) => {
      const img = db
        .query("select * from movie order by created_at desc limit 5")
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
  getMovieByName: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from movie where title like $1 limit 5`, [`%${name}%`])
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
  // Cek data apakah ada atau tidak didalam table movie with id
  dataExists: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, img FROM movie WHERE id = $1", [id])
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

  // get detai movie by id
  getDetailMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
            SELECT 
            m.*,
            string_agg(g.genre, ', ') AS genre
        FROM public.movie m
        left JOIN public.movie_genre mg ON mg.movie_id = m.id
        left JOIN public.genre g ON mg.genre_id = g.id
        WHERE m.id = $1
        GROUP BY m.id`,
        [id]
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
  getMovieByNameAndDate: (name, release_date) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from movie where title like $1 or extract(year from release_date) = $2 limit 5`,
        [`%${name}%`, release_date]
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
  addMovie: ({
    title,
    director,
    casts,
    synopsis,
    duration,
    img,
    release_date,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into movie (title, director, casts, synopsis, duration, img, release_date) 
            values($1, $2, $3, $4, $5, $6, $7)`,
        [title, director, casts, synopsis, duration, img, release_date]
      )
        .then((res) => {
          resolve(`${res.rowCount} data created`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateMovie: (
    { title, director, casts, synopsis, duration, img, release_date },
    id
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update movie set 
                    title = COALESCE(NULLIF($1, ''), title),
                    director = COALESCE(NULLIF($2, ''), director),
                    casts = COALESCE(NULLIF($3, ''), casts),
                    synopsis = COALESCE(NULLIF($4, ''), synopsis),
                    duration = coalesce($5, duration),
                    img = COALESCE(NULLIF($6, ''), img),
                    release_date = coalesce($7, release_date),
                    updated_at = now() 
                where id = $8`,
        [title, director, casts, synopsis, duration, img, release_date, id]
      )
        .then((res) => {
          resolve(`${res.rowCount} data updated`);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from movie where id = $1`, [id])
        .then((res) => {
          resolve(`${res.rowCount} data deleted`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  save: async ({
    title,
    director,
    casts,
    synopsis,
    duration,
    img,
    release_date,
    genre,
    time,
    location,
    start_date,
  }) => {
    const pg = await db.connect();
    try {
      await pg.query("BEGIN");

      const movie = await pg.query(
        `insert into movie (title, director, casts, synopsis, duration, img, release_date) 
            values($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [title, director, casts, synopsis, duration, img, release_date]
      );
      if (genre && genre.length > 0) {
        for await (const v of genre) {
          await pg.query(
            `
                        INSERT INTO public.movie_genre
                            (movie_id, genre_id)
                        VALUES($1, $2)`,
            [movie.rows[0].id, v]
          );
        }
      }
      if (location && time && start_date && location.length > 0) {
        for await (const v of location) {
          await pg.query(
            `
                        INSERT INTO public.schedule
                            (movie_id, location, start_date, time)
                        VALUES($1, $2, $3, $4)`,
            [movie.rows[0].id, v, start_date, time]
          );
        }
      }

      await pg.query("COMMIT");
      return `${movie.rowCount} data movie created`;
    } catch (error) {
      console.log(error);
      await pg.query("ROLLBACK");
      throw error;
    }
  },
  getBy: async ({ page, limit, orderBy, search, date, genre }) => {
    try {
      let filterQuery = "";
      let orderQuery = "";
      let metaQuery = "";
      let count = 0;

      if (search) {
        filterQuery += search
          ? escape("AND title ilike %L", `%${search}%`)
          : "";
      }
      if (date) {
        filterQuery += date
          ? escape("AND extract(year from release_date) = %L", date)
          : "";
      }
      if (genre) {
        filterQuery += genre
          ? escape("AND g.genre ilike %L", `%${genre}%`)
          : "";
      }

      if (orderBy) {
        orderQuery += escape("ORDER BY %s", orderBy);
      }

      if (page && limit) {
        const offset = (page - 1) * limit;
        metaQuery += escape("LIMIT %s OFFSET %s", limit, offset);
      }

      // await db.query(
      //     `SELECT COUNT(m.id) as "count" FROM public.movie m WHERE true ${filterQuery}`
      // ).then((v) => {
      //     count = v.rows[0].count;
      //     console.log(count);
      // });

      await db
        .query(
          `SELECT  COUNT(distinct m.id) as "count" FROM public.movie m 
                left JOIN public.movie_genre mg ON mg.movie_id = m.id
                left JOIN public.genre g ON mg.genre_id = g.id WHERE true ${filterQuery}`
        )
        .then((v) => {
          count = v.rows[0].count;
        });

      const data = await db.query(`
                SELECT 
                    m.*,
                    string_agg(g.genre, ', ') AS genre
                FROM public.movie m
                left JOIN public.movie_genre mg ON mg.movie_id = m.id
                left JOIN public.genre g ON mg.genre_id = g.id
                WHERE true ${filterQuery}
                GROUP BY m.id
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
        totalPage: Math.ceil(count / limit),
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
