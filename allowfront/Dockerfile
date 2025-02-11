FROM node:22.11.0

# 작업 디렉터리 설정
WORKDIR /app

# package.json 복사 후 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 전체 소스 코드 복사
COPY . .

# React 빌드
RUN npm run build

# Serve 패키지를 사용하여 정적 파일 제공
RUN npm install -g serve
# 컨테이너가 시작되면 빌드된 정적 파일 제공
CMD ["serve", "-s", "build", "-l", "3000"]

# Node.js 22.11.0 기반
# FROM node:22.11.0

# # 작업 디렉터리 설정
# WORKDIR /app

# # package.json 복사 후 의존성 설치
# COPY package.json package-lock.json ./
# RUN npm install

# # 전체 소스 코드 복사
# COPY . .

# # 개발 서버 실행
# CMD ["npm", "start"]
