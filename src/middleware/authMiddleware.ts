import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const SECRET_KEY = 'tu_clave_secreta'; 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];  
  if (!token) {
    return res.status(401).json({ message: 'Falta el Token' });
  }

  // Verificamos el token
  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token Invalido' });
    }
    req.user = decoded as User;  // Aquí asignas el tipo `User` a `req.user`

    req.body = {...req.body, user: req.user}
    next();  // Pasamos al siguiente middleware o controlador
  });
};
