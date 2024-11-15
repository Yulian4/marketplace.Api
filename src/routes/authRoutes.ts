// src/routes/authRoutes.ts
import { Router } from 'express';
import { getCurrentUser, login, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';  // Importamos el middleware de autenticación

const router = Router();

// Ruta para el login (sin middleware, acceso público)
router.post('/login', login);

// Ruta para el logout (sin middleware, acceso público)
router.post('/logout', logout);

// Ruta para obtener el usuario actual (con middleware, solo accesible para usuarios autenticados)
router.get('/current-user', authMiddleware, getCurrentUser);



export default router;
