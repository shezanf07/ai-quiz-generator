// AI generation model. Stores the generated questions and AI status.
import mongoose , {Schema} from 'mongoose';

// Option shape expected from the AI response.
const generatedOptionsSchema = new Schema({
    id: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
    },
    text: {
        type: String,
        required: true
    },
},
    {_id: false}
);

const generatedQuestionSchema = new Schema({
    // Gemini returns this as "question"; quiz service later maps it to questionText.
    question: {
        type: String,
        required: true
    },
    options: {
        type: [generatedOptionsSchema],
        default: []
    },
    correctOptionId: {
        type : String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
    },
    explanation: {
        type: String,
        default: ""
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    }
},
    {_id: false}
);

const aiGenerationSchema = new Schema({
    // Tracks who requested this generation.
    creatorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    sourceDocumentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SourceDocument'
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    provider: {
        type: String,
        enum: ['gemini', 'gpt-4', 'deepseek'],
        default: 'gemini'
    },
    model: {
        type: String,
        default: ""
    },
    promptVersion: {
        type: String,
        default: "v1"
    },
    request: {
        questionCount: {
            type: Number,
            default: 10
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium'
        },
    },
    generatedQuestions: {
        type: [generatedQuestionSchema],
        default: []
    },
    status: {
        type: String,
        // completed means the JSON was parsed and saved.
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    errorMessage: {
        type: String,
        default: ""
    },
    tokenUsage: {
        inputTokens: {
            type: Number,
            default: 0
        },
        outputTokens: {
            type: Number,
            default: 0
        },
        totalTokens: {
            type: Number,
            default: 0
        }
    }
},
    {timestamps: true}
);

// These indexes help if generation history grows later.
aiGenerationSchema.index({ creatorId: 1, createdAt: -1 });
aiGenerationSchema.index({ sourceDocumentId: 1 });
aiGenerationSchema.index({ quizId: 1 });
aiGenerationSchema.index({ status: 1});

export default mongoose.model('AiGeneration', aiGenerationSchema);
