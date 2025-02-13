Allowance System(포괄 용돈 시스템)
react, ts, node.js, express, mysql, docker 활용 개발 범위를 확대하고자 프로젝트 진행 중   
📁 Project Structure
```
ALLOWANCE
│── allowback/        # Backend (Node.js, Express, Sequelize)
│   ├── src/
│   │   ├── models/   # Sequelize models (Allowance, Members, etc.)
│   │   ├── routes/   # API routes (allowancesRouter.ts)
│   │   ├── db.ts     # Sequelize database configuration
│   │   ├── server.ts # Express server setup
│   ├── Dockerfile    # Backend Docker setup(20250211진행중)
│   ├── .env          # Environment variables
│
│── allowfront/       # Frontend (React, TypeScript)
│   ├── src/
│   │   ├── pages/    # React pages (LoginForm, MemberList)
│   │   ├── layout/   # Layout components
│   │   ├── services/ # API service files
│   │   ├── styles/   # CSS stylesheets
│   ├── Dockerfile    # Frontend Docker setup
│
│── docker-compose.yml # Docker configuration (MySQL, Backend, Frontend)(진해예정)
│── backup.sql         # MySQL database backup
```
🚀 Getting Started

1️⃣ Clone the Repository

git clone https://github.com/your-repo/allowance-system.git
cd allowance-system

2️⃣ Backend Setup (allowback)

cd allowback
npm install

Create a .env file in allowback/ and add:

PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

3️⃣ Frontend Setup (allowfront)

cd allowfront
npm install

🐳 Running MySQL with Docker(5506:3306 포트포워딩)

Start MySQL container using Docker Compose:

docker-compose up -d

This will start:

MySQL Database (Port: 3306)

Backend Server (Port: 3001)

Frontend Server (Port: 3000)


🏃 Running the Project

🔥 Start Backend

cd allowback
npm ts-node src/server.ts

🎨 Start Frontend

cd allowfront
npm start

Open http://localhost:3000 to view the app.

📌 API Endpoints

📝 Allowances API

Method

Endpoint

Description

GET

/api/allowances

Get all allowances

POST

/api/allowances

Add a new allowance

PUT

/api/allowances/:id

Update an allowance

DELETE

/api/allowances/:id

Delete an allowance

🔗 Technologies Used

Frontend: React, TypeScript, Axios

Backend: Node.js, Express, Sequelize, 비밀번호 암호화 : bcrypt

Database: MySQL (Docker)

Containerization: Docker, Docker Compose

## Backend Dockerfile
### Node.js 22.11.0 기반
FROM node:22.11.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node

CMD ["npx", "ts-node", "src/server.ts"]

## front Dockerfile

FROM node:22.11.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node

CMD ["npx", "ts-node", "src/server.ts"]

## docker-compose 
services:

  nginx:
    image: nginx:latest
    container_name: nginx_proxy
    restart: always
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80"
    depends_on:
      - allowfront
    networks:
      - app_network

  allowback:
    build: ./allowback
    ports:
      - "3001:3001"  # 외부에서 접근 가능하도록 설정
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DB_HOST=kwucsani.iptime.org
      - DB_PORT=5506
      - DB_USER=root
      - DB_PASSWORD=1001
      - DB_NAME=allowance_db
    depends_on:
      - mysql
    networks:
      - app_network

  allowfront:
    build: ./allowfront
    ports:
      - "3000:3000"  # 외부에서 접근 가능하도록 설정
    depends_on:
      - allowback
    networks:
      - app_network

  mysql:
    image: mysql:8.0
    container_name: mysql80
    environment:
      MYSQL_ROOT_PASSWORD: 1001
      MYSQL_DATABASE: allowance_db
      MYSQL_USER: root
      MYSQL_PASSWORD: 1001
    ports:
      - "5506:3306"
    volumes:
      - mysql80_data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - app_network

networks:
  app_network:
    driver: bridge

volumes:
  mysql80_data:


✨ Author

Developed by 이광명 Contact: kwucsa@gmail.com



