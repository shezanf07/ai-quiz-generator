# AI-Powered Quiz Generator

## Database Documentation

| Field | Details |
| --- | --- |
| Project | AI Quiz Generator / QuizlyAI |
| Database | MongoDB |
| ODM | Mongoose |
| Model path | `server/models/` |
| Last checked | May 19, 2026 |

---

## 1. Database Overview

The database stores users, uploaded or pasted source text, AI generation history, quizzes, share links, student attempts, answers, scores and cached analytics.

The project uses embedded quiz questions inside the `Quiz` document. Student attempts store a snapshot of submitted answers and grading result.

Mongoose model files:

| Model | File |
| --- | --- |
| `User` | `server/models/User.model.js` |
| `SourceDocument` | `server/models/SourceDocument.model.js` |
| `AiGeneration` | `server/models/AiGeneration.model.js` |
| `Quiz` | `server/models/Quiz.model.js` |
| `Attempt` | `server/models/Attempt.model.js` |

---

## 2. Collections

Mongoose will use default plural collection names unless changed manually. The current models do not set custom collection names.

| Model | Expected collection name | Purpose |
| --- | --- | --- |
| `User` | `users` | Creator accounts |
| `SourceDocument` | `sourcedocuments` | Uploaded files or pasted text |
| `AiGeneration` | `aigenerations` | AI generation request and output |
| `Quiz` | `quizzes` | Draft and published quizzes |
| `Attempt` | `attempts` | Student submissions and results |

---

## 3. User Model

File: `server/models/User.model.js`

Stores creator account details.

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `name` | String | required, trim, max 50 | Creator name |
| `email` | String | required, unique, lowercase, trim, email pattern | Login email |
| `passwordHash` | String | required only for email auth | Hashed password |
| `authProvider` | String | `email` or `google`, default `email` | Login provider |
| `googleId` | String | unique, sparse | Google user id |
| `role` | String | `creator` or `admin`, default `creator` | Access level |
| `lastLoginAt` | Date | optional | Last login date |
| `createdAt` | Date | timestamps | Created date |
| `updatedAt` | Date | timestamps | Updated date |

Main use:

- Register creates a user with `authProvider: email`.
- Login checks email user password with bcrypt.
- Google login creates or links a user with `authProvider: google`.
- `role: admin` bypasses the one-quiz free limit.

---

## 4. SourceDocument Model

File: `server/models/SourceDocument.model.js`

Stores the source material used to generate questions.

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `creatorId` | ObjectId ref `User` | required | Owner of the document |
| `sourceType` | String | `file` or `text`, required | Source kind |
| `originalName` | String | default empty, trim | Uploaded file name |
| `mimeType` | String | default empty, MIME pattern | Uploaded file MIME type |
| `extension` | String | `pdf`, `docx`, `txt`, or empty | File extension |
| `sizeBytes` | Number | default 0 | File or text size |
| `storageProvider` | String | `local`, `s3`, `cloudinary`, `none`; default `none` | Storage type |
| `storageKey` | String | default empty | Stored file key if used |
| `fileUrl` | String | default empty | Stored file URL if used |
| `extractedText` | String | default empty | Raw extracted or pasted text |
| `cleanedText` | String | default empty | Cleaned text sent to AI |
| `wordCount` | Number | default 0 | Word count |
| `characterCount` | Number | default 0 | Character count |
| `checksum` | String | default empty | Optional duplicate check |
| `status` | String | `uploaded`, `parsing`, `ready`, `failed`; default `uploaded` | Processing state |
| `parseError` | String | default empty | Parse error message |
| `parsedAt` | Date | optional | Parse completion date |
| `createdAt` | Date | timestamps | Created date |
| `updatedAt` | Date | timestamps | Updated date |

Indexes:

| Index | Purpose |
| --- | --- |
| `{ creatorId: 1, createdAt: -1 }` | Recent documents for a creator |
| `{ checksum: 1 }` | Duplicate lookup if checksum is used later |
| `{ status: 1 }` | Filter by processing status |

Actual save behavior:

- Files are not stored in MongoDB or disk by this service.
- Text is extracted in memory from PDF, DOCX or TXT.
- Pasted text is stored as `sourceType: text`.
- `cleanedText` replaces repeated whitespace and trims text.
- Documents with fewer than 10 words are rejected.
- Saved documents are marked `status: ready`.

---

## 5. AiGeneration Model

File: `server/models/AiGeneration.model.js`

