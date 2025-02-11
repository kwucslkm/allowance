Allowance System(포괄 용돈 시스템)
react, ts, node.js, express, mysql, docker 활용 개발 범위를 확대하고자 프로젝트 진행 중
📁 Project Structure
# ALLOWANCE 프로젝트

## 📂 프로젝트 구조
ALLOWANCE ├── allowback/ # Backend (Node.js, Express, Sequelize) │ ├── src/ │ │ ├── models/ # Sequelize models (Allowance, Members, etc.) │ │ ├── routes/ # API routes (allowancesRouter.ts) │ │ ├── db.ts # Sequelize database configuration │ │ ├── server.ts # Express server setup │ ├── Dockerfile # Backend Docker setup (20250211 진행 중) │ ├── .env # Environment variables │ ├── allowfront/ # Frontend (React, TypeScript) │ ├── src/ │ │ ├── pages/ # React pages (LoginForm, MemberList) │ │ ├── layout/ # Layout components │ │ ├── services/ # API service files │ │ ├── styles/ # CSS stylesheets │ ├── Dockerfile # Frontend Docker setup │ ├── docker-compose.yml # Docker configuration (MySQL, Backend, Frontend) (진행 예정) └── backup.sql # MySQL database backup


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

✨ Author

Developed by 이광명 Contact: kwucsa@gmail.com



