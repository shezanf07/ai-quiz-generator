# AI-Powered Quiz Generator

## Database Module Documentation

| Field | Details |
| --- | --- |
| Prepared By | Shezan Fayaz |
| Institution | Islamia College of Science and Commerce |
| Project | AI-Powered Quiz Generator - BCA Final Year |
| Document | Database Design Aligned With Frontend Features |
| Stack | MongoDB, Mongoose |
| Date | April 2026 |
| Version | 1.1 |

---

## 1. Database Overview

The database stores all information required by the Quizly frontend: creator accounts, uploaded study material, generated quizzes, quiz settings, share links, student attempts, submitted answers, results and statistics.

MongoDB is suitable for this project because quiz questions and answer options are naturally represented as nested document structures. A quiz can store its questions as embedded subdocuments, which makes reading a published quiz fast and simple.

Database name:

```text
quiz_generator
```

---

## 2. Collections

| Collection | Purpose |
| --- | --- |
| `users` | Creator account and authentication data |
| `source_documents` | Uploaded files or pasted text, including extracted/parsed text |
| `ai_generations` | AI generation request and generated question output |
| `quizzes` | Quiz metadata, settings, questions, share link and cached analytics |
| `attempts` | Student attempts, submitted answers and result data |

Optional future collections:

| Collection | Purpose |
| --- | --- |
| `templates` | Stores theme definitions if themes become dynamic |
| `ai_generations` | Stores AI prompt and generated response history |

---

## 3. users Collection

The `users` collection supports login, registration, dashboard ownership and protected creator routes.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | User id |
| `name` | String | Creator full name |
| `email` | String | Unique login email |
| `passwordHash` | String | Hashed password for email login |
| `authProvider` | String | `email` or `google` |
| `googleId` | String | Google account id for OAuth users |
| `role` | String | `creator` or `admin` |
| `avatarUrl` | String | Profile image URL |
| `settings.theme` | String | Preferred theme, `light` or `dark` |
| `lastLoginAt` | Date | Last login timestamp |
| `createdAt` | Date | Created timestamp |
| `updatedAt` | Date | Updated timestamp |

Indexes:

| Index | Purpose |
| --- | --- |
| `email` unique | Prevent duplicate accounts and speed up login |
| `googleId` sparse | Find Google OAuth users |

---

## 4. source_documents Collection

The `source_documents` collection stores the source material submitted from the upload page. This is where parsed text from uploaded files is stored before it is sent to AI.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Upload id |
| `creatorId` | ObjectId | Owner user id |
| `sourceType` | String | `file` or `text` |
| `originalName` | String | Original file name |
| `mimeType` | String | Uploaded file MIME type |
| `extension` | String | `pdf`, `docx`, `txt` or empty for pasted text |
| `sizeBytes` | Number | File size in bytes |
| `storageProvider` | String | `local`, `s3`, `cloudinary` or `none` |
| `storageKey` | String | Stored file key/path if original file is kept |
| `fileUrl` | String | Optional URL to stored file |
| `rawText` | String | Raw extracted text before cleaning |
| `extractedText` | String | Parsed text extracted from file or pasted by user |
| `cleanedText` | String | Cleaned text sent to AI |
| `wordCount` | Number | Number of words in extracted/cleaned text |
| `characterCount` | Number | Character count for limits |
| `checksum` | String | Optional duplicate-file detection |
| `status` | String | `uploaded`, `parsing`, `ready`, `failed` |
| `parseError` | String | Extraction error if failed |
| `parsedAt` | Date | When parsing completed |
| `createdAt` | Date | Created timestamp |
| `updatedAt` | Date | Updated timestamp |

Indexes:

| Index | Purpose |
| --- | --- |
| `creatorId, createdAt` | Find recent source documents for a creator |
| `checksum` | Detect duplicate uploads |
| `status` | Find parsing/failed documents |

Upload-to-AI flow:

```text
File upload
-> extract text from PDF/DOCX/TXT
-> save parsed text in source_documents.extractedText
-> save cleaned text in source_documents.cleanedText
-> AI generation reads cleanedText or extractedText
```

