// AI routes for generating quiz questions.
import express from 'express';
import { generateQuestions } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js'

const router = express.Router();

// Generate quiz questions from a saved source document.
router.post('/generate' , protect, generateQuestions);

export default router;
