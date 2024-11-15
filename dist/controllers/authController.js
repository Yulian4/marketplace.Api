"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'tu_clave_secreta';
// Controlador para login
const login = (req, res) => {
    console.log("Req", req);
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const token = jsonwebtoken_1.default.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            user: { username },
            token,
        });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
// Controlador para logout
const logout = (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
// Controlador para obtener el usuario actual
const getCurrentUser = (req, res) => {
    console.log("getCurrentUser", req.user);
    if (req && req.user) {
        return res.status(200).json({ username: req.user.username });
    }
    else {
        return res.status(404).json({ message: 'User not found' });
    }
};
exports.getCurrentUser = getCurrentUser;
