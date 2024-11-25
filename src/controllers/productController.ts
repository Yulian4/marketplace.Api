import { Request, Response } from 'express';
import { Product } from '../models/product';
import { productosDB as products } from '../dataBase';
import { v4 as uuidv4 } from 'uuid';
import { appendFile, NoParamCallback } from 'fs';

export const addProduct = (req: Request, res: Response): Response => {

  const { name, description, price, user: { username } } = req.body;

  const file = req.files?.file as {name:string, data: any};
  console.log("res2", file?.name);

  appendFile("E:/MarketplaceProject/marketplace/assets/images/products/"+ file?.name, file.data, ()=>{});
  
  // const user = req.user?.username;
  if (!name || !description || !price || !username) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const newProduct: Product = {
    id: uuidv4(),
    name,
    description,
    price,
    status: 'Pendiente',  
    user: username,
    image: file?.name
  };
  products.push(newProduct);
  return res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
};

export const getUserProducts = (req: Request, res: Response): Response => {
  const username = req.user?.username;  // Obtén el username del usuario autenticado
  if (!username) {
    return res.status(400).json({ message: 'Usuario no autenticado' });
  }

  const userProducts = products.filter(p => p.user === username);

  if (userProducts.length === 0) {
    return res.status(404).json({ message: `No se encontraron productos para el usuario: ${username}` });
  }

  return res.status(200).json(userProducts);
};

// Agregar el controlador getAdminProducts aquí:
export const getAdminProducts = (req: Request, res: Response): Response => {
  const pendingProducts = products.filter(p => p.status === 'Pendiente');  

  if (pendingProducts.length === 0) {
    return res.status(404).json({ message: 'No hay productos pendientes' });
  }

  return res.status(200).json(pendingProducts);  // Devuelve los productos pendientes
};

// Aprobar un producto por ID
export const approveProduct = (req: Request, res: Response): Response => {
  const { productId } = req.params;

  // Busca el producto por ID, no por nombre
  const product = products.find(p => p.id === productId);

  if (product) {
    product.status = 'Aprobado';
    return res.status(200).json({ message: 'Producto aprobado', product });
  } else {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};

// Rechazar un producto
export const rejectProduct = (req: Request, res: Response): Response => {
  const { productId } = req.params; 

  const product = products.find(p => p.id === productId); 

  if (product) {
    product.status = 'Rechazado'; // Cambia el estado del producto a 'rechazado'
    return res.status(200).json({ message: 'Producto Rechazado', product });
  } else {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};

// Eliminar una solicitud de producto
export const deleteProduct = (req: Request, res: Response): Response => {
  const { productId } = req.params;
  const currentUser = req.user?.username;

  const productIndex = products.findIndex(p => p.id === productId && p.user === currentUser);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para eliminarlo' });
  }

  products.splice(productIndex, 1); // Elimina el producto del array
  return res.status(200).json({ message: 'Producto eliminado exitosamente' });
};
// Agregar el controlador para obtener productos aprobados
export const getApprovedProducts = (req: Request, res: Response): Response => {
  const approvedProducts = products.filter(p => p.status === 'Aprobado'); 

  if (approvedProducts.length === 0) {
    return res.status(404).json({ message: 'No hay productos aprobados' });
  }

  return res.status(200).json(approvedProducts);  // Devuelve los productos aprobados
};