---

## 5. ai_generations Collection

The `ai_generations` collection stores generated question output from the AI service before or while it is copied into a quiz.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | AI generation id |
| `creatorId` | ObjectId | Owner user id |
| `sourceDocumentId` | ObjectId | Source document used for generation |
| `quizId` | ObjectId | Quiz created from this generation |
| `provider` | String | AI provider name |
| `model` | String | AI model name |
| `promptVersion` | String | Internal prompt version |
| `request.questionCount` | Number | Number of questions requested |
| `request.questionType` | String | `mcq` or `mixed` |
| `request.difficulty` | String | `easy`, `medium`, `hard` |
| `generatedQuestions` | Array | AI-generated question objects |
| `status` | String | `pending`, `success`, `failed` |
| `errorMessage` | String | AI failure message |
| `tokenUsage` | Object | Input/output/total token usage |
| `generatedAt` | Date | Generation timestamp |
| `createdAt` | Date | Created timestamp |
| `updatedAt` | Date | Updated timestamp |

Indexes:

| Index | Purpose |
| --- | --- |
| `creatorId, createdAt` | Creator generation history |
| `sourceDocumentId` | Find generations for uploaded source |
| `quizId` | Link generation to quiz |
| `status` | Find failed/pending generations |

---

## 6. quizzes Collection

The `quizzes` collection is the main collection for dashboard, editor, config, share and public quiz pages.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Quiz id |
| `creatorId` | ObjectId | Owner user id |
| `sourceDocumentId` | ObjectId | Source document id |
| `aiGenerationId` | ObjectId | AI generation id |
| `title` | String | Quiz title from config page |
| `description` | String | Optional quiz description |
| `type` | String | Quiz type, such as `Multiple Choice` or `Mixed` |
| `status` | String | `draft`, `published`, `archived` |
| `theme` | String | `light`, `dark-academic`, `amber-glow` |
| `questions` | Array | Embedded question list |
| `settings` | Object | Timer, duration, passing score and behavior options |
| `share` | Object | Public share link data |
| `analytics` | Object | Cached summary for dashboard and stats |
| `publishedAt` | Date | Publish timestamp |
| `expiresAt` | Date | Link expiry date |
| `createdAt` | Date | Created timestamp |
| `updatedAt` | Date | Updated timestamp |

### Question Object

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Question id |
| `number` | Number | Question number/order |
| `questionText` | String | Main question text |
| `type` | String | `mcq`, `true_false`, `fill_blank` |
| `options` | Array | Answer options for MCQ |
| `correctOptionId` | String | Correct option id |
| `explanation` | String | Explanation shown after submission |
| `difficulty` | String | `easy`, `medium`, `hard` |
| `displayOrder` | Number | Sort order in quiz |

### Option Object

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | `A`, `B`, `C`, `D` |
| `text` | String | Option text |
| `isCorrect` | Boolean | Whether this option is correct |

### Settings Object

| Field | Type | Description |
| --- | --- | --- |
| `timerEnabled` | Boolean | Whether timer is active |
| `durationMinutes` | Number | Total quiz duration |
| `passingScore` | Number | Minimum passing percentage |
| `allowRetake` | Boolean | Whether student can retake |
| `shuffleQuestions` | Boolean | Randomize question order |
| `shuffleOptions` | Boolean | Randomize option order |
| `showCorrectAnswers` | Boolean | Show correct answers on result page |

### Share Object

| Field | Type | Description |
| --- | --- | --- |
| `shareId` | String | Public quiz identifier |
| `shareUrl` | String | Full share URL |
| `expiryOption` | String | `24-hours`, `7-days`, `30-days`, `never` |
| `qrValue` | String | Value encoded in QR code |

### Analytics Object

| Field | Type | Description |
| --- | --- | --- |
| `totalSubmissions` | Number | Total submitted attempts |
| `passRate` | Number | Percentage of attempts passed |
| `averageScore` | Number | Average percentage score |

Indexes:

