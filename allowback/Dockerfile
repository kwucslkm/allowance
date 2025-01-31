# allowback/Dockerfile
FROM node:18

WORKDIR /app/backend
COPY allowback/package*.json ./
RUN npm install
COPY allowback .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

# allowfront/Dockerfile
FROM node:18 as builder

WORKDIR /app/frontend
COPY allowfront/package*.json ./
RUN npm install
COPY allowfront .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: allowback/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
    depends_on:
      - mysql

  frontend:
    build:
      context: .
      dockerfile: allowfront/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=yourpassword
      - MYSQL_DATABASE=allowance
      - MYSQL_USER=allowuser
      - MYSQL_PASSWORD=allowpassword

volumes:
  mysql_data: