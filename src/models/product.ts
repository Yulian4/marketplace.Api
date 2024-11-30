import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dataBase'; // Asegúrate de importar la instancia de Sequelize

// Definir el tipo para los valores opcionales (cuando no se pasa un valor)
interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  user: string;
  image?: string;  // El campo image es opcional
}

// Define el modelo Product
export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public status!: string;
  public user!: string;
  public image!: string ;  // Hacer que image sea opcional
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  // El campo 'image' es opcional
    },
  },
  {
    sequelize, // La instancia de sequelize
    tableName: 'products', // Nombre de la tabla en la base de datos
    timestamps: true, // Si quieres campos de `createdAt` y `updatedAt`
  }
);
