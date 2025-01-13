import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; // Sequelize 인스턴스를 가져오는 경로를 조정하세요.

class Member extends Model {
  public id!: number;
  public userEmail!: string;
  public password!: string;
  public mobile?: string | null;
  public nickname!: string;
  public name?: string | null;
  public birthday!: string;
  public city?: string | null;
  public joinDate?: Date;
}

Member.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userEmail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    joinDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'member_db',
    // timestamps: false, // createdAt, updatedAt을 사용하지 않을 경우
  }
);

export default Member;
