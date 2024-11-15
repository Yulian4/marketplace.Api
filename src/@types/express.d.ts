import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {  // `user` será un objeto que contiene `username` y `role`
        username: string;
        role: 'user' | 'admin';
      };
    }
  }
}
