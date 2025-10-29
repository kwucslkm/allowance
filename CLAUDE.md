# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Allowance System은 용돈 관리를 위한 풀스택 웹 애플리케이션입니다.
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL (Sequelize ORM)
- **배포**: Docker Compose (Nginx 리버스 프록시)

## 프로젝트 구조

```
allowance/
├── allowback/           # Backend API 서버
│   ├── src/
│   │   ├── models/      # Sequelize 모델 (Member, Allowance)
│   │   ├── routes/      # API 라우터 (allowancesRouter.ts)
│   │   ├── db.ts        # Sequelize 연결 설정
│   │   └── server.ts    # Express 서버 진입점
│   ├── .env             # 환경 변수 (DB 연결 정보)
│   └── tsconfig.json    # TypeScript 설정
│
├── allowfront/          # Frontend React 애플리케이션
│   ├── src/
│   │   ├── pages/
│   │   │   ├── control/ # 사용자 관련 페이지 (Login, Join, MemberList)
│   │   │   ├── layout/  # 레이아웃 컴포넌트 (Header, Footer, Nav)
│   │   │   └── MyHome.tsx
│   │   ├── services/
│   │   │   └── api.ts   # Backend API 호출 함수
│   │   └── App.tsx      # 메인 앱 컴포넌트
│   ├── vite.config.ts   # Vite 설정 (프록시: /api → localhost:3001)
│   └── package.json
│
├── docker-compose.yml   # Docker 배포 설정 (nginx, certbot, allowback, allowfront)
└── nginx/               # Nginx 리버스 프록시 설정
```

## 개발 명령어

### Backend 개발

```bash
# Backend 디렉토리로 이동
cd allowback

# 개발 서버 실행 (포트 3001)
npx ts-node src/server.ts

# TypeScript 컴파일 (tsconfig.json 설정 기준)
npx tsc
```

### Frontend 개발

```bash
# Frontend 디렉토리로 이동
cd allowfront

# 개발 서버 실행 (포트 3000, Vite)
npm run dev
# 또는
npm start

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 전체 시스템 실행

```bash
# 루트 디렉토리에서 Frontend + Backend 동시 실행
npm run start:all
```

### Docker 배포

```bash
# Docker Compose로 전체 시스템 실행
docker-compose up -d

# 특정 서비스만 재빌드
docker-compose up -d --build allowback
docker-compose up -d --build allowfront

# 로그 확인
docker-compose logs -f allowback
docker-compose logs -f allowfront

# 전체 중지
docker-compose down
```

## 핵심 아키텍처

### Backend 아키텍처

1. **진입점**: `allowback/src/server.ts`
   - Express 서버 설정
   - CORS 설정 (localhost:3000, kwcsani.iptime.org:3000 허용)
   - 포트 3001에서 실행 (환경변수 PORT로 변경 가능)

2. **데이터베이스 연결**: `allowback/src/db.ts`
   - Sequelize ORM 설정
   - `.env` 파일에서 DB 연결 정보 로드
   - 한국 시간대(+09:00) 설정
   - charset: utf8mb4, collate: utf8mb4_unicode_ci

3. **모델**: `allowback/src/models/`
   - `Member.ts`: 회원 정보 (id, member_id, password, name, email)
   - `Allowance.ts`: 용돈 데이터 (id, member_id, amount, date, category, etc.)
   - `Asociations.ts`: 모델 간 관계 정의

4. **라우터**: `allowback/src/routes/allowancesRouter.ts`
   - `/api/allowances/*` 엔드포인트 관리
   - 용돈 CRUD, 회원 관리, 통계 조회 등

### Frontend 아키텍처

1. **진입점**: `allowfront/src/main.tsx` → `App.tsx`
   - Vite 기반 React 19 애플리케이션
   - styled-components 사용

2. **API 통신**: `allowfront/src/services/api.ts`
   - axios 기반 Backend API 호출
   - Vite 프록시 설정으로 `/api` 요청을 localhost:3001로 전달

3. **페이지 구조**:
   - `pages/control/`: 사용자 관련 페이지 (LoginForm, JoinForm, MemberList)
   - `pages/layout/`: 공통 레이아웃 컴포넌트 (Header, Footer, Nav, Main)
   - `pages/MyHome.tsx`: 메인 홈 페이지

4. **타입 정의**: `pages/AllowanceType.ts`
   - 용돈 관련 TypeScript 인터페이스 정의

### 환경 변수 설정

Backend `.env` 파일 필수 항목:
```
PORT=3001
DB_NAME=allowancedb
DB_USER=allowuser
DB_PASSWORD=ChangeMe-Strong!123
DB_HOST=127.0.0.1
DB_PORT=13306
DB_DIALECT=mysql
DB_CHARSET=utf8mb4
DB_COLLATE=utf8mb4_unicode_ci
CORS_ORIGIN=http://kwucsani.iptime.org:3000
```

Frontend Vite 프록시 설정 (`vite.config.ts`):
```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

### TypeScript 경로 별칭

Backend (`allowback/tsconfig.json`):
```json
{
  "baseUrl": ".",
  "paths": {
    "@types/*": ["ts_ts/*"]
  }
}
```

Frontend (`allowfront/vite.config.ts`):
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
}
```

## 배포 아키텍처

Docker Compose 서비스:
- **nginx**: 리버스 프록시 (포트 80, 443)
- **certbot**: SSL 인증서 자동 갱신
- **allowback**: Backend API 서버 (내부 포트 3001)
- **allowfront**: Frontend React 앱 (내부 포트 3000)
- **외부 MySQL**: 별도 호스트에서 실행 중 (kwucsani.iptime.org:5506)

## UX 개선을 위한 추가 패키지 (선택사항)

현대적인 UX 개선을 위해 다음 패키지 설치를 권장합니다:

```bash
# Frontend 디렉토리에서
cd allowfront

# UI 개선용 패키지
npm install react-icons        # 아이콘 라이브러리
npm install framer-motion      # 애니메이션
npm install -D @types/react-icons
```

## 주의사항

- **한국어 응답**: 이 프로젝트는 한국어 기반이므로 모든 응답과 커밋 메시지는 한국어로 작성
- **데이터베이스 동기화**: Backend 시작 시 `sequelize.sync()`로 자동 테이블 생성
- **CORS 설정**: Backend에서 localhost:3000과 kwucsani.iptime.org:3000만 허용
- **시간대 설정**: 모든 날짜/시간은 한국 시간대(+09:00) 기준
- **환경 변수**: `.env` 파일은 git에 커밋하지 않음 (민감 정보 포함)