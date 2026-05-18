import mongoose, { Schema } from "mongoose";

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


quizSchema.index({ creatorId: 1, updatedAt: -1 });
quizSchema.index({ sourceDocumentId: 1 });
quizSchema.index({ aiGenerationId: 1 });
quizSchema.index({ status: 1 });

export default mongoose.model("Quiz", quizSchema)