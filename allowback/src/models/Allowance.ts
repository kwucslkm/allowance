import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

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
    }
  },
  {
    sequelize,
    tableName: 'allowances',
  }
);

export default Allowance;
