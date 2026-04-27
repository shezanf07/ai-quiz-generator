# AI-Powered Quiz Generator

## Complete Backend Schema Design

This file contains the Mongoose schemas required by the current Quizly frontend and the backend flow behind it.

The important flow is:

```text
Creator uploads file or pastes text
-> Backend stores source metadata
-> Backend extracts text from the file
-> Extracted text is stored in SourceDocument.extractedText
-> AI generation reads SourceDocument.extractedText
-> AI output is stored in AiGeneration
-> Creator-approved questions are saved in Quiz.questions
-> Dashboard fetches summaries from Quiz
-> Student attempts are saved in Attempt
```

---

## 1. Should Parsed Text Be Stored?

Yes, for this project it should be stored.

When a PDF, DOCX or TXT file is uploaded, the backend should not send the raw file directly to the AI every time. The backend should first parse the file into plain text, clean it, and store that extracted text. Then AI generation should use the stored extracted text.

This is useful because:

- The creator can retry AI generation without uploading the same file again.
- The backend can debug failed or poor AI generations.
- The quiz can remember which source material created it.
- The editor can be reloaded safely if the page refreshes.
- The backend can avoid reparsing large files repeatedly.

In a production app, the original uploaded file is usually stored in object storage such as S3, Cloudinary, Firebase Storage or local private storage. MongoDB should store metadata and extracted text, not large binary files. For this college project, storing metadata and extracted text in MongoDB is enough.

If privacy becomes a concern, extracted text can be deleted after the quiz is generated. In that case, keep only metadata and the generated quiz.

---

## 2. Model List

| Model | Collection | Purpose |
| --- | --- | --- |
| `User` | `users` | Creator accounts and authentication |
| `SourceDocument` | `source_documents` | Uploaded file or pasted text plus extracted text |
| `AiGeneration` | `ai_generations` | AI prompt/output history for generated questions |
| `Quiz` | `quizzes` | Quiz title, settings, questions, share link and dashboard data |
| `Attempt` | `attempts` | Student attempts, submitted answers and results |

Optional later:

| Model | Purpose |
| --- | --- |
| `RefreshToken` | Needed only if using refresh-token auth |
| `Template` | Needed only if quiz themes become editable from the database |

---

## 3. User Model

File:

```text
server/models/User.js
```

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: function () {
        return this.authProvider === "email";
      }
    },
    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email"
    },
    googleId: {
      type: String,
      sparse: true
    },
    role: {
      type: String,
      enum: ["creator", "admin"],
      default: "creator"
    },
    avatarUrl: {
      type: String,
      default: ""
    },
    settings: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light"
      }
    },
    lastLoginAt: {
      type: Date
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { sparse: true });

export default mongoose.model("User", userSchema);
```

---

## 4. SourceDocument Model

This model replaces the simple idea of an upload. It represents both uploaded files and pasted text.

This is where parsed text is stored.

File:

```text
server/models/SourceDocument.js
```

```js
import mongoose from "mongoose";

const sourceDocumentSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sourceType: {
      type: String,
      enum: ["file", "text"],
      required: true
    },
    originalName: {
      type: String,
      trim: true,
      default: ""
    },
    mimeType: {
      type: String,
      default: ""
    },
    extension: {
      type: String,
      enum: ["pdf", "docx", "txt", ""],
      default: ""
    },
    sizeBytes: {
      type: Number,
      default: 0
    },
    storageProvider: {
      type: String,
      enum: ["local", "s3", "cloudinary", "none"],
      default: "none"
    },
    storageKey: {
      type: String,
      default: ""
    },
    fileUrl: {
      type: String,
      default: ""
    },
    rawText: {
      type: String,
      default: ""
    },
    extractedText: {
      type: String,
      required: true
    },
    cleanedText: {
      type: String,
      default: ""
    },
    wordCount: {
      type: Number,
      default: 0
    },
    characterCount: {
      type: Number,
      default: 0
    },
    checksum: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["uploaded", "parsing", "ready", "failed"],
      default: "uploaded"
    },
    parseError: {
      type: String,
      default: ""
    },
    parsedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

sourceDocumentSchema.index({ creatorId: 1, createdAt: -1 });
sourceDocumentSchema.index({ checksum: 1 });
sourceDocumentSchema.index({ status: 1 });

export default mongoose.model("SourceDocument", sourceDocumentSchema);
```

### SourceDocument Field Meaning

| Field | Why it exists |
| --- | --- |
| `originalName` | Shows uploaded file name, for example `lecture_notes.pdf` |
| `storageKey` | Points to original file in storage if keeping the file |
| `extractedText` | Main parsed text used by AI |
| `cleanedText` | Optional normalized text after removing repeated spaces, headers, etc. |
| `wordCount` | Helps reject very small/large documents |
| `checksum` | Helps detect duplicate uploads |
| `status` | Lets frontend show upload/parsing/ready/failed |

### Upload Flow

```js
// 1. File is received by multer.
// 2. File parser extracts text.
// 3. Backend stores extracted text in SourceDocument.
// 4. Backend returns sourceDocumentId to frontend.

