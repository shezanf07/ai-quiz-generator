// Quiz routes for draft, edit, list and publish actions.
import express from 'express';
import { createQuiz, getUserQuizzes, getQuiz, updateQuiz, publishQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Creator quiz list and draft creation.
router.route('/')
    .post(protect, createQuiz)
    .get(protect, getUserQuizzes);

// Creator-owned quiz read and edit.
router.route('/:id')
    .get(protect, getQuiz)
    .put(protect, updateQuiz);

// Publish creates the public share id and link.
router.post('/:id/publish', protect, publishQuiz);

export default router;
