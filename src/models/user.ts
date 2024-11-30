import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dataBase'; // Asegúrate de que la ruta sea correcta

// Definir las interfaces para los atributos y creación
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: string;
  documento: string;
  createdAt: Date;     // Fecha de creación
  updatedAt: Date;     // Fecha de última actualización
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;              // ID del usuario, generado automáticamente
  public username!: string;        // Nombre de usuario, debe ser único
  public password!: string;        // Contraseña encriptada
  public role!: string;            // Rol del usuario ('user' o 'admin')
  public documento!: string;       // Documento de identificación
  public readonly createdAt!: Date; // Fecha de creación
  public readonly updatedAt!: Date; // Fecha de última actualización
}

// Inicialización del modelo
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,  // ID autoincremental
      primaryKey: true,     // Este es el campo principal de la tabla
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,          // Asegura que el nombre de usuario sea único
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,      // La contraseña no puede ser nula
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',  // Valor por defecto para el rol
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: true,      // El documento no puede ser nulo
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Sequelize establecerá la fecha de creación
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Sequelize actualizará la fecha de actualización
    },
  },
  {
    sequelize,              // Instancia de sequelize
    tableName: 'users',     // Nombre de la tabla en la base de datos
    modelName: 'User',      // Nombre del modelo en sequelize
    timestamps: true,       // Maneja automáticamente las fechas createdAt y updatedAt
    createdAt: 'createdAt', // Asegura que Sequelize maneje 'createdAt'
    updatedAt: 'updatedAt', // Asegura que Sequelize maneje 'updatedAt'
  }
);

export default User;
