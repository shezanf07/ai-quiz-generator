# AI-Powered Quiz Generator

## Backend Documentation

| Field | Details |
| --- | --- |
| Project | AI Quiz Generator / QuizlyAI |
| Backend path | `server/` |
| Runtime | Node.js with ES modules |
| Framework | Express 5 |
| Database | MongoDB with Mongoose |
| AI provider | Google Gemini through `@google/generative-ai` |
| Last checked | May 19, 2026 |

---

## 1. Backend Overview

The backend provides the REST API for authentication, document upload, AI question generation, quiz management, public quiz taking, attempt grading and analytics.

The backend uses this structure:

```text
Request -> Route -> Middleware -> Controller -> Service -> Mongoose Model -> MongoDB
```

Main files:

| File | Purpose |
| --- | --- |
| `server.js` | Loads env, connects MongoDB and starts the server |
| `app.js` | Builds the Express app, CORS, JSON parser and route mounting |
| `config/db.js` | MongoDB connection helper |

---

## 2. Actual Folder Structure

```text
server/
  config/
    db.js
  controllers/
    aiController.js
    attemptController.js
    authController.js
    quizController.js
    uploadController.js
  middleware/
    auth.js
    upload.js
  models/
    AiGeneration.model.js
    Attempt.model.js
    Quiz.model.js
    SourceDocument.model.js
    User.model.js
  routes/
    aiRoutes.js
    attemptRoutes.js
    authRoutes.js
    quizRoutes.js
    uploadRoutes.js
  services/
    aiService.js
    attemptService.js
    authService.js
    documentService.js
    quizService.js
  app.js
  server.js
```

There is no separate `statsController.js`, `statsRoutes.js`, `errorMiddleware.js` or `validateMiddleware.js` in the current project. Stats are handled through the attempt module.

---

## 3. Environment Variables

Actual variables used in code:

| Variable | Used in | Purpose |
| --- | --- | --- |
| `PORT` | `server.js` | Server port, default is `5000` |
| `MONGO_URI` | `config/db.js` | MongoDB connection string |
| `JWT_SECRET` | `authService.js`, `middleware/auth.js` | JWT signing and verification |
| `JWT_EXPIRES_IN` | `authService.js` | Token expiry, default is `1d` |
| `CLIENT_URL` | `app.js` | Allowed CORS frontend origin |
| `FRONTEND_URL` | `quizController.js` | Base URL for published share links |
| `GEMINI_API_KEY` | `aiService.js` | Google Gemini API key |
| `VITE_GOOGLE_CLIENT_ID` | `authController.js` | Sent to frontend for Google Sign-In |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster/quiz_generator
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 4. App Setup

File: `app.js`

- Allows CORS from `http://localhost:5173` and `process.env.CLIENT_URL`.
- Allows requests with no origin, useful for tools like Postman.
- Uses `express.json()` for JSON request bodies.
- Mounts routes under `/api/auth`, `/api/upload`, `/api/ai`, `/api/quizzes` and `/api/attempts`.
- `GET /` returns a simple server running message.

---

## 5. Actual API Routes

### Auth Routes

Base path: `/api/auth`

| Method | Path | Protected | Controller | Purpose |
| --- | --- | --- | --- | --- |
| `POST` | `/register` | No | `register` | Create user with name, email and password |
| `POST` | `/login` | No | `login` | Login with email and password |
| `POST` | `/google` | No | `googleLogin` | Login or create user using Google ID token |
| `GET` | `/config` | No | `getConfig` | Return Google client id to frontend |