Stores the AI request metadata and generated questions.

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `creatorId` | ObjectId ref `User` | required | Owner user |
| `sourceDocumentId` | ObjectId ref `SourceDocument` | optional | Source document used |
| `quizId` | ObjectId ref `Quiz` | optional | Quiz created from generation |
| `provider` | String | `gemini`, `gpt-4`, `deepseek`; default `gemini` | AI provider |
| `model` | String | default empty | AI model name |
| `promptVersion` | String | default `v1` | Prompt version |
| `request.questionCount` | Number | default 10 | Requested count |
| `request.difficulty` | String | `easy`, `medium`, `hard`; default `medium` | Requested difficulty |
| `generatedQuestions` | Array | default empty | Generated question objects |
| `status` | String | `pending`, `completed`, `failed`; default `pending` | Generation status |
| `errorMessage` | String | default empty | Failure reason |
| `tokenUsage.inputTokens` | Number | default 0 | Input token count if tracked |
| `tokenUsage.outputTokens` | Number | default 0 | Output token count if tracked |
| `tokenUsage.totalTokens` | Number | default 0 | Total token count if tracked |
| `createdAt` | Date | timestamps | Created date |
| `updatedAt` | Date | timestamps | Updated date |

Generated question object:

| Field | Type | Rules |
| --- | --- | --- |
| `question` | String | required |
| `options` | Array | option objects |
| `correctOptionId` | String | `A`, `B`, `C`, or `D`, required |
| `explanation` | String | default empty |
| `difficulty` | String | `easy`, `medium`, `hard`, default `medium` |

Generated option object:

| Field | Type | Rules |
| --- | --- | --- |
| `id` | String | `A`, `B`, `C`, or `D`, required |
| `text` | String | required |

Indexes:

| Index | Purpose |
| --- | --- |
| `{ creatorId: 1, createdAt: -1 }` | Creator generation history |
| `{ sourceDocumentId: 1 }` | Find generations by source |
| `{ quizId: 1 }` | Link generation to quiz |
| `{ status: 1 }` | Find pending or failed generations |

---

## 6. Quiz Model

File: `server/models/Quiz.model.js`

Stores the final editable quiz used by dashboard, editor, config, share, public quiz and stats pages.

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `creatorId` | ObjectId ref `User` | required | Owner user |
| `sourceDocumentId` | ObjectId ref `SourceDocument` | optional | Source document used |
| `aiGenerationId` | ObjectId ref `AiGeneration` | optional | AI generation used |
| `title` | String | required, trim, max 200 | Quiz title |
| `status` | String | `draft`, `published`, `archived`; default `draft` | Quiz state |
| `theme` | String | `light`, `dark-academic`, `amber-glow`; default `dark-academic` | Selected visual theme |
| `questions` | Array | question subdocuments | Quiz questions |
| `settings` | Object | defaults listed below | Quiz rules |
| `share` | Object | share fields | Public link data |
| `analytics` | Object | cached counters | Dashboard and stats data |
| `publishedAt` | Date | optional | Publish date |
| `expiresAt` | Date | optional | Share link expiry |
| `createdAt` | Date | timestamps | Created date |
| `updatedAt` | Date | timestamps | Updated date |

Question subdocument:

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `number` | Number | required | Question number |
| `questionText` | String | required, trim | Question text shown to user |
| `options` | Array | option subdocuments | Answer choices |
| `correctOptionId` | String | `A`, `B`, `C`, or `D`, required | Correct answer |
| `explanation` | String | default empty | Explanation after grading if used |
| `difficulty` | String | `easy`, `medium`, `hard`; default `medium` | Difficulty level |
| `displayOrder` | Number | required | Sort order |
| `createdAt` | Date | subdocument timestamps | Created date |
| `updatedAt` | Date | subdocument timestamps | Updated date |

Option subdocument:

| Field | Type | Rules |
| --- | --- | --- |
| `id` | String | `A`, `B`, `C`, or `D`, required |
| `text` | String | required, trim |

Settings defaults:

| Field | Type | Default | Rules |
| --- | --- | --- | --- |
| `timerEnabled` | Boolean | `true` | none |
| `durationMinutes` | Number | `15` | min 1 |
| `passingScore` | Number | `70` | min 0, max 100 |
| `allowRetake` | Boolean | `false` | none |
| `shuffleQuestions` | Boolean | `false` | none |
| `shuffleOptions` | Boolean | `false` | none |
| `showCorrectAnswers` | Boolean | `false` | none |

Share object:

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `shareId` | String | unique, sparse | Public share id |
| `shareUrl` | String | default empty | Full public URL |
| `expiryOption` | String | `24-hours`, `7-days`, `30-days`, `never`; default `24-hours` | Chosen expiry |
| `qrValue` | String | default empty | QR code value |

Analytics object:

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `totalSubmissions` | Number | 0 | Submitted attempts count |
| `passRate` | Number | 0 | Average pass percent |
| `averageScore` | Number | 0 | Average percentage score |

Indexes:

| Index | Purpose |
| --- | --- |
| `{ creatorId: 1, updatedAt: -1 }` | Dashboard list |
| `{ sourceDocumentId: 1 }` | Find quiz by source |
| `{ aiGenerationId: 1 }` | Find quiz by AI generation |
| `{ status: 1 }` | Filter draft/published/archived |
| `share.shareId` unique sparse | Created by field option for public lookup |

---

## 7. Attempt Model

File: `server/models/Attempt.model.js`

