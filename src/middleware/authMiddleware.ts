import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Usa una clave secreta más segura y guárdala en una variable de entorno
const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta_por_defecto';

// Middleware de autenticación
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err); 
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Asegurarse de que 'decoded' es del tipo esperado
    req.user = decoded as { username: string; role: 'user' | 'admin' };
    next();
  });
};
