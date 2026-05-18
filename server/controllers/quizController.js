import * as quizService from '../services/quizService.js'
import Quiz from '../models/Quiz.model.js';

export const createQuiz = async (req , res) => {
    try {
        const {sourceDocumentId , aiGenerationId , title , questions } = req.body;

        if (req.user.role !== 'admin') {
            const quizCount = await Quiz.countDocuments({ creatorId: req.user._id });
            if (quizCount >= 1) {
                return res.status(403).json({
                    message: "Free tier limit reached. You can only generate 1 quiz. Upgrade to Admin for unlimited generations."
                });
            }
        }


          const quiz = await quizService.createQuiz({
            userId: req.user._id,
            sourceDocumentId,
            aiGenerationId,
            title,
            questions
        });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserQuizzes = async (req , res) => {
    try {
        const quizzes = await quizService.getUserQuizzes(req.user._id)
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getQuiz = async (req, res) => {
    try {
        const quiz = await quizService.getQuizById(req.params.id, req.user._id);
        res.json(quiz);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const quiz = await quizService.updateQuiz(req.params.id, req.user._id, req.body);
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const publishQuiz = async (req, res) => {
    try {
        const { expiryOption } = req.body;
        // Determine base URL dynamically or from env
        const baseUrl = process.env.FRONTEND_URL || req.headers.origin || `http://${req.headers.host}`;
        const quiz = await quizService.publishQuiz(req.params.id, req.user._id, baseUrl, expiryOption);
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};