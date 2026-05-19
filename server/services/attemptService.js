// Attempt service. It hides answers before the quiz and grades submissions.
import Quiz from '../models/Quiz.model.js';
import Attempt from '../models/Attempt.model.js';

export const getPublicQuiz = async (shareId) => {
    const quiz = await Quiz.findOne({ "share.shareId": shareId, status: "published" });

    if (!quiz) {
        throw new Error("Quiz not found or no longer available.");
    }

    // Check expiry.
    if (quiz.expiresAt && new Date() > quiz.expiresAt) {
        throw new Error("This quiz link has expired.");
    }

    // Remove correct answers before sending quiz to students.
    const safeQuestions = quiz.questions.map(q => ({
        _id: q._id,
        number: q.number,
        questionText: q.questionText,
        type: q.type,
        options: q.options.map(opt => ({
            id: opt.id,
            text: opt.text
        })),
        difficulty: q.difficulty,
        displayOrder: q.displayOrder
    }));

    return {
        _id: quiz._id,
        title: quiz.title,
        theme: quiz.theme,
        settings: quiz.settings,
        questions: safeQuestions
    };
};

export const submitAttempt = async (shareId, participantData, answers, timeTakenSeconds) => {

    const quiz = await Quiz.findOne({ "share.shareId": shareId, status: "published" });

    if (!quiz) {
        throw new Error("Quiz not found or no longer available.");
    }

    if (quiz.expiresAt && new Date() > quiz.expiresAt) {
        throw new Error("This quiz link has expired.");
    }


    let correctCount = 0;
    const gradedAnswers = [];

    // Map questions once so answer grading is simple.
    const questionMap = new Map();
    quiz.questions.forEach(q => {
        questionMap.set(q._id.toString(), q);
    });

    for (const submittedAnswer of answers) {
        const actualQuestion = questionMap.get(submittedAnswer.questionId);

        if (!actualQuestion) continue;
        const isCorrect = submittedAnswer.selectedOptionId === actualQuestion.correctOptionId;
        if (isCorrect) correctCount++;

        // Get option text for record keeping.
        const selectedOpt = actualQuestion.options.find(o => o.id === submittedAnswer.selectedOptionId);
        const correctOpt = actualQuestion.options.find(o => o.id === actualQuestion.correctOptionId);

        gradedAnswers.push({
            questionId: actualQuestion._id,
            questionText: actualQuestion.questionText,
            selectedOptionId: (submittedAnswer.selectedOptionId && ["A", "B", "C", "D"].includes(submittedAnswer.selectedOptionId)) ? submittedAnswer.selectedOptionId : undefined,
            selectedOptionText: selectedOpt ? selectedOpt.text : "",
            correctOptionId: actualQuestion.correctOptionId,
            correctOptionText: correctOpt ? correctOpt.text : "",
            isCorrect: isCorrect,
            timeTakenSeconds: submittedAnswer.timeTakenSeconds || 0
        });
    }

    const totalQuestions = quiz.questions.length;
    const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const passed = percentage >= (quiz.settings?.passingScore || 70);

    // Save the final attempt after grading.
    const attempt = await Attempt.create({
        quizId: quiz._id,
        shareId: shareId,
        participant: {
            name: participantData?.name || "Anonymous",
            email: participantData?.email || ""
        },
        answers: gradedAnswers,
        score: correctCount,
        totalQuestions: totalQuestions,
        percentage: percentage,
        passed: passed,
        timeTakenSeconds: timeTakenSeconds || 0,
        status: "submitted",
        submittedAt: new Date()
    });

    quiz.analytics.totalSubmissions += 1;

    // Update cached analytics so stats page stays fast.
    const prevTotal = quiz.analytics.totalSubmissions - 1;
    const currentTotal = quiz.analytics.totalSubmissions;

    quiz.analytics.averageScore = ((quiz.analytics.averageScore * prevTotal) + percentage) / currentTotal;
    quiz.analytics.passRate = ((quiz.analytics.passRate * prevTotal) + (passed ? 100 : 0)) / currentTotal;

    await quiz.save();

    return attempt;
};

export const getQuizAnalytics = async (quizId, userId) => {

    // Make sure the stats request belongs to the quiz creator.
    const quiz = await Quiz.findOne({ _id: quizId, creatorId: userId });
    if (!quiz) throw new Error("Quiz not found or unauthorized");

    // Latest submitted attempts are shown in the stats table.
    const attempts = await Attempt.find({ quizId: quiz._id, status: "submitted" })
        .sort({ submittedAt: -1 })
        .limit(100);

    return {
        quizSummary: {
            title: quiz.title,
            analytics: quiz.analytics,
            settings: quiz.settings
        },
        recentSubmissions: attempts.map(a => ({
            id: a._id,
            name: a.participant.name,
            score: `${Math.round(a.percentage)}%`,
            time: `${Math.round(a.timeTakenSeconds / 60)}m ${a.timeTakenSeconds % 60}s`,
            status: a.passed ? "Passed" : "Failed",
            date: a.submittedAt
        }))
    };
};
