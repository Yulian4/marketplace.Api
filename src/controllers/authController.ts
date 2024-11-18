import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usuariosDB } from '../dataBase';
import { User } from '../models/user';

const SECRET_KEY = 'tu_clave_secreta';

// Controlador para login
export const login = (req: Request, res: Response): Response => {
  const { username, password } = req.body;

  const userExist = usuariosDB.find(user => user.username === username);

  if (!userExist) {
    return res.status(401).json({ message: 'Credenciales Invalidas' });
  }

  const passwordMatch = bcrypt.compareSync(password, userExist.password);

  if (passwordMatch) {
    const token = jwt.sign({ username, role: userExist.role }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      user: { username, role: userExist.role },
      token,
    });
  } else {
    return res.status(401).json({ message: 'Credenciales Invalidas' });
  }
};

// Controlador para logout
export const logout = (req: Request, res: Response): Response => {
  return res.status(200).json({ message: 'Inicio de Sesion exitoso' });
};

// Controlador para obtener el usuario actual
export const getCurrentUser = (req: Request, res: Response): Response => {
  if (req && req.user) {
    return res.status(200).json({ username: req.user.username, role: req.user.role });
  } else {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

// Controlador para registrar usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, password, documento } = req.body;

  // Validación de campos
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Verificar si el usuario ya existe
  const existingUser = usuariosDB.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    username,
    password: hashedPassword,
    role: 'user',  
    documento,    
  };

  // Guardar el nuevo usuario en la "base de datos"
  usuariosDB.push(newUser);

  // Generar un token JWT
  const token = jwt.sign({ username, role: 'user' }, SECRET_KEY, { expiresIn: '1h' });

  // Responder con el token y mensaje de éxito
  return res.status(201).json({ message: 'Usuario registrado exitosamente', token });
};
