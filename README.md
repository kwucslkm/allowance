Allowance System (포괄 용돈 시스템)

프로젝트 개요

Allowance System은 React, TypeScript, Node.js, Express, Sequelize, MySQL을 기반으로 하는 웹 애플리케이션으로, 용돈 관리 시스템을 제공합니다. 
이 프로젝트는 Docker를 활용한 배포 환경을 준비 중이며, .env 파일을 이용하여 환경 변수를 관리합니다.

기술 스택

Frontend: React, TypeScript

Backend: Node.js, Express, Sequelize

Database: MySQL



프로젝트 구조

ALLOWANCE
```
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
│   │   ├── pages/    # React pages (LoginForm, MemberList, AllowanceList, AllowanceSummary, AnnualAllowanceView)
│   │   ├── layout/   # Layout components
│   │   ├── services/ # API service files
│   │   ├── styles/   # CSS stylesheets
│   ├── Dockerfile    # Frontend Docker setup
│
│── docker-compose.yml # Docker configuration (MySQL, Backend, Frontend)(진행예정)
```

1. 환경 변수 설정
 .env 파일을 생성하고 필요한 환경 변수를 설정합니다.

2. Backend 실행

cd allowback
npx ts-node src/server.ts

3. Frontend 실행

cd allowfront
npm start

4. 배포 실행 운영 (예정)


설명

모든 용돈 데이터 조회

/api/allowances

새 용돈 데이터 추가

모든 멤버 조회

회원가입

용돈 사용 입력

용돈 사용 리스트 조회

용돈 사용 합계 조회

남은 연간 용돈 조회
등
계속 진행 중




{
  "dependencies": {
    "axios": "^1.7.9",
    "bootstrap": "^5.3.3",
    "dotenv": "^16.4.7",
    "react-bootstrap": "^2.10.9"
  },
  "devDependencies": {
    "@babel/plugin-transform-private-property-in-object": "^7.27.1",
    "@testing-library/react": "^16.1.0",
    "@types/axios": "^0.14.4",
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.3",
    "concurrently": "^9.1.2"
  },
  "scripts": {
    "start:allowback": "npx ts-node allowback/src/server.ts",
    "start:allowfront": "npm start --prefix allowfront",
    "start:all": "concurrently \"npm run start:allowback\" \"npm run start:allowfront\""
  }
}
