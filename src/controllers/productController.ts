import { Request, Response } from 'express';
import { Product } from '../models/product';
import { v4 as uuidv4 } from 'uuid';
import upload from '../middleware/multerConfig';

export const addProduct = async (req: Request, res: Response): Promise<Response> => {
  const { name, description, price } = req.body;
  const file = req.file;
  const user = req.user?.username;

  console.log('Archivo recibido:', file);

  if (!name || !description || !price || !user) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (!file) {
    return res.status(400).json({ message: 'El archivo de imagen es requerido' });
  }

  try {
    const newProduct = await Product.create({
      id: uuidv4(),
      name,
      description,
      price,
      status: 'Pendiente',
      user,
      image: file.filename 
    });

    return res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error al agregar producto', error: error.message });
    } else {
      return res.status(500).json({ message: 'Error desconocido al agregar producto' });
    }
  }
};








export const getUserProducts = async (req: Request, res: Response): Promise<Response> => {
  const username = req.user?.username;
  if (!username) {
    return res.status(400).json({ message: 'Usuario no autenticado' });
  }

  try {
    const userProducts = await Product.findAll({ where: { user: username } });
    if (userProducts.length === 0) {
      return res.status(404).json({ message: `No se encontraron productos para el usuario: ${username}` });
    }
    return res.status(200).json(userProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos del usuario', error });
  }
};

export const getAdminProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pendingProducts = await Product.findAll({ where: { status: 'Pendiente' } });
    if (pendingProducts.length === 0) {
      return res.status(404).json({ message: 'No hay productos pendientes' });
    }
    return res.status(200).json(pendingProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos pendientes', error });
  }
};

export const approveProduct = async (req: Request, res: Response): Promise<Response> => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.status = 'Aprobado';
      await product.save();
      return res.status(200).json({ message: 'Producto aprobado', product });
    } else {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al aprobar producto', error });
  }
};

export const rejectProduct = async (req: Request, res: Response): Promise<Response> => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.status = 'Rechazado';
      await product.save();
      return res.status(200).json({ message: 'Producto rechazado', product });
    } else {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al rechazar producto', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { productId } = req.params;
  const currentUser = req.user?.username;

  try {
    const product = await Product.findOne({ where: { id: productId, user: currentUser } });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para eliminarlo' });
    }

    await product.destroy();
    return res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};

export const getApprovedProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const approvedProducts = await Product.findAll({ where: { status: 'Aprobado' } });
    if (approvedProducts.length === 0) {
      return res.status(404).json({ message: 'No hay productos aprobados' });
    }
    return res.status(200).json(approvedProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos aprobados', error });
  }
};
