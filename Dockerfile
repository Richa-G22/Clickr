
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

ARG FLASK_APP=app 
ENV FLASK_APP=${FLASK_APP}

ARG FLASK_ENV=production
ENV FLASK_ENV=${FLASK_ENV}

ARG DATABASE_URL=postgres://aaprojects_3ymg_user:O7iDSchVUzA6xkd4yHjvhVQAtD20Yb1P@dpg-cn1d6sen7f5s73fg296g-a.ohio-postgres.render.com/aaprojects_3ymg
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA=flask_schema
ENV SCHEMA=${SCHEMA}

ARG SECRET_KEY=password
ENV SECRET_KEY=${SECRET_KEY}

WORKDIR /Clickr

#COPY --from=py-dependencies-builder /usr/local /usr/local

COPY ./requirements.txt .

RUN pip install -r requirements.txt

RUN pip install psycopg2-binary

COPY ./app ./app

COPY ./migrations ./migrations

COPY entrypoint.sh /entrypoint.sh



# RUN chmod +x /entrypoint.sh && \
#     useradd -m myuser
# USER myuser
# RUN chmod +x /entrypoint.sh


# ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8000
CMD ["gunicorn","app:app"]