const sourceDocument = await SourceDocument.create({
  creatorId: req.user.id,
  sourceType: "file",
  originalName: req.file.originalname,
  mimeType: req.file.mimetype,
  extension: "pdf",
  sizeBytes: req.file.size,
  storageProvider: "local",
  storageKey: req.file.filename,
  extractedText,
  cleanedText,
  wordCount,
  characterCount: cleanedText.length,
  status: "ready",
  parsedAt: new Date()
});
```

---

## 5. AiGeneration Model

This model stores the AI generation request and response. It is useful because quiz generation is not always perfect, and the creator may regenerate questions.

File:

```text
server/models/AiGeneration.js
```

```js
import mongoose from "mongoose";

const generatedOptionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
);

const generatedQuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["mcq", "true_false", "fill_blank"],
      default: "mcq"
    },
    options: {
      type: [generatedOptionSchema],
      default: []
    },
    correctOptionId: {
      type: String,
      enum: ["A", "B", "C", "D"]
    },
    explanation: {
      type: String,
      default: ""
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  { _id: false }
);

const aiGenerationSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sourceDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SourceDocument",
      required: true
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    },
    provider: {
      type: String,
      default: "openai"
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
      questionType: {
        type: String,
        enum: ["mcq", "mixed"],
        default: "mcq"
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium"
      }
    },
    generatedQuestions: {
      type: [generatedQuestionSchema],
      default: []
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
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
    },
    generatedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

aiGenerationSchema.index({ creatorId: 1, createdAt: -1 });
aiGenerationSchema.index({ sourceDocumentId: 1 });
aiGenerationSchema.index({ quizId: 1 });
aiGenerationSchema.index({ status: 1 });

export default mongoose.model("AiGeneration", aiGenerationSchema);
```

### AI Generation Flow

```js
// 1. Backend receives sourceDocumentId.
// 2. Backend fetches SourceDocument.
// 3. Backend sends sourceDocument.cleanedText or extractedText to AI.
// 4. AI response is stored in AiGeneration.generatedQuestions.
// 5. Questions are copied into Quiz.questions after validation.

const sourceDocument = await SourceDocument.findById(sourceDocumentId);

const aiGeneration = await AiGeneration.create({
  creatorId: req.user.id,
  sourceDocumentId,
  request: {
    questionCount: 10,
    questionType: "mcq",
    difficulty: "medium"
  },
  status: "pending"
});

const generatedQuestions = await generateQuestionsFromText(
  sourceDocument.cleanedText || sourceDocument.extractedText
);

aiGeneration.generatedQuestions = generatedQuestions;
aiGeneration.status = "success";
aiGeneration.generatedAt = new Date();
await aiGeneration.save();
```

---

## 6. Quiz Model

The dashboard fetches quiz card data from this model.

File:

```text
server/models/Quiz.js
```

```js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D"]
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true
    },
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["mcq", "true_false", "fill_blank"],
      default: "mcq"
    },
    options: {
      type: [optionSchema],
      default: []
    },
    correctOptionId: {
      type: String,
      enum: ["A", "B", "C", "D"]
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

const quizSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      enum: ["Multiple Choice", "Mixed"],
      default: "Multiple Choice"
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
        default: true
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
        default: true
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
        default: "30-days"
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
quizSchema.index({ "share.shareId": 1 }, { unique: true, sparse: true });
quizSchema.index({ status: 1 });

export default mongoose.model("Quiz", quizSchema);
```

### Dashboard Query

The dashboard does not need a separate collection. It fetches summaries from `Quiz`.

```js
const quizzes = await Quiz.find({
  creatorId: req.user.id,
  status: { $ne: "archived" }
})
  .sort({ updatedAt: -1 })
  .select("title type status questions updatedAt share analytics");

const dashboardCards = quizzes.map((quiz) => ({
  id: quiz._id,
  title: quiz.title,
  type: quiz.type,
  questions: quiz.questions.length,
  date: quiz.updatedAt,
  status: quiz.status,
  shareUrl: quiz.share?.shareUrl || "",
  totalSubmissions: quiz.analytics.totalSubmissions
}));
```

Dashboard field mapping:

| Dashboard UI | Quiz field |
| --- | --- |
| Quiz title | `title` |
| Question count | `questions.length` |
| Quiz type | `type` |
| Last updated date | `updatedAt` |
| Share link | `share.shareUrl` |
| Stats | `analytics` |

---

## 7. Attempt Model

File:

```text
server/models/Attempt.js
```

```js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    selectedOptionId: {
      type: String,
      enum: ["A", "B", "C", "D"]
    },
    selectedOptionText: {
      type: String,
      default: ""
    },
    correctOptionId: {
      type: String,
      enum: ["A", "B", "C", "D"]
    },
    correctOptionText: {
      type: String,
      default: ""
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    },
    timeTakenSeconds: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },
    shareId: {
      type: String,
      required: true
    },
    participant: {
      name: {
        type: String,
        default: "Anonymous"
      },
      email: {
        type: String,
        default: ""
      }
    },
    answers: {
      type: [answerSchema],
      default: []
    },
    score: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
    },
    passed: {
      type: Boolean,
      default: false
    },
    timeTakenSeconds: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["in_progress", "submitted", "expired"],
      default: "in_progress"
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    submittedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

