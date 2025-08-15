FROM node:22.11.0-alpine
WORKDIR /app
# 필요한 시스템 패키지 설치
RUN apk add --no-cache python3 make g++
# package.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install
# bcrypt 대신 bcryptjs 설치
RUN npm uninstall bcrypt && npm install bcryptjs
# TypeScript 및 ts-node 설치
RUN npm install -g typescript ts-node
# 애플리케이션 코드 복사
COPY . .
CMD ["npx", "ts-node", "src/server.ts"]





# # Node.js 22.11.0 기반
# FROM node:22.11.0
# # 작업 디렉터리 설정
# WORKDIR /app
# # package.json 복사 후 의존성 설치
# COPY package.json package-lock.json ./
# RUN npm install
# # 전체 소스 코드 복사
# COPY . .
# # TypeScript 실행을 위한 ts-node 설치
# RUN npm install -g ts-node
# # 서버 실행
# CMD ["npx", "ts-node", "src/server.ts"]

