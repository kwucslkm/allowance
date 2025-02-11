import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Member from './Member'; // Member 모델을 가져옵니다.
import {Allow} from '../../../allowfront/ts_ts/types'

class Allowances extends Model<Allow> implements Allow {
  public id!: number;
  public category!: string;
  public store?: string;
  public description!: string;
  public amount!: number;
  public memberId!: number;
}

Allowances.init(
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
    memberId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Member, // 참조할 모델
        key: 'id',    // 참조할 컬럼
      },
      onDelete: 'CASCADE', // 회원 삭제 시 관련 Allowance도 삭제
    },
  },
  {
    sequelize,
    tableName: 'allowances',
  }
);

// Member와의 관계 정의

export default Allowances;
