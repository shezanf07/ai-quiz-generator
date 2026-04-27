# AI-Powered Quiz Generator

## Backend Module Documentation

| Field | Details |
| --- | --- |
| Prepared By | Shezan Fayaz |
| Institution | Islamia College of Science and Commerce |
| Project | AI-Powered Quiz Generator - BCA Final Year |
| Document | Backend API Design Aligned With Frontend |
| Stack | Node.js, Express.js, MongoDB, Mongoose, JWT |
| Date | April 2026 |
| Version | 1.1 |

---

## 1. Backend Overview

The backend provides the REST API for the Quizly frontend. It handles creator authentication, uploaded study material, AI-based quiz generation, quiz editing, publishing, public quiz access, student attempts, results and creator statistics.

The backend follows a controller-service-model structure:

```text
Request -> Route -> Middleware -> Controller -> Service -> Mongoose Model -> MongoDB
```

---

## 2. Backend Folder Structure

```text
server/
  config/
    db.js
  controllers/
    authController.js
    uploadController.js
    quizController.js
    aiController.js
    attemptController.js
    statsController.js
  middleware/
    authMiddleware.js
    errorMiddleware.js
    uploadMiddleware.js
    validateMiddleware.js
  models/
    User.js
    SourceDocument.js
    AiGeneration.js
    Quiz.js
    Attempt.js
  routes/
    authRoutes.js
    uploadRoutes.js
    quizRoutes.js
    aiRoutes.js
    attemptRoutes.js
    statsRoutes.js
  services/
    authService.js
    fileTextService.js
    aiQuestionService.js
    quizService.js
    scoringService.js
    statsService.js
  app.js
  server.js
```

---

