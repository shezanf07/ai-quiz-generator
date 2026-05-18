import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register' , register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/config', getConfig);

export default router;