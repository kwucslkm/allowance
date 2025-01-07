import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Allowance extends Model {
  public id!: number;
  public description!: string;
  public amount!: number;
  public date!: Date;
}

Allowance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    sequelize,
    tableName: 'allowances',
  }
);

export default Allowance;