| Index | Purpose |
| --- | --- |
| `creatorId, updatedAt` | Dashboard quiz listing |
| `share.shareId` unique sparse | Public quiz lookup |
| `status` | Filter draft/published quizzes |

---

## 7. attempts Collection

The `attempts` collection stores student quiz sessions and results.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Attempt id |
| `quizId` | ObjectId | Quiz id |
| `shareId` | String | Public share id used by student |
| `participant.name` | String | Student name |
| `participant.email` | String | Optional student email |
| `answers` | Array | Submitted answer list |
| `score` | Number | Correct answer count |
| `totalQuestions` | Number | Total questions in quiz |
| `percentage` | Number | Score percentage |
| `passed` | Boolean | Pass/fail result |
| `timeTakenSeconds` | Number | Total time taken |
| `status` | String | `in_progress`, `submitted`, `expired` |
| `startedAt` | Date | Attempt start time |
| `submittedAt` | Date | Submission time |
| `createdAt` | Date | Created timestamp |
| `updatedAt` | Date | Updated timestamp |

### Answer Object

| Field | Type | Description |
| --- | --- | --- |
| `questionId` | ObjectId | Question answered |
| `questionText` | String | Snapshot of question text |
| `selectedOptionId` | String | Chosen option id |
| `selectedOptionText` | String | Chosen option text |
| `correctOptionId` | String | Correct option id |
| `correctOptionText` | String | Correct option text |
| `isCorrect` | Boolean | Whether selected answer is correct |
| `timeTakenSeconds` | Number | Time spent on question |

Indexes:

| Index | Purpose |
| --- | --- |
| `quizId, submittedAt` | Recent submissions table |
| `shareId` | Find attempts by public quiz |
| `status` | Manage unfinished attempts |

---

## 8. Data Mapping by Frontend Feature

| Frontend feature | Collection fields |
| --- | --- |
| Register | `users.name`, `users.email`, `users.passwordHash` |
| Login | `users.email`, `users.passwordHash` |
| Dashboard cards | `quizzes.title`, `quizzes.type`, `quizzes.questions.length`, `quizzes.updatedAt` |
| Upload page | `source_documents.sourceType`, `source_documents.originalName`, `source_documents.extractedText`, `source_documents.cleanedText`, `source_documents.status` |
| AI generation | `source_documents.cleanedText`, `ai_generations.generatedQuestions` |
| Quiz editor | `quizzes.questions.questionText`, `quizzes.questions.options`, `correctOptionId` |
| Config page | `quizzes.title`, `quizzes.theme`, `quizzes.settings` |
| Share page | `quizzes.share.shareUrl`, `quizzes.share.qrValue`, `quizzes.expiresAt` |
| Student quiz | `quizzes.title`, `quizzes.questions`, `quizzes.settings` |
| Result page | `attempts.score`, `attempts.percentage`, `attempts.answers`, `attempts.passed` |
| Stats page | `attempts`, `quizzes.analytics` |

---

## 9. Validation Rules

### User

- Email must be unique.
- Password must be hashed before saving.
- Password hash must never be returned to frontend.

### Source Document

- Source must be PDF, DOCX, TXT or plain text.
- Extracted text must not be empty.
- Upload size should be limited.
- Original file should be stored outside MongoDB in production.
- Parsed text should be stored in `extractedText`.
- AI should read `cleanedText` when available.

### Quiz

- Title is required before publishing.
- Quiz must have at least one question before publishing.
- MCQ questions must have four options.
- MCQ questions must have exactly one correct option.
- Passing score must be between 0 and 100.
- Duration must be greater than zero when timer is enabled.

### Attempt

- Attempt must belong to a published quiz.
- Score must be calculated on the backend.
- Correct answers should be shown only after submission.

---

## 10. Summary

The database is designed around the current frontend features. Uploaded or pasted content is stored as a source document, parsed text is stored in `source_documents.extractedText`, AI output is stored in `ai_generations`, and the final creator-approved quiz is stored in `quizzes`. Dashboard cards are fetched from `quizzes`, while results and statistics are calculated from `attempts`.
