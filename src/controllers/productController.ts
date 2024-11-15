import { Request, Response } from 'express';
import { Product } from '../models/product';
import { productosDB as products } from '../dataBase';

// Simulación de base de datos
 // let products: Product[] = [];

// Añadir un producto
export const addProduct = (req: Request, res: Response): Response => {
  const { name, description, price, user } = req.body;

  if (!name || !description || !price || !user) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const newProduct: Product = {
    name,
    description,
    price,
    status: 'pending',
    user,
  };
  products.push(newProduct);
  return res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
};

// src/controllers/productController.ts

export const getUserProducts = (req: Request, res: Response): Response => {
  const { username } = req.params;
  const userProducts = products.filter(p => p.user === username);

  if (userProducts.length === 0) {
    return res.status(404).json({ message: `No se encontraron productos para el usuario: ${username}` });
  }

  return res.status(200).json(userProducts);
};

// Agregar el controlador getAdminProducts aquí:
export const getAdminProducts = (req: Request, res: Response): Response => {
  const pendingProducts = products.filter(p => p.status === 'pending');  // Filtra los productos pendientes

  if (pendingProducts.length === 0) {
    return res.status(404).json({ message: 'No hay productos pendientes' });
  }

  return res.status(200).json(pendingProducts);  // Devuelve los productos pendientes
};

// Aprobar un producto por ID
export const approveProduct = (req: Request, res: Response): Response => {
  const { productId } = req.params; // Obtiene el ID del producto de los parámetros de la ruta

  const product = products.find(p => p.name === productId); // Cambia esto para buscar por ID, no por nombre

  if (product) {
    product.status = 'approved'; // Cambia el estado del producto a 'approved'
    return res.status(200).json({ message: 'Producto aprobado', product });
  } else {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};
