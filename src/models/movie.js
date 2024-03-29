const db = require('../config/db');
const model = {
    getMovie : () => {
        return new Promise((resolve, reject) => {
            const img = db.query('select * from movie order by created_at desc limit 5')
            .then((res)=>{
                console.log(img);
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
    getMovieByName : (name) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from movie where title like $1 limit 5`, [`%${name}%`])
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
    getMovieById : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from movie where id = $1`, [id])
            .then((res)=>{
                let result = res.rows;
                if (result <= 0) {
                    result = false;
                }
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    getMovieByNameAndDate : (name, release_date) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from movie where title like $1 or extract(year from release_date) = $2 limit 5`, [`%${name}%`, release_date])
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
    addMovie : ({title, director, casts, synopsis, duration, img, release_date}) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into movie (title, director, casts, synopsis, duration, img, release_date) 
            values($1, $2, $3, $4, $5, $6, $7)`, [title, director, casts, synopsis, duration, img, release_date])
            .then((res)=>{
                resolve(`${res.rowCount} data created`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    updateMovie : ({title, director, casts, synopsis, duration, img, release_date}, id) => {
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
                where id = $8`, [title, director, casts, synopsis, duration, img, release_date, id] )
            .then((res)=>{
                resolve(`${res.rowCount} data updated`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    
    deleteMovie : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from movie where id = $1`, [id])
            .then((res)=>{
                resolve(`${res.rowCount} data deleted`);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    save : async ({ name, banner, release, genre }) => {
        const pg = await db.connect();
        try {
            await pg.query('BEGIN');
    
            const movie = await pg.query(
                `INSERT INTO public.movie
                    (movie_name, movie_banner, release_date)
                VALUES($1, $2, $3) RETURNING movie_id`,
                [name, banner, release]
            );
    
            if (genre && genre.length > 0) {
                for await (const v of genre) {
                    await pg.query(
                        `
                        INSERT INTO public.movie_genre
                            (movie_id, genre_id)
                        VALUES($1, $2)`,
                        [movie.rows[0].movie_id, v]
                    );
                }
            }
    
            await pg.query('COMMIT');
            return `${movie.rowCount} data movie created`;
        } catch (error) {
            console.log(error);
            await pg.query('ROLLBACK');
            throw error;
        }
    }
    
};

module.exports = model;