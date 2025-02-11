# Node.js 22.11.0 기반
FROM node:22.11.0

# 작업 디렉터리 설정
WORKDIR /app

# package.json 복사 후 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 전체 소스 코드 복사
COPY . .

# 개발 서버 실행
CMD ["npm", "start"]
