FROM python:3.9.18-alpine3.18

# Build frontend
FROM --platform=amd64 node:18-alpine3.17 as frontend

WORKDIR /react-vite

COPY ./react-vite/package.json .

RUN npm install

COPY ./react-vite .

RUN npm run build

# Build Prod
FROM --platform=amd64 python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG FLASK_APP=app 
ENV FLASK_APP=${FLASK_APP}

ARG FLASK_ENV=production
ENV FLASK_ENV=${FLASK_ENV}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA
ENV SCHEMA=${SCHEMA}

WORKDIR /var/www
ARG SECRET_KEY=password
ENV SECRET_KEY=${SECRET_KEY}

COPY requirements.txt .
WORKDIR /Clickr

COPY ./requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .
RUN pip install psycopg2-binary

COPY ./app ./app

COPY ./migrations ./migrations

RUN flask db upgrade
RUN flask seed all

EXPOSE 8000
CMD ["gunicorn","app:app"]