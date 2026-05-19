// AI controller. It asks the AI service to generate questions.
import * as aiService from '../services/aiService.js';
import Quiz from '../models/Quiz.model.js';

export const generateQuestions = async (req, res) => {
    try {
        const { sourceDocumentId, questionCount, difficulty } = req.body;

        const userId = req.user._id;


        // Free creators are limited to one generated quiz.
        if (req.user.role !== 'admin') {
            const quizCount = await Quiz.countDocuments({ creatorId: userId });
            if (quizCount >= 1) {
                return res.status(403).json({
                    message: "Free tier limit reached. You can only generate 1 quiz. Upgrade to Premium for unlimited generations."
                });
            }
        }

        if (!sourceDocumentId) {
            return res.status(400).json({
                message: "sourceDocumentId is required"
            });
        }
        // Avoid very small or very large AI requests.
        const safeCount = Math.min(Math.max(Number(questionCount) || 10, 1), 50);

        const result = await aiService.generateQuizQuestions({
            userId,
            sourceDocumentId,
            questionCount: safeCount,
            difficulty: difficulty || 'medium'
        });

        res.status(200).json({
            messsage: "Quiz Generated Successfully",
            data: result
        });


    } catch (error) {
        console.error("AI Generation Error:", error.message);

        // Map error to correct HTTP status
        let statusCode = 400;
        if (error.message.includes("Unauthorized")) statusCode = 403;
        else if (error.message.includes("not found")) statusCode = 404;
        else if (error.message.includes("AI Generation Failed")) statusCode = 502; // Bad Gateway

        res.status(statusCode).json({ message: error.message || "Server error during AI generation" });
    }
};
