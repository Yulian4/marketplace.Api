import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';  // Asegúrate de que las rutas de auth estén importadas correctamente
import cors from 'cors';


const app = express();

app.use(cors({
    origin:"http://127.0.0.1:5500"
})); 
// Configura Express para que pueda leer los cuerpos de las solicitudes como JSON
app.use(bodyParser.json());

// Usa las rutas de autenticación
app.use('/auth', authRoutes);  // Todas las rutas de auth estarán bajo /auth

export default app;
app.post('/products/add-product', (req, res) => {
    const { name, description, price, user } = req.body;
    console.log('Producto recibido:', { name, description, price, user });
    // Aquí deberías agregar la lógica para procesar el producto (por ejemplo, guardarlo en la base de datos)
    res.status(200).send({ message: 'Producto agregado exitosamente' });
});