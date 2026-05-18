import * as attemptService from '../services/attemptService.js';


export const getPublicQuiz = async (req, res) => {
    try {
        const quiz = await attemptService.getPublicQuiz(req.params.shareId);
        res.json(quiz);
    } catch (error) {
        const status = error.message.includes("expired") || error.message.includes("not found") ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};


export const submitAttempt = async (req, res) => {
    try {
        const { participant, answers, timeTakenSeconds } = req.body;
        
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Invalid answers format." });
        }

        const result = await attemptService.submitAttempt(req.params.shareId, participant, answers, timeTakenSeconds);
        
        res.status(201).json({
            message: "Quiz submitted successfully",
            score: result.score,
            percentage: result.percentage,
            passed: result.passed,
            results: result.answers // Detailed feedback sent back to student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getQuizAnalytics = async (req, res) => {
    try {
        const analytics = await attemptService.getQuizAnalytics(req.params.quizId, req.user._id);
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
