CREATE TABLE public.users (
	id serial NOT NULL,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	username varchar NOT NULL,
	password varchar NOT NULL,
	email varchar NULL,
	role varchar NULL DEFAULT 'user',
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (username)
);