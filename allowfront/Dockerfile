# Frontend Dockerfile
FROM node:18 as frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=frontend-builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# MySQL Dockerfile
FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=yourpassword
ENV MYSQL_DATABASE=yourdatabase
ENV MYSQL_USER=youruser
ENV MYSQL_PASSWORD=yourpassword

COPY ./init.sql /docker-entrypoint-initdb.d/

# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  mysql:
    build:
      context: ./mysql
      dockerfile: Dockerfile
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=yourpassword
      - MYSQL_DATABASE=yourdatabase
      - MYSQL_USER=youruser
      - MYSQL_PASSWORD=yourpassword

volumes:
  mysql_data: