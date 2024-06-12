APP=coffeeshopbe
BUILD="./build/$(APP)"
DB_DRIVER=postgres
DB_SOURCE="postgresql://admin:admin@localhost/coffeeshop?sslmode=disable&search_path=public"
MIGRATIONS_CONFIG=database.js
# https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/

install:
	npm install

# make migrate-init name=testing 
migrate-init:
	db-migrate create $(name) --sql-file --config ${MIGRATIONS_CONFIG}

# make migrate-up
migrate-up:
	db-migrate up --config ${MIGRATIONS_CONFIG}

# by default db-migrate only considers the most recent migration for down operations
# Use the --count option with the down command to specify how many migrations to revert:
# make migrate-down
migrate-down:
	db-migrate down --config ${MIGRATIONS_CONFIG}

# Use the reset command with caution, 
# as it will revert/drop all migrations in your database:
migrate-reset:
	db-migrate reset --config ${MIGRATIONS_CONFIG}