CREATE TABLE public.movie_genre (
	id serial4 NOT NULL,
	movie_id int4 NOT NULL,
	genre_id int4 NOT NULL,
	CONSTRAINT movie_genre_pkey PRIMARY KEY (id),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.movie_genre foreign keys
-- ALTER TABLE public.movie_genre ADD CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE CASCADE ON UPDATE CASCADE;
-- ALTER TABLE public.movie_genre ADD CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE ON UPDATE CASCADE;