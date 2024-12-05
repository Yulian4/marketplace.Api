import { Router } from 'express';
import { getCurrentUser, registerUser, login, logout, resetPassword, Question, validateAnswer } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);

router.post('/logout', logout);

router.get('/current-user', authMiddleware, getCurrentUser);

router.post('/register', registerUser);

router.post('/reset-password', resetPassword);

router.post('/consult', Question);

router.post('/validate-answer', validateAnswer);

export default router;
