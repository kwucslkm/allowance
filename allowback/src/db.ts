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
    dialect: process.env.DB_DIALECT as any,
    dialectOptions: {
      charset: process.env.DB_CHARSET,
    },
    define: {
      charset: process.env.DB_CHARSET,
      collate: process.env.DB_COLLATE,
    },
  }
);

export default sequelize;