attemptSchema.index({ quizId: 1, submittedAt: -1 });
attemptSchema.index({ shareId: 1 });
attemptSchema.index({ status: 1 });

export default mongoose.model("Attempt", attemptSchema);
```

---

## 8. Complete Backend Data Flow

### 8.1 File Upload to Parsed Text

```text
Frontend UploadPage
-> POST /api/source/file
-> multer receives file
-> parser extracts plain text
-> text cleaner normalizes extracted text
-> SourceDocument is created
-> response returns sourceDocumentId and status ready
```

The parsed text is stored here:

```text
SourceDocument.extractedText
SourceDocument.cleanedText
```

### 8.2 Pasted Text to Source Document

```text
Frontend UploadPage textarea
-> POST /api/source/text
-> backend stores pasted text directly
-> SourceDocument is created with sourceType text
```

For pasted text:

```text
SourceDocument.extractedText = pasted text
SourceDocument.cleanedText = cleaned pasted text
```

### 8.3 Source Document to AI Generation

```text
Frontend clicks Generate Quiz With AI
-> POST /api/ai/generate
-> request includes sourceDocumentId
-> backend loads SourceDocument.cleanedText
-> backend sends cleaned text to AI provider
-> backend validates AI response
-> AiGeneration stores generated questions
```

### 8.4 AI Generation to Quiz Editor

```text
AI output
-> validated by backend
-> copied into Quiz.questions
-> Quiz saved as draft
-> frontend opens /create/edit with quizId
```

The editor reads and updates:

```text
Quiz.questions.questionText
Quiz.questions.options
Quiz.questions.correctOptionId
```

### 8.5 Quiz to Dashboard

```text
Dashboard
-> GET /api/quizzes
-> backend queries Quiz by creatorId
-> returns title, type, question count, status, updatedAt, analytics
```

### 8.6 Quiz Publish to Share Page

```text
Config page publish button
-> POST /api/quizzes/:id/publish
-> backend creates share.shareId and share.shareUrl
-> backend sets status published
-> frontend displays shareUrl and QR code
```

### 8.7 Student Attempt to Results and Stats

```text
Student opens /quiz/:shareId
-> backend returns public quiz without correct answers
-> student submits answers
-> backend scores attempt
-> Attempt stores result
-> Stats page aggregates Attempt documents
```

---

## 9. Relationship Summary

```text
User 1 -> many SourceDocuments
User 1 -> many AiGenerations
User 1 -> many Quizzes
SourceDocument 1 -> many AiGenerations
SourceDocument 1 -> many Quizzes
AiGeneration 1 -> one Quiz
Quiz 1 -> many embedded Questions
Question 1 -> many embedded Options
Quiz 1 -> many Attempts
Attempt 1 -> many embedded Answers
```

---

## 10. Required Schemas by Frontend Feature

| Frontend feature | Required schema |
| --- | --- |
| Login/Register | `User` |
| Google OAuth | `User` |
| Upload PDF/DOCX/TXT | `SourceDocument` |
| Paste plain text | `SourceDocument` |
| Send parsed text to AI | `SourceDocument`, `AiGeneration` |
| Store generated questions | `AiGeneration`, `Quiz` |
| Dashboard quiz cards | `Quiz` |
| Quiz editor | `Quiz.questions` |
| Config page | `Quiz.settings`, `Quiz.theme`, `Quiz.title` |
| Share link and QR code | `Quiz.share` |
| Student quiz page | Public-safe `Quiz` data |
| Results page | `Attempt` |
| Stats page | `Attempt`, `Quiz.analytics` |

---

## 11. Production Notes

For a real production system:

- Store the original uploaded file outside MongoDB.
- Store file metadata and extracted text in MongoDB.
- Use `SourceDocument.storageKey` to point to the stored file.
- Use `SourceDocument.extractedText` or `cleanedText` for AI generation.
- Do not send correct answers in public quiz responses.
- Store AI output in `AiGeneration` before copying accepted questions to `Quiz`.
- Keep `Attempt` answer snapshots so results still work even if the quiz is edited later.
- Consider deleting `SourceDocument.extractedText` after publishing if the uploaded content is sensitive.
- Use background jobs for large file parsing and AI generation if processing becomes slow.