## 3. Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster-url/quiz_generator
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_ai_provider_key
```

---

## 4. API Route Summary

| Module | Base Path | Purpose |
| --- | --- | --- |
| Auth | `/api/auth` | Login, register and current user |
| Source Documents | `/api/source` | File/text upload, parsing and extracted text storage |
| AI | `/api/ai` | Generate and regenerate questions |
| Quizzes | `/api/quizzes` | Creator quiz CRUD and publishing |
| Public Quiz | `/api/public/quizzes` | Student quiz access |
| Attempts | `/api/public/attempts` | Student answers and results |
| Stats | `/api/quizzes/:id/stats` | Creator analytics |

---

## 5. Authentication Module

The authentication module supports creator accounts.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a creator account |
| `POST` | `/api/auth/login` | Login creator |
| `GET` | `/api/auth/me` | Return logged-in user |
| `POST` | `/api/auth/google` | Google OAuth login/register |

### Register Request

```json
{
  "name": "Alexander Scribe",
  "email": "scholar@university.edu",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login Request

```json
{
  "email": "scholar@university.edu",
  "password": "password123"
}
```

### Auth Response

```json
{
  "user": {
    "id": "user_id",
    "name": "Alexander Scribe",
    "email": "scholar@university.edu",
    "role": "creator"
  },
  "token": "jwt_token"
}
```

---

## 6. Source Document Module

The source document module supports the upload page. It accepts PDF, DOCX, TXT or pasted text, extracts text from files, and stores parsed text before AI generation.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/source/file` | Upload PDF, DOCX or TXT |
| `POST` | `/api/source/text` | Submit pasted plain text |
| `GET` | `/api/source/:id` | Get source document and extracted text metadata |

### File Upload Response

```json
{
  "sourceDocumentId": "source_document_id",
  "sourceType": "file",
  "originalName": "lecture_notes_chapter_4.pdf",
  "mimeType": "application/pdf",
  "extension": "pdf",
  "sizeBytes": 2400000,
  "extractedText": "Extracted document text...",
  "cleanedText": "Cleaned document text...",
  "wordCount": 850,
  "status": "ready"
}
```

### Pasted Text Request

```json
{
  "text": "Pasted study material..."
}
```

Supported source types:

- PDF
- DOCX
- TXT
- Plain text

The parsed text is stored in:

```text
source_documents.extractedText
source_documents.cleanedText
```

---

## 7. AI Question Generation Module

This module converts uploaded or pasted study material into quiz questions.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/ai/generate-quiz` | Generate questions from source text |
| `POST` | `/api/ai/regenerate-question` | Regenerate a single question |

### Generate Quiz Request

```json
{
  "sourceDocumentId": "source_document_id",
  "questionCount": 10,
  "questionType": "mcq",
  "difficulty": "medium"
}
```

### Generate Quiz Response

```json
{
  "aiGenerationId": "ai_generation_id",
  "questions": [
    {
      "questionText": "What is the central concept of Hegel's dialectic?",
      "type": "mcq",
      "options": [
        { "id": "A", "text": "Thesis, antithesis and synthesis", "isCorrect": true },
        { "id": "B", "text": "The categorical imperative", "isCorrect": false },
        { "id": "C", "text": "Logical positivism", "isCorrect": false },
        { "id": "D", "text": "Tabula rasa", "isCorrect": false }
      ],
      "correctOptionId": "A",
      "explanation": "Hegel's dialectic is commonly explained using this pattern.",
      "difficulty": "medium"
    }
  ]
}
```

Rules:

- MCQ questions must contain four options.
- Each MCQ must have exactly one correct answer.
- AI output must be validated before being saved.
- Questions should be editable by the creator before publishing.

---

## 8. Quiz Management Module

This module supports dashboard, editor, config and share pages.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/quizzes` | Get all quizzes created by logged-in creator |
| `POST` | `/api/quizzes` | Create a draft quiz |
| `GET` | `/api/quizzes/:id` | Get one creator quiz |
| `PUT` | `/api/quizzes/:id` | Update quiz details, settings and questions |
| `POST` | `/api/quizzes/:id/publish` | Publish quiz and create public link |
| `DELETE` | `/api/quizzes/:id` | Archive or delete a quiz |

### Create Draft Quiz Request

```json
{
  "sourceDocumentId": "source_document_id",
  "aiGenerationId": "ai_generation_id",
  "title": "Untitled Quiz",
  "questions": []
}
```

### Update Quiz Request

```json
{
  "title": "Introduction to Philosophy",
  "theme": "dark-academic",
  "settings": {
    "timerEnabled": true,
    "durationMinutes": 15,
    "passingScore": 70,
    "allowRetake": true,
    "shuffleQuestions": false,
    "shuffleOptions": false
  },
  "questions": []
}
```

### Publish Response

```json
{
  "quizId": "quiz_id",
  "shareId": "scholar-123",
  "shareUrl": "http://localhost:5173/quiz/scholar-123",
  "expiresAt": "2026-05-27T00:00:00.000Z"
}
```

---

## 9. Public Quiz Module

This module supports the student quiz page.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/public/quizzes/:shareId` | Get published quiz for student |

### Public Quiz Response

```json
{
  "id": "quiz_id",
  "title": "Introduction to Philosophy",
  "theme": "dark-academic",
  "settings": {
    "timerEnabled": true,
    "durationMinutes": 15,
    "passingScore": 70
  },
  "questions": [
    {
      "id": "question_id",
      "questionText": "In Plato's Allegory of the Cave, what does the sun represent?",
      "type": "mcq",
      "options": [
        { "id": "A", "text": "The Form of the Good" },
        { "id": "B", "text": "The physical light of the visible world" },
        { "id": "C", "text": "The source of human shadow perceptions" },
        { "id": "D", "text": "The philosopher's return to the cave" }
      ]
    }
  ]
}
```

Important: the public quiz response must not expose `isCorrect`, `correctOptionId` or explanations before submission.

---

## 10. Attempt and Result Module

This module supports quiz submissions and the result page.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/public/quizzes/:shareId/attempts` | Start a quiz attempt |
| `POST` | `/api/public/attempts/:attemptId/answers` | Save an answer |
| `POST` | `/api/public/attempts/:attemptId/submit` | Submit quiz and calculate result |
| `GET` | `/api/public/attempts/:attemptId/result` | Get final result |

### Save Answer Request

```json
{
  "questionId": "question_id",
  "selectedOptionId": "A",
  "timeTakenSeconds": 18
}
```

### Result Response

```json
{
  "attemptId": "attempt_id",
  "score": 10,
  "totalQuestions": 12,
  "percentage": 82,
  "passed": true,
  "review": [
    {
      "questionId": "question_id",
      "questionText": "Question text",
      "selectedOption": "Iron Gall Ink",
      "correctOption": "Iron Gall Ink",
      "isCorrect": true
    }
  ]
}
```

---

## 11. Stats Module

This module supports the creator stats page.

### Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/quizzes/:id/stats` | Get summary stats |
| `GET` | `/api/quizzes/:id/attempts` | Get recent submissions |

### Stats Response

```json
{
  "quizId": "quiz_id",
  "title": "Modern Philosophy 101",
  "totalSubmissions": 124,
  "passRate": 78,
  "averageScore": 84,
  "recentSubmissions": [
    {
      "studentName": "Alice Johnson",
      "score": 92,
      "timeTaken": "12m 45s",
      "status": "Passed",
      "submittedAt": "2026-04-27T10:23:00.000Z"
    }
  ]
}
```

---

## 12. Middleware

| Middleware | Description |
| --- | --- |
| `authMiddleware` | Verifies JWT and protects creator routes |
| `uploadMiddleware` | Handles PDF, DOCX and TXT uploads |
| `validateMiddleware` | Validates request body and params |
| `errorMiddleware` | Sends consistent error responses |

---

## 13. Error Response Format

```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Email is required"
  }
}
```

---

## 14. Security Rules

- Passwords must be hashed with bcrypt.
- JWT must be required for dashboard and creator workflow APIs.
- Uploaded files must be limited by type and size.
- Correct answers must not be sent to public quiz routes before submission.
- Quiz stats must only be visible to the quiz creator.
- Environment secrets must remain in `.env`.
- AI responses must be validated before saving.

---

## 15. Summary

The backend API is designed directly from the frontend workflow. Each frontend page has a matching backend responsibility, which keeps implementation clear and allows the current UI to be connected step by step.
