import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { usuariosDB } from '../dataBase';

const SECRET_KEY = 'tu_clave_secreta';

// Controlador para login
export const login = (req: Request, res: Response): Response => {

  const { username, password } = req.body;

  const UserExist = usuariosDB.find(x=> x.username === username && x.password === password );

  if (UserExist) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    
    const response = res.status(200).json({
      message: 'Login successful',
      user: { username, role: UserExist.role},
      token,
    });
    return response;
    
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Controlador para logout
export const logout = (req: Request, res: Response): Response => {
  return res.status(200).json({ message: 'Logged out successfully' });
};

// Controlador para obtener el usuario actual
export const getCurrentUser = (req: Request, res: Response): Response => {
  
  if ( req && req.user) {
    return res.status(200).json({ username: req.user.username });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};
