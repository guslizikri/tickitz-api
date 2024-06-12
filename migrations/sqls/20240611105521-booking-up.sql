CREATE TABLE public.booking (
	id serial4 NOT NULL,
	schedule_id int4 NOT NULL,
	user_id int4 NOT NULL,
	seat _text NOT NULL,
	total_ticket int2 NOT NULL,
	total_payment int4 NOT NULL,
	payment_method varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT booking_pkey PRIMARY KEY (id),
    CONSTRAINT fk_booking_schedule FOREIGN KEY (schedule_id) REFERENCES public.schedule(id),
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);
