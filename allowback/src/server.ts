import express from 'express';
import cors from 'cors';  // CORS 패키지 추가
import dotenv from 'dotenv';
import sequelize from './db';
import allowancesRouter from './routes/allowancesRouter';

// .env 파일 로드
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/allowances', allowancesRouter);

// 환경 변수 PORT 사용
const port = process.env.PORT || 3000;  // .env에서 PORT 값을 찾고 없으면 기본값 3000 사용
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('VICTORY!!! Server is running on http://localhost:3001');
  });
}).catch(err => {
  console.error('Error syncing database: ', err);
});
