FROM postgres:15-bullseye

ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV PGDATA=/data/postgres
ENV POSTGRES_DB=Products

COPY products.sql .

COPY products.sql /docker-entrypoint-initdb.d/

EXPOSE 5432