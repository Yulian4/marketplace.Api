import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta_por_defecto';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err); 
      return res.status(401).json({ message: 'Token inválido' });
    }

    if (typeof decoded === 'object' && decoded !== null && 'username' in decoded && 'role' in decoded) {
      req.user = decoded as { username: string; role: 'user' | 'admin' };
      next();
    } else {
      return res.status(401).json({ message: 'Token inválido' });
    }
  });
};
