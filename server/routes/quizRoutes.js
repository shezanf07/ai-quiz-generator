import express from 'express';
import { createQuiz, getUserQuizzes, getQuiz, updateQuiz, publishQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, createQuiz)
    .get(protect, getUserQuizzes);

router.route('/:id')
    .get(protect, getQuiz)
    .put(protect, updateQuiz);

router.post('/:id/publish', protect, publishQuiz);

export default router;