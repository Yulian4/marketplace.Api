"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Cambiar 'authenticateJWT' a 'authMiddleware'
const router = (0, express_1.Router)();
// Protect this route with the authentication middleware
router.get('/user-products', authMiddleware_1.authMiddleware, productController_1.getUserProducts); // Usar 'authMiddleware' aquí
router.post('/add-product', authMiddleware_1.authMiddleware, productController_1.addProduct); // Usar 'authMiddleware' aquí
exports.default = router;
