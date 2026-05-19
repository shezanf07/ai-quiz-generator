// Attempt routes for public quiz taking and creator analytics.
import express from 'express';
import { getPublicQuiz, submitAttempt, getQuizAnalytics } from '../controllers/attemptController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes for students.
router.get('/quiz/:shareId', getPublicQuiz);
router.post('/:shareId', submitAttempt);

// Protected route for creator stats.
router.get('/analytics/:quizId', protect, getQuizAnalytics);

export default router;
