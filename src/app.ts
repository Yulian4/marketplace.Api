import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'; 
import cors from 'cors';
import productRoutes from './routes/productRoutes'; 
import upload from './middleware/multerConfig'; 
import path from 'path';

const app = express();
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

app.use(cors({
    origin:"http://127.0.0.1:5500"
}));

app.use(bodyParser.json());
app.use(express.json());

// Usa las rutas de autenticación
app.use('/auth', authRoutes); 

app.use('/api/products', productRoutes);

export default app;
