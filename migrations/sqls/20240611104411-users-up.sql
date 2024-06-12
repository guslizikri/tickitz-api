CREATE TABLE public.users (
	id serial4 NOT NULL,
	firstname varchar NULL,
	lastname varchar NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	email varchar NULL,
	phone_number varchar NULL,
	"role" varchar NULL DEFAULT 'user'::character varying,
	created_at timestamp NULL DEFAULT now(),
	updated_at timestamp NULL,
	img text NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (username)
);