# fc-mba-solid

#init containers

docker compose up -d

#init database

compose exec db psql -d app -U postgres -f /docker-entrypoint-initdb.d/create.sql

