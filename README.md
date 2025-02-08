Allowance System

This is a web-based allowance management system built using React (Frontend) and Node.js with Express & Sequelize (Backend). The backend uses MySQL as the database, which runs inside a Docker container.

📁 Project Structure

ALLOWANCE
│── allowback/        # Backend (Node.js, Express, Sequelize)
│   ├── src/
│   │   ├── models/   # Sequelize models (Allowance, Members, etc.)
│   │   ├── routes/   # API routes (allowancesRouter.ts)
│   │   ├── db.ts     # Sequelize database configuration
│   │   ├── server.ts # Express server setup
│   ├── Dockerfile    # Backend Docker setup
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
│── docker-compose.yml # Docker configuration (MySQL, Backend, Frontend)
│── backup.sql         # MySQL database backup

🚀 Getting Started

1️⃣ Clone the Repository

git clone https://github.com/your-repo/allowance-system.git
cd allowance-system

2️⃣ Backend Setup (allowback)

cd allowback
npm install

Create a .env file in allowback/ and add:

PORT=3001
DB_HOST=db
DB_USER=root
DB_PASS=root
DB_NAME=allowance_db
DB_PORT=3306

3️⃣ Frontend Setup (allowfront)

cd allowfront
npm install

🐳 Running MySQL with Docker

Start MySQL container using Docker Compose:

docker-compose up -d

This will start:

MySQL Database (Port: 3306)

Backend Server (Port: 3001)

Frontend Server (Port: 3000)

Check running containers:

docker ps

To stop all containers:

docker-compose down

📡 Database Setup (Sequelize)

To initialize the database, run:

cd allowback
npx sequelize-cli db:migrate

To insert sample data:

npx sequelize-cli db:seed:all

🏃 Running the Project

🔥 Start Backend

cd allowback
npm run dev

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

Backend: Node.js, Express, Sequelize

Database: MySQL (Docker)

Containerization: Docker, Docker Compose

✨ Author

Developed by Your Name📧 Contact: your.email@example.com

📝 License

This project is licensed under the MIT License.

