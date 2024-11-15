"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Ruta para el login (sin middleware, acceso público)
router.post('/login', authController_1.login);
// Ruta para el logout (sin middleware, acceso público)
// router.post('/logout', logout);
// Ruta para obtener el usuario actual (con middleware, solo accesible para usuarios autenticados)
// router.get('/current-user', authMiddleware, getCurrentUser);
exports.default = router;
