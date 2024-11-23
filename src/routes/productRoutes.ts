import { Router } from 'express';
// import { getUserProducts, addProduct, approveProduct, getAdminProducts } from '../controllers/productController';
import { getUserProducts, addProduct, approveProduct, getAdminProducts, rejectProduct, deleteProduct,getApprovedProducts  } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


// Rutas protegidas con middleware de autenticación
router.get('/user-products', authMiddleware, getUserProducts);  // Ver productos de usuario
router.post('/add-product', authMiddleware, addProduct);  // Agregar producto

// Aprobar productos (solo admin)
router.put('/approve-product/:productId', authMiddleware, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acción no permitida' });
  }
  next();
}, approveProduct);

// Obtener productos pendientes para el admin
router.get('/admin-products', authMiddleware, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acción no permitida' });
  }
  next();
}, getAdminProducts);

// Añadir la ruta para obtener productos aprobados
router.get('/approved-products', getApprovedProducts);

// Rechazar producto
router.put('/reject-product/:productId', authMiddleware, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acción no permitida' });
  }
  next();
}, rejectProduct);

// Ruta para eliminar productos del usuario
router.delete('/delete-product/:productId', authMiddleware, deleteProduct);

export default router;
