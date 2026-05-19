// Quiz service. It creates, updates, publishes and lists quizzes.
import Quiz from '../models/Quiz.model.js';
import { nanoid } from 'nanoid';

export const createQuiz = async ({ userId, sourceDocumentId, aiGenerationId, title, questions = [] }) => {

    // AI returns "question", but the quiz editor expects "questionText".
    const processedQuestions = questions.map((q, index) => ({
        ...q,
        questionText: q.questionText || q.question,
        number: index + 1,
        displayOrder: index
    }));

    const quiz = await Quiz.create({
        creatorId: userId,
        sourceDocumentId,
        aiGenerationId,
        title: title || "Untitled Quiz",
        questions: processedQuestions,
        status: "draft"
    });

    return quiz;

};

export const updateQuiz = async (quizId, userId, updates) => {
    // Every edit is scoped to the logged-in creator.
    const quiz = await Quiz.findOne({ _id: quizId, creatorId: userId });

    if (!quiz) throw new Error("Quiz not found or unauthorized");

    if (updates.title) quiz.title = updates.title;
    if (updates.theme) quiz.theme = updates.theme;

    if (updates.settings) {
        // Merge settings so missing fields keep their old values.
        quiz.settings = { ...quiz.settings, ...updates.settings };
    }

    if (updates.questions) {
        // Re-number questions after edits.
        quiz.questions = updates.questions.map((q, index) => ({
            ...q,
            questionText: q.questionText || q.question,
            number: index + 1,
            displayOrder: index
        }));
    }

    await quiz.save();
    return quiz;

};

export const publishQuiz = async (quizId, userId, baseUrl, expiryOption = "24-hours") => {
    const quiz = await Quiz.findOne({ _id: quizId, creatorId: userId });
    if (!quiz) throw new Error("Quiz not found or unauthorized");

    if (quiz.status === 'published' && quiz.share?.shareId) {
        // Do not create a new link if the quiz is already published.
        return quiz;
    }

    const shareId = nanoid(8);

    // Convert expiry option into an actual date.
    let expiresAt = null;
    const now = new Date();
    if (expiryOption === "24-hours") {
        expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else if (expiryOption === "7-days") {
        expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (expiryOption === "30-days") {
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    quiz.status = "published";
    quiz.publishedAt = now;
    quiz.expiresAt = expiresAt;
    quiz.share = {
        shareId,
        shareUrl: `${baseUrl}/quiz/${shareId}`,
        expiryOption,
        qrValue: `${baseUrl}/quiz/${shareId}`
    };

    await quiz.save();
    return quiz;
};

export const getUserQuizzes = async (userId) => {
    // Dashboard needs only summary fields, not full quiz data.
    const quizzes = await Quiz.find({ creatorId: userId, status: { $ne: "archived" } })
        .sort({ updatedAt: -1 })
        .select("title type status questions updatedAt share analytics");

    return quizzes.map(quiz => ({
        id: quiz._id,
        title: quiz.title,
        type: quiz.type,
        questionsCount: quiz.questions.length,
        date: quiz.updatedAt,
        status: quiz.status,
        shareUrl: quiz.share?.shareUrl || "",
        totalSubmissions: quiz.analytics.totalSubmissions
    }));

};

export const getQuizById = async (quizId, userId) => {
    const quiz = await Quiz.findOne({ _id: quizId, creatorId: userId });
    if (!quiz) throw new Error("Quiz not found or unauthorized");
    return quiz;
};
