import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dataBase';


class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public documento!: string;
  public question!: string;
  public answer!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;

