// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';  // Importa la interfaz User

const SECRET_KEY = 'tu_clave_secreta';  // Debes guardar esto de manera segura, por ejemplo en un archivo .env

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Obtenemos el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  // Verificamos el token
  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Asignamos el usuario decodificado a req.user
    req.user = decoded as User;  // Aquí asignas el tipo `User` a `req.user`

    next();  // Pasamos al siguiente middleware o controlador
  });
};
