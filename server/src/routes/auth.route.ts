import { Router } from 'express';
import { register, login, logout, refresh, getMe } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../middleware/validators/auth.validator';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', authenticate, getMe);

export default router;
