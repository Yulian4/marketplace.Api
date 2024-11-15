// src/custom.d.ts
import * as express from 'express';

// Extender la interfaz Request para incluir la propiedad 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { username: string };  // Define el tipo de 'user' como un objeto con 'username'
    }
  }
}
