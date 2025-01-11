import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Member extends Model {
  public id!: number;
  public name!: string;
  public birthday!: string;
  public city!: string;
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'member_db', // 테이블 이름
  }
);

export default Member;
