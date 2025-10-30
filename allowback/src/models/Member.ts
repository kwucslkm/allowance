import { DataTypes, Model } from 'sequelize';
import { User } from '../../ts_ts/types';
import sequelize from '../db';

class Member extends Model<User> implements User {
  public id!: number;
  public nickname!: string;
  public password!: string;
  public birthday!: string;
  public name!: string;
  public city!: string;
  public mobile?: string;
  public userEmail?: string;
  public ori_yearAllowance!: number;
  public yearAllowance!: number;
}

Member.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: true,
    },
    userEmail: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ori_yearAllowance: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    yearAllowance: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'member_db',
  }
);

export default Member;