Register body:

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123"
}
```

Login body:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

Auth response:

```json
{
  "_id": "user_id",
  "name": "Student Name",
  "email": "student@example.com",
  "role": "creator",
  "token": "jwt_token"
}
```

---

### Upload Routes

Base path: `/api/upload`

| Method | Path | Protected | Controller | Purpose |
| --- | --- | --- | --- | --- |
| `POST` | `/` | Yes | `uploadSource` | Upload a file or pasted text |

Supported file field:

```text
file
```

Supported file types:

- PDF: `application/pdf`
- DOCX: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- TXT: `text/plain`

Upload limit:

```text
10 MB
```

Text body:

```json
{
  "text": "Pasted study material goes here"
}
```

Response:

```json
{
  "message": "Document processed successfully",
  "documentId": "source_document_id",
  "wordCount": 250,
  "sourceType": "file"
}
```

---

### AI Routes

Base path: `/api/ai`

| Method | Path | Protected | Controller | Purpose |
| --- | --- | --- | --- | --- |
| `POST` | `/generate` | Yes | `generateQuestions` | Generate MCQ questions from a saved source document |

Request:

```json
{
  "sourceDocumentId": "source_document_id",
  "questionCount": 10,
  "difficulty": "medium"
}
```

Rules in code:

- `sourceDocumentId` is required.
- `questionCount` is clamped between 1 and 50.
- Default difficulty is `medium`.
- Non-admin users can generate only one quiz because the controller checks quiz count.
- Gemini model used: `gemini-2.5-flash`.
- AI response must be valid JSON array.

Response shape:

```json
{
  "messsage": "Quiz Generated Successfully",
  "data": {
    "aiGenerationId": "ai_generation_id",
    "questions": []
  }
}
```

Note: The response key is currently spelled `messsage` in code.

---

### Quiz Routes

Base path: `/api/quizzes`

| Method | Path | Protected | Controller | Purpose |
| --- | --- | --- | --- | --- |
| `POST` | `/` | Yes | `createQuiz` | Create draft quiz |
| `GET` | `/` | Yes | `getUserQuizzes` | Get current creator quizzes |
| `GET` | `/:id` | Yes | `getQuiz` | Get one creator-owned quiz |
| `PUT` | `/:id` | Yes | `updateQuiz` | Update title, theme, settings or questions |
| `POST` | `/:id/publish` | Yes | `publishQuiz` | Publish quiz and create share link |

Create request:

```json
{
  "sourceDocumentId": "source_document_id",
  "aiGenerationId": "ai_generation_id",
  "title": "Generated AI Quiz",
  "questions": []
}
```

Update request can include:

```json
{
  "title": "Chapter 1 Quiz",
  "theme": "dark-academic",
  "settings": {
    "timerEnabled": true,
    "durationMinutes": 15,
    "passingScore": 70
  },
  "questions": []
}
```

Publish request:

```json
{
  "expiryOption": "7-days"
}
```

Supported expiry options in service:

- `24-hours`
- `7-days`
- `30-days`
- `never`

Publishing stores:

```json
{
  "share": {
    "shareId": "short_id",
    "shareUrl": "http://localhost:5173/quiz/short_id",
    "expiryOption": "7-days",
    "qrValue": "http://localhost:5173/quiz/short_id"
  }
}
```

---

### Attempt and Analytics Routes

Base path: `/api/attempts`

| Method | Path | Protected | Controller | Purpose |
| --- | --- | --- | --- | --- |
| `GET` | `/quiz/:shareId` | No | `getPublicQuiz` | Get public quiz without correct answers |
| `POST` | `/:shareId` | No | `submitAttempt` | Submit student answers and grade them |
| `GET` | `/analytics/:quizId` | Yes | `getQuizAnalytics` | Get creator analytics for one quiz |

Submit request:

```json
{
  "participant": {
    "name": "Student"
  },
  "answers": [
    {
      "questionId": "question_id",
      "selectedOptionId": "A",
      "timeTakenSeconds": 0
    }
  ],
  "timeTakenSeconds": 180
}
```

Submit response:

```json
{
  "message": "Quiz submitted successfully",
  "score": 8,
  "percentage": 80,
  "passed": true,
  "results": []
}
```

Analytics response:

```json
{
  "quizSummary": {
    "title": "Quiz title",
    "analytics": {
      "totalSubmissions": 1,
      "passRate": 100,
      "averageScore": 80
    },
    "settings": {}
  },
  "recentSubmissions": []
}
```

---

## 6. Middleware

### `middleware/auth.js`

- Reads `Authorization` header.
- Expects `Bearer <token>`.
- Verifies token using `JWT_SECRET`.
- Loads user from MongoDB and removes `passwordHash`.
- Adds user to `req.user`.

### `middleware/upload.js`

- Uses memory storage.
- Accepts PDF, DOCX and TXT only.
- Rejects unsupported file types.
- Limits file size to 10 MB.

---

## 7. Services

| Service | File | Main job |
| --- | --- | --- |
| Auth | `services/authService.js` | Hash passwords, compare passwords, create JWT, Google login |
| Document | `services/documentService.js` | Extract PDF/DOCX/TXT text, clean text, save source document |
| AI | `services/aiService.js` | Call Gemini, parse JSON, save AI generation status |
| Quiz | `services/quizService.js` | Create draft, update quiz, publish link, list quizzes |
| Attempt | `services/attemptService.js` | Return safe public quiz, grade answers, update analytics |

---

## 8. Models

| Model | Collection | File |
| --- | --- | --- |
| `User` | `users` | `models/User.model.js` |
| `SourceDocument` | `sourcedocuments` by default Mongoose pluralization | `models/SourceDocument.model.js` |
| `AiGeneration` | `aigenerations` by default Mongoose pluralization | `models/AiGeneration.model.js` |
| `Quiz` | `quizzes` | `models/Quiz.model.js` |
| `Attempt` | `attempts` | `models/Attempt.model.js` |

---

## 9. Current Backend Notes

- There is no delete quiz route yet.
- There is no regenerate single question route yet.
- There is no separate result-fetch route. Results are returned only after submit.
- Public quiz endpoints are public on the backend, but protected by the current frontend router.
- Correct answers are removed from `getPublicQuiz` response.
- Attempt grading is done on the backend.
- The backend updates cached quiz analytics after every submitted attempt.
- `correctOptionText` is created in service response but is not defined in `Attempt.model.js`, so Mongoose strict mode may not save it in the database.
- `authService.generateToken` has a fallback secret, but `middleware/auth.js` verifies with `process.env.JWT_SECRET` only. In practice `JWT_SECRET` should always be set.

---

## 10. File Comments Added

Short comments were added to backend files explaining their purpose in simple language.
