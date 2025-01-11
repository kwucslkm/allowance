import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Allowance extends Model {
  public id!: number;
  public category!: string;  // 'category' 속성 추가
  public store!: string;     // 'store' 속성 추가
  public description!: string;
  public amount!: number;
  public date!: string;      // 또는 Date 타입으로 설정
  public memberId!: number; // 'memberId' 속성 추가
}

Allowance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'allowances',
  }
);

export default Allowance;
