// Quiz model. Stores creator-approved questions, settings and share data.
import mongoose, { Schema } from "mongoose";

// MCQ option stored inside each quiz question.
const optionsSchema = new Schema({
    id: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
},
    { _id: false }
);

const questionSchema = new Schema({
    // number is shown to creators and students.
    number: {
        type: Number,
        required: true
    },
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [optionsSchema],
        default: []
    },
    correctOptionId: {
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true
    },
    explanation: {
        type: String,
        default: ""
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium"
    },
    displayOrder: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

const quizSchema = new Schema({
    // Owner of the quiz.
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sourceDocumentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SourceDocument"
    },
    aiGenerationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AiGeneration"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft"
    },
    theme: {
        type: String,
        enum: ["light", "dark-academic", "amber-glow"],
        default: "dark-academic"
    },
    questions: {
        type: [questionSchema],
        default: []
    },
    settings: {
        // Default quiz rules used when creator does not change config.
        timerEnabled: {
            type: Boolean,
            default: true
        },
        durationMinutes: {
            type: Number,
            default: 15,
            min: 1
        },
        passingScore: {
            type: Number,
            default: 70,
            min: 0,
            max: 100
        },
        allowRetake: {
            type: Boolean,
            default: false
        },
        shuffleQuestions: {
            type: Boolean,
            default: false
        },
        shuffleOptions: {
            type: Boolean,
            default: false
        },
        showCorrectAnswers: {
            type: Boolean,
            default: false
        }
    },
    share: {
        // Public link data is created when the quiz is published.
        shareId: {
            type: String,
            unique: true,
            sparse: true
        },
        shareUrl: {
            type: String,
            default: ""
        },
        expiryOption: {
            type: String,
            enum: ["24-hours", "7-days", "30-days", "never"],
            default: "24-hours"
        },
        qrValue: {
            type: String,
            default: ""
        }
    },
    analytics: {
        // Cached stats are updated after each submitted attempt.
        totalSubmissions: {
            type: Number,
            default: 0
        },
        passRate: {
            type: Number,
            default: 0
        },
        averageScore: {
            type: Number,
            default: 0
        }
    },
    publishedAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
  },
  { timestamps: true }
);


// Dashboard and public lookup indexes.
quizSchema.index({ creatorId: 1, updatedAt: -1 });
quizSchema.index({ sourceDocumentId: 1 });
quizSchema.index({ aiGenerationId: 1 });
quizSchema.index({ status: 1 });

export default mongoose.model("Quiz", quizSchema)