Stores a submitted quiz attempt and grading result.

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `quizId` | ObjectId ref `Quiz` | required | Quiz being taken |
| `shareId` | String | required | Public share id used |
| `participant.name` | String | default `Anonymous` | Student name |
| `participant.email` | String | default empty | Optional student email |
| `answers` | Array | answer subdocuments | Graded answers |
| `score` | Number | default 0 | Correct answer count |
| `totalQuestions` | Number | default 0 | Total quiz questions |
| `percentage` | Number | default 0 | Score percentage |
| `passed` | Boolean | default false | Pass/fail result |
| `timeTakenSeconds` | Number | default 0 | Total attempt time |
| `status` | String | `in_progress`, `submitted`, `expired`; default `in_progress` | Attempt state |
| `startedAt` | Date | default `Date.now` | Start time |
| `submittedAt` | Date | optional | Submit time |
| `createdAt` | Date | timestamps | Created date |
| `updatedAt` | Date | timestamps | Updated date |

Answer subdocument:

| Field | Type | Rules / Default | Purpose |
| --- | --- | --- | --- |
| `questionId` | ObjectId | required | Question answered |
| `questionText` | String | required | Snapshot of question text |
| `selectedOptionId` | String | `A`, `B`, `C`, or `D` | Student choice |
| `selectedOptionText` | String | default empty | Student choice text |
| `correctOptionId` | String | `A`, `B`, `C`, or `D` | Correct option id |
| `isCorrect` | Boolean | required, default false | Whether answer is correct |
| `timeTakenSeconds` | Number | default 0 | Time for this question |

Important note: `attemptService.js` also builds `correctOptionText`, but `Attempt.model.js` does not define that field. With normal strict Mongoose behavior, that field is not saved in the attempt document.

Indexes:

| Index | Purpose |
| --- | --- |
| `{ quizId: 1, submittedAt: -1 }` | Recent submissions |
| `{ shareId: 1 }` | Attempts by public share id |
| `{ status: 1 }` | Filter attempts by state |

---

## 8. Data Flow

### Upload to AI

```text
Creator uploads file or text
-> SourceDocument is created with extractedText and cleanedText
-> AI service reads cleanedText first, then extractedText
-> AiGeneration is created with status pending
-> Gemini returns JSON questions
-> AiGeneration is updated to completed
```

### AI to Quiz

```text
Frontend receives generated questions
-> Frontend creates Quiz draft
-> Quiz service maps question to questionText
-> number and displayOrder are assigned
-> Quiz is saved with status draft
```

### Publish

```text
Creator updates title/settings/questions
-> Creator publishes quiz
-> Quiz gets status published
-> shareId, shareUrl and qrValue are saved
-> expiresAt is set unless expiry is never
```

### Student Attempt

```text
Student opens share link
-> Backend finds published quiz by share.shareId
-> Backend removes correct answers from public response
-> Student submits answers
-> Backend compares selectedOptionId with correctOptionId
-> Attempt is saved
-> Quiz analytics are updated
```

---

## 9. Frontend Feature Mapping

| Frontend feature | Database model and fields |
| --- | --- |
| Login/Register | `User.name`, `User.email`, `User.passwordHash`, `User.authProvider` |
| Dashboard cards | `Quiz.title`, `Quiz.type`, `Quiz.status`, `Quiz.questions`, `Quiz.updatedAt`, `Quiz.analytics` |
| Upload file/text | `SourceDocument.sourceType`, `originalName`, `mimeType`, `extractedText`, `cleanedText`, `wordCount` |
| AI generation | `AiGeneration.request`, `AiGeneration.generatedQuestions`, `AiGeneration.status` |
| Quiz editor | `Quiz.questions.questionText`, `Quiz.questions.options`, `Quiz.questions.correctOptionId` |
| Quiz config | `Quiz.title`, `Quiz.theme`, `Quiz.settings` |
| Share page | `Quiz.share.shareUrl`, `Quiz.share.qrValue`, `Quiz.expiresAt` |
| Public quiz | `Quiz.title`, `Quiz.theme`, `Quiz.settings`, safe `Quiz.questions` |
| Submit result | `Attempt.score`, `Attempt.percentage`, `Attempt.passed`, `Attempt.answers` |
| Stats page | `Quiz.analytics`, recent `Attempt` documents |

---

## 10. Current Database Notes

- The app does not store original uploaded files. It stores extracted text only.
- `SourceDocument.storageProvider` is set to `none` in the current service.
- `Quiz.type` is selected in dashboard queries, but `Quiz.model.js` does not define a `type` field.
- `Attempt.answer.correctOptionText` is used by the service response, but it is missing from the schema.
- There is no custom collection name for `SourceDocument` and `AiGeneration`, so MongoDB names may be `sourcedocuments` and `aigenerations`, not snake_case names.
- `Quiz.analytics` is cached and updated after each submitted attempt.
- Correct answers are stored in `Quiz.questions.correctOptionId`, but they are not sent by the public quiz endpoint before submission.
