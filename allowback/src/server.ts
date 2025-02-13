import express from 'express';
import cors from 'cors';  // CORS 패키지 추가
import dotenv from 'dotenv';
import sequelize from './db';
import allowancesRouter from './routes/allowancesRouter';

// .env 파일 로드
dotenv.config();
const app = express();

// CORS 설정 (특정 도메인만 허용)
const corsOptions = {
  origin: ['http://localhost:3000', 'http://kwcsani.iptime.org:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Private-Network']
};

// CORS 미들웨어 사용
app.use(cors(corsOptions));

// 프리플라이트 요청에 대한 추가 설정 (OPTIONS 요청 처리)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();  // OPTIONS 요청에 대한 응답 처리
  } else {
    res.header('Access-Control-Allow-Private-Network', 'true');
    next();
  }
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('🚀 Allowance Server is running!');
});
app.use('/api/allowances', allowancesRouter);

// 환경 변수 PORT 사용
const port: number = parseInt(process.env.PORT || "3001", 10);  // 숫자로 변환
const host: string = "0.0.0.0";  // 외부 접근 허용

sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`🚀 Server is running on http://0.0.0.0:${port}`);
  });
}).catch(err => {
  console.error('❌ Error syncing database: ', err);
});
