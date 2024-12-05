import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';  

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  console.log('Usuario ingresado:', username);  // Esto debería mostrar el valor de username
  console.log('Contraseña ingresada:', password);  // Esto debería mostrar el valor de password

  // Validar si los campos son vacíos
  if (!username || !password) {
    return res.status(400).json({ message: 'Username y contraseña son requeridos' });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const userExist = await User.findOne({ where: { username } });

    if (!userExist) {
      console.log('Usuario no encontrado:', username);  // Esto ayudará a ver si el usuario no existe en la DB
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña encriptada
    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (passwordMatch) {
      // Generar el token
      const token = jwt.sign({ username: userExist.username, role: userExist.role }, SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).json({
        message: 'Login exitoso',
        user: { username: userExist.username, role: userExist.role },
        token,
      });
    } else {
      console.log('Contraseña incorrecta para el usuario:', username);  // Esto ayudará a depurar si las contraseñas no coinciden
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);  // Log de error
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const logout = (req: Request, res: Response): Response => {
  return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

export const getCurrentUser = (req: Request, res: Response): Response => {
  if (req && req.user) {
    return res.status(200).json({ username: req.user.username, role: req.user.role });
  } else {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, password, documento, question, answer } = req.body;

  if (!username || !password || !documento || !question || !answer) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: 'user',
      documento,
      question,
      answer,
    });

    // Generar un token JWT
    const token = jwt.sign({ username: newUser.username, role: 'user' }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token y mensaje de éxito
    return res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { username, documento, question, answer, newPassword } = req.body;

  if (!username || !documento || !question || !answer || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const user = await User.findOne({ where: { username, documento, question, answer } });

    if (!user) {
      return res.status(401).json({ message: 'Información de recuperación incorrecta' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const Question = async (req: Request, res: Response): Promise<Response> => {
  const { username, documento } = req.body;

  if (!username || !documento) {
    return res.status(400).json({ message: 'Username y documento son requeridos' });
  }

  try {
    const user = await User.findOne({ where: { username, documento } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ question: user.question });
  } catch (error) {
    console.error('Error al consultar la pregunta secreta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const validateAnswer = async (req: Request, res: Response): Promise<Response> => {
  const { username, question, answer } = req.body;

  if (!username || !question || !answer) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
 
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.question !== question || user.answer !== answer) {
      return res.status(401).json({ message: 'Respuesta incorrecta' });
    }


    return res.status(200).json({ message: 'Respuesta válida, puedes proceder a cambiar la contraseña' });

  } catch (error) {
    console.error('Error al validar la respuesta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
