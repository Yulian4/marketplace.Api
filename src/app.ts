import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';  // Asegúrate de que las rutas de auth estén importadas correctamente
import cors from 'cors';
import productRoutes from './routes/productRoutes'; 
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

app.use(fileUpload())

app.use(cors({
    origin:"http://127.0.0.1:5500"
})); 
// Configura Express para que pueda leer los cuerpos de las solicitudes como JSON
app.use(bodyParser.json());

// Usa las rutas de autenticación
app.use('/auth', authRoutes);  // Todas las rutas de auth estarán bajo /auth

app.use('/api/products', productRoutes);

export default app;
