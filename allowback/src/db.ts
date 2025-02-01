import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    timezone: '+09:00', // 한국 시간대 (KST)  
    dialect: process.env.DB_DIALECT as any,
    dialectOptions: {
      charset: process.env.DB_CHARSET,
      timezone: 'Asia/Seoul', // MySQL 서버 시간대 설정
    },
    define: {
      charset: process.env.DB_CHARSET,
      collate: process.env.DB_COLLATE,
    },
  }
);

// Sequelize CLI용 설정 객체 생성
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
};

export default sequelize;
export { config }; // 추가
