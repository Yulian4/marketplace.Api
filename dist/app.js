"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Asegúrate de que las rutas de auth estén importadas correctamente
const app = (0, express_1.default)();
// Configura Express para que pueda leer los cuerpos de las solicitudes como JSON
app.use(body_parser_1.default.json());
// Usa las rutas de autenticación
app.use('/auth', authRoutes_1.default); // Todas las rutas de auth estarán bajo /auth
exports.default = app;
