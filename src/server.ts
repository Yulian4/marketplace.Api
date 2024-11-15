import app from './app';  // Importamos la aplicación de Express desde `app.ts`
import dotenv from 'dotenv';  // Importamos dotenv para leer las variables de entorno
import cors from 'cors';
dotenv.config();  // Cargamos las variables de entorno desde el archivo `.env`

const port = process.env.PORT || 3000;  // Usamos el puerto de las variables de entorno o 3000 por defecto


// Iniciamos el servidor de Express
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
