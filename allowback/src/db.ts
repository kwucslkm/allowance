import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('allowance_db', 'root', '1001', {
  host: '220.126.12.105', // IP 주소만 입력
  port: 4406,           // 포트 번호를 별도로 지정
  dialect: 'mysql',     // MySQL 사용
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
});

export default sequelize;
