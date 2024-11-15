"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'tu_clave_secreta'; // Debes guardar esto de manera segura, por ejemplo en un archivo .env
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtenemos el token del encabezado Authorization
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    // Verificamos el token
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Asignamos el usuario decodificado a req.user
        req.user = decoded; // Aquí asignas el tipo `User` a `req.user`
        next(); // Pasamos al siguiente middleware o controlador
    });
};
exports.authMiddleware = authMiddleware;
