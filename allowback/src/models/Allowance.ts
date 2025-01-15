import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Member from './Member'; // Member 모델을 가져옵니다.

class Allowance extends Model {
  public id!: number;
  public category!: string;
  public store!: string;
  public description!: string;
  public amount!: number;
  public date!: string; 
  public memberId!: number;
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
Allowance.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });

export default Allowance;
