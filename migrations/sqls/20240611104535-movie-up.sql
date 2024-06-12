CREATE TABLE public.movie (
	id serial4 NOT NULL,
	title varchar(100) NOT NULL,
	director varchar(50) NOT NULL,
	casts text NOT NULL,
	synopsis text NOT NULL,
	duration time NOT NULL,
	img text NULL,
	release_date date NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT movie_pkey PRIMARY KEY (id)
);