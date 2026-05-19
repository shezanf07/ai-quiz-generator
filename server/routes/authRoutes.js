// Authentication routes for login, register, Google login and config.
import express from 'express';
import { register, login , googleLogin ,getConfig} from '../controllers/authController.js';

const router = express.Router();

// Email/password auth.
router.post('/register' , register);
router.post('/login', login);

// Google Sign-In support.
router.post('/google', googleLogin);
router.get('/config', getConfig);

export default router;
