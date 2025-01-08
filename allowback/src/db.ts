import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('allowance_db', 'root', '1001', {
  host: 'localhost', // IP 주소만 입력
  port: 4406,           // 포트 번호를 별도로 지정
  dialect: 'mysql',     // MySQL 사용
});

export default sequelize;
