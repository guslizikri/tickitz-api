CREATE TABLE public.schedule (
	id serial4 NOT NULL,
	movie_id int4 NOT NULL,
	"location" varchar(255) NOT NULL,
	price int4 NULL,
	start_date date NOT NULL,
	end_date date NULL,
	"time" time NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	cinema varchar(50) NULL,
	CONSTRAINT schedule_pkey PRIMARY KEY (id),
    CONSTRAINT fk_schedule_movie FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE ON UPDATE CASCADE
);

