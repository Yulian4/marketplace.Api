import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Sequelize utilizando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as 'mysql',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3307,  // Usa el puerto 3307 por defecto si no se especifica
  }
);

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
