// src/routes/productRoutes.ts
import { Router } from 'express';
import { getUserProducts, addProduct, approveProduct, getAdminProducts } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas con middleware de autenticación
router.get('/user-products', authMiddleware, getUserProducts); // Ver productos de usuario
router.post('/add-product', authMiddleware, addProduct); // Agregar producto

// Aprobar productos (solo admin)
router.put('/approve-product/:productId', authMiddleware, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acción no permitida' });
  }
  next();
}, approveProduct);

router.get('/admin-products', authMiddleware, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acción no permitida' });
  }
  next();
}, getAdminProducts); // Obtener productos pendientes para el admin

export default router;

