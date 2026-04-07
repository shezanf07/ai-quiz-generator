# AI-Powered Quiz Generator

## Backend Module Documentation

| Field | Details |
| --- | --- |
| Prepared By | Shezan Fayaz |
| Institution | Islamia College of Science and Commerce |
| Project | AI-Powered Quiz Generator - BCA Final Year |
| Document | Backend Modules, Routes, Controllers and Services |
| Stack | Node.js 18, Express.js 4, MongoDB 6, OpenAI GPT-4 |
| Date | March 2026 |
| Version | 1.0 |


<table>
  <tr>
    <td>6</td>
    <td>6</td>
    <td>6</td>
    <td>6</td>
    <td>5</td>
    <td>7</td>
  </tr>
  <tr>
    <td>Modules</td>
    <td>Route files</td>
    <td>Controllers</td>
    <td>Services</td>
    <td>Models</td>
    <td>Middleware</td>
  </tr>
</table>

---

# 1. Backend Architecture Overview

The backend is a Node.js + Express.js REST API organized into 6 functional modules. Every HTTP request passes through the Express gateway, is checked by middleware (auth, validation, rate limiting), then routed to the appropriate controller which delegates to a service. Services hold all business logic and interact with MongoDB via Mongoose models.

<table>
  <thead>
    <tr>
      <th>Request lifecycle</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Client</td>
      <td>Express gateway Middleware (auth, validate, rate-limit) Router Controller Service</td>
    </tr>
    <tr>
      <td></td>
      <td>Mongoose model MongoDB Response</td>
    </tr>
  </tbody>
</table>

## 1.1 Layer responsibilities

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Folder</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Routes</td>
      <td>routes/</td>
      <td>Map HTTP method + path to a controller function</td>
    </tr>
    <tr>
      <td>Controllers</td>
      <td>controllers/</td>
      <td>Parse request, call service, return HTTP response</td>
    </tr>
    <tr>
      <td>Services</td>
      <td>services/</td>
      <td>All business logic - no Express objects inside</td>
    </tr>
    <tr>
      <td>Models</td>
      <td>models/</td>
      <td>Mongoose schemas, virtuals, instance methods</td>
    </tr>
    <tr>
      <td>Middleware</td>
      <td>middleware/</td>
      <td>Auth, validation, logging, errors - cross-cutting concerns</td>
    </tr>
    <tr>
      <td>Config</td>
      <td>config/</td>
      <td>DB connection, environment variables, constants</td>
    </tr>
  </tbody>
</table>

## 1.2 Technology stack

<table>
  <thead>
    <tr>
      <th>Technology</th>
      <th>Version</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Node.js</td>
      <td>18.x</td>
      <td>Server-side JavaScript runtime</td>
    </tr>
    <tr>
      <td>Express.js</td>
      <td>4.x</td>
      <td>HTTP framework - routing, middleware, REST API</td>
    </tr>
    <tr>
      <td>MongoDB</td>
      <td>6.0+</td>
      <td>Primary NoSQL database</td>
    </tr>
    <tr>
      <td>Mongoose</td>
      <td>7.x</td>
      <td>ODM - schema, validation, query builder</td>
    </tr>
    <tr>
      <td>OpenAI Node SDK</td>
      <td>4.x</td>
      <td>GPT-4 Turbo API calls for question generation</td>
    </tr>
    <tr>
      <td>Google Gemini</td>
      <td>API</td>
      <td>Fallback AI when OpenAI rate-limits or fails</td>
    </tr>
    <tr>
      <td>jsonwebtoken</td>
      <td>9.x</td>
      <td>Stateless authentication tokens</td>
    </tr>
    <tr>
      <td>bcrypt</td>
      <td>5.x</td>
      <td>Password hashing (12 salt rounds)</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Package Name</th>
      <th>Version Range</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Multer</td>
      <td>1.x</td>
      <td>Multipart file upload handling</td>
    </tr>
    <tr>
      <td>pdf-parse</td>
      <td>npm</td>
      <td>Extract text from PDF files</td>
    </tr>
    <tr>
      <td>mammoth</td>
      <td>npm</td>
      <td>Extract text from DOCX files</td>
    </tr>
    <tr>
      <td>nanoid</td>
      <td>npm</td>
      <td>Generate short unique quiz link IDs</td>
    </tr>
    <tr>
      <td>qrcode</td>
      <td>npm</td>
      <td>Generate QR code images for quiz links</td>
    </tr>
    <tr>
      <td>Winston</td>
      <td>3.x</td>
      <td>Structured request and error logging</td>
    </tr>
    <tr>
      <td>express-rate-limit</td>
      <td>npm</td>
      <td>API rate limiting per IP</td>
    </tr>
    <tr>
      <td>Joi</td>
      <td>npm</td>
      <td>Request body schema validation</td>
    </tr>
    <tr>
      <td>dotenv</td>
      <td>npm</td>
      <td>Environment variable management</td>
    </tr>
  </tbody>
</table>

---

# 2. Module Breakdown

## Module 1 - Auth

routes/auth.js controllers/authController.js
services/authService.js

Handles the full identity lifecycle - registration, login, Google OAuth, JWT issuance and verification, logout, and role-based access control. Built first since every protected route depends on it.

### 2.1.1 Sub-components

<table>
  <thead>
    <tr>
      <th>Sub-component</th>
      <th>File</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Register</td>
      <td>authController.js</td>
      <td>Validate input, check email uniqueness, hash password (bcrypt 12 rounds), create User document, return JWT</td>
    </tr>
    <tr>
      <td>Login</td>
      <td>authController.js</td>
      <td>Find user by email, compare bcrypt hash, sign JWT (user_id, email, role), update last_login timestamp</td>
    </tr>
    <tr>
      <td>Google OAuth</td>
      <td>authController.js</td>
      <td>Accept Google ID token via Firebase Auth, find-or-create User document, return JWT</td>
    </tr>
    <tr>
      <td>Logout</td>
      <td>authController.js</td>
      <td>Invalidate token via blacklist in DB, clear session data</td>
    </tr>
    <tr>
      <td>JWT middleware</td>
      <td>middleware/auth.js</td>
      <td>Extract Bearer token from Authorization header, verify signature, attach req.user for downstream use</td>
    </tr>
    <tr>
      <td>Role guard</td>
      <td>middleware/auth.js</td>
      <td>Check req.user.role against required role (educator, admin). Return 403 if unauthorized</td>
    </tr>
  </tbody>
</table>

### 2.1.2 API routes

<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/api/auth/register</td>
      <td>Register new educator account</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Login and receive JWT token</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/logout</td>
      <td>Invalidate current session token</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/google</td>
      <td>OAuth login via Google ID token</td>
    </tr>
  </tbody>
</table>

### 2.1.3 Registration flow

*   Client sends: name, email, password, organization
*   Joi validates - email format, password min 8 chars
*   Check if email already exists in users collection
*   Hash password with bcrypt.hash(password, 12)
*   Save new User document to MongoDB

---

* Sign JWT: jwt.sign({ user_id, email, role }, SECRET, { expiresIn: 7d })
* Return: { token, user: { id, name, email, role } }

## 2.1.4 Key npm packages

<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>jsonwebtoken</td>
      <td>jwt.sign() to issue tokens, jwt.verify() in middleware</td>
    </tr>
    <tr>
      <td>bcrypt</td>
      <td>bcrypt.hash(password, 12) on register, bcrypt.compare() on login</td>
    </tr>
    <tr>
      <td>firebase-admin</td>
      <td>Verify Google ID tokens for OAuth flow</td>
    </tr>
  </tbody>
</table>

---
---

# Module 2 - File Processing
routes/upload.js controllers/uploadController.js
services/fileService.js

Turns a raw upload into a clean array of question strings ready for the AI module. Multer handles intake and enforcement, specialized libraries extract text per format, and a regex-based splitter identifies individual questions.

## 2.2.1 Sub-components

<table>
  <thead>
    <tr>
      <th>Sub-component</th>
      <th>File</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Multer intake</td>
      <td>middleware/fileUpload.js</td>
      <td>Accept multipart/form-data. Reject files over 25 MB or wrong MIME type. Store temporarily in /tmp.</td>
    </tr>
    <tr>
      <td>PDF parser</td>
      <td>services/fileService.js</td>
      <td>Use pdf-parse to extract raw text from .pdf files page by page.</td>
    </tr>
    <tr>
      <td>DOCX parser</td>
      <td>services/fileService.js</td>
      <td>Use mammoth to extract plain text from .docx files, stripping all formatting.</td>
    </tr>
    <tr>
      <td>TXT reader</td>
      <td>services/fileService.js</td>
      <td>Direct fs.readFile() for .txt files - no library needed.</td>
    </tr>
    <tr>
      <td>Text cleaner</td>
      <td>services/fileService.js</td>
      <td>Remove extra whitespace, special characters, normalize line endings and unicode.</td>
    </tr>
    <tr>
      <td>Question splitter</td>
      <td>services/fileService.js</td>
      <td>Regex split on numbered patterns (1., Q1:) and newline delimiters to produce questions[ ].</td>
    </tr>
  </tbody>
</table>

## 2.2.2 API routes

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span>POST</span></td>
      <td>/api/upload</td>
      <td>Upload file - returns extractedText[ ]</td>
    </tr>
    <tr>
      <td><span>GET</span></td>
      <td>/api/upload/status/:id</td>
      <td>Poll upload processing progress percentage</td>
    </tr>
  </tbody>
</table>

## 2.2.3 Processing pipeline
* POST /api/upload received with multipart/form-data
* Multer validates: MIME type must be PDF, DOCX, or TXT
* File size check: reject if over 25 MB
* Store file temporarily to /tmp with a UUID filename
* Route to correct parser based on file extension
* PDF: pdf-parse(buffer) returns rawText string
* DOCX: mammoth.extractRawText({ path }) returns plainText value
* TXT: fs.readFile(path, utf-8) returns rawText string
* Clean: strip whitespace, normalize unicode, remove page headers
* Split: regex match numbered questions into questions[ ] array

---

* Delete temp file from /tmp after processing
* Return: { file_url, extractedText: questions[ ] }

### 2.2.4 Key npm packages

<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>multer</td>
      <td>diskStorage config, fileFilter for MIME check, limits.fileSize = 25MB</td>
    </tr>
    <tr>
      <td>pdf-parse</td>
      <td>parse(dataBuffer) returns { text, numpages, info }</td>
    </tr>
    <tr>
      <td>mammoth</td>
      <td>mammoth.extractRawText({ path }) returns { value: plainText }</td>
    </tr>
    <tr>
      <td>uuid</td>
      <td>Generate unique temp file names to avoid naming collisions</td>
    </tr>
  </tbody>
</table>

---

# Module 3 - AI Integration

routes/ai.js controllers/aiController.js
services/aiService.js

The most expensive and complex backend module. Takes the question array from the file module, builds a structured prompt per question using one of 5 templates, calls GPT-4 Turbo, parses and validates the response JSON, and returns fully formed question objects with options, correct answer, explanation, and confidence score. Google Gemini Pro is the free-tier fallback.

## 2.3.1 Sub-components

<table>
<thead>
<tr>
<th>Sub-component</th>
<th>File</th>
<th>Responsibility</th>
</tr>
</thead>
<tbody>
<tr>
<td>Prompt builder</td>
<td>services/aiService.js</td>
<td>Format each question text into one of 5 prompt templates (Standard, Challenging, Educational, Mixed, Conceptual).</td>
</tr>
<tr>
<td>OpenAI client</td>
<td>services/aiService.js</td>
<td>Call openai.chat.completions.create() with gpt-4-turbo, temperature 0.7, max_tokens 500.</td>
</tr>
<tr>
<td>Gemini fallback</td>
<td>services/aiService.js</td>
<td>If OpenAI throws RateLimitError or is unavailable, automatically retry with Google Gemini Pro API.</td>
</tr>
<tr>
<td>Response parser</td>
<td>services/aiService.js</td>
<td>Parse JSON from AI response. Validate: 4 options, correct_answer, explanation, confidence score 0-1.</td>
</tr>
<tr>
<td>Cache layer</td>
<td>services/aiService.js</td>
<td>Hash question text to create cache key. Check before calling API. Store result for 24 hours to cut costs.</td>
</tr>
<tr>
<td>Retry handler</td>
<td>services/aiService.js</td>
<td>Exponential backoff on 429 rate-limit errors. Max 3 retries with 1s, 2s, 4s delays.</td>
</tr>
<tr>
<td>Batch processor</td>
<td>aiController.js</td>
<td>Process questions in batches of 5 to avoid token limits and reduce total latency.</td>
</tr>
</tbody>
</table>

## 2.3.2 API routes

<table>
<thead>
<tr>
<th>Method</th>
<th>Route</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>POST</strong></td>
<td>/api/ai/generate-options</td>
<td>Generate 4 MCQ options for given questions</td>
</tr>
<tr>
<td><strong>POST</strong></td>
<td>/api/ai/generate-questions</td>
<td>Auto-generate questions from topic and difficulty</td>
</tr>
<tr>
<td><strong>GET</strong></td>
<td>/api/ai/templates</td>
<td>List the 5 available prompt templates</td>
</tr>
</tbody>
</table>

## 2.3.3 The 5 prompt templates

<table>
<thead>
<tr>
<th>Template</th>
<th>Description</th>
<th>Best for</th>
</tr>
</thead>
<tbody>
<tr>
<td>Standard MCQ</td>
<td>4 plausible options, 1 correct, distractors clearly wrong</td>
<td>General knowledge quizzes</td>
</tr>
<tr>
<td>Challenging MCQ</td>
<td>4 plausible options, 1 correct, distractors subtly wrong</td>
<td>Competitive exams, advanced topics</td>
</tr>
<tr>
<td>Educational MCQ</td>
<td>4 plausible options, 1 correct, explanation required</td>
<td>Learning resources, educational content</td>
</tr>
<tr>
<td>Mixed MCQ</td>
<td>4 plausible options, 1 correct, some distractors partially right</td>
<td>Assessing understanding, critical thinking</td>
</tr>
<tr>
<td>Conceptual MCQ</td>
<td>4 plausible options, 1 correct, explanation crucial</td>
<td>Deep understanding, theoretical concepts</td>
</tr>
</tbody>
</table>

---

<table>
  <tr>
    <td>Challenging</td>
    <td>Similar-sounding options with subtle technical differences</td>
    <td>Advanced learners, exams</td>
  </tr>
  <tr>
    <td>Educational</td>
    <td>Options include learning hints, explain why each is right or wrong</td>
    <td>Teaching contexts</td>
  </tr>
  <tr>
    <td>Mixed</td>
    <td>Blend of easy and hard options at different difficulty levels</td>
    <td>Varied difficulty quizzes</td>
  </tr>
  <tr>
    <td>Conceptual</td>
    <td>Distractors target common student misconceptions specifically</td>
    <td>Identifying knowledge gaps</td>
  </tr>
</table>

## 2.3.4 AI response structure
Each question sent to the AI returns the following validated JSON:

```json
{
  "question": "original question text",
  "options": [{ "id": "A", "text": "..." }, { "id": "B", "text": "..." },
              { "id": "C", "text": "..." }, { "id": "D", "text": "..." }],
  "correct_answer": "B",
  "explanation": "Brief explanation of why B is correct",
  "confidence": 0.95 }
```

## 2.3.5 Key npm packages
<table>
  <tr>
    <td><b>Package</b></td>
    <td><b>Usage</b></td>
  </tr>
  <tr>
    <td>openai</td>
    <td>openai.chat.completions.create() - official OpenAI Node SDK</td>
  </tr>
  <tr>
    <td>@google/generative-ai</td>
    <td>Google Gemini Pro API client for fallback generation</td>
  </tr>
  <tr>
    <td>crypto</td>
    <td>Built-in Node.js - sha256 hash of question text for cache key</td>
  </tr>
</table>

---

# Module 4 - Quiz Management

routes/quiz.js quizController.js models/Quiz.js
models/Question.js

The central data module. Owns the full quiz lifecycle - from creation through publishing, sharing, and archival. Manages all question documents, generates shareable short links and QR codes, enforces access control per visibility setting, and updates analytics on every student completion.

## 2.4.1 Sub-components

<table>
  <thead>
    <tr>
      <th>Sub-component</th>
      <th>File</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Quiz CRUD</td>
      <td>quizController.js</td>
      <td>Create, read, update, delete quiz documents in MongoDB.</td>
    </tr>
    <tr>
      <td>Question CRUD</td>
      <td>quizController.js</td>
      <td>Save, edit, reorder, and bulk-import question documents linked to a quiz.</td>
    </tr>
    <tr>
      <td>Link generator</td>
      <td>services/quizService.js</td>
      <td>Generate 8-char nanoid short ID. Build full URL. Store { short_id, full_url } in Quiz document.</td>
    </tr>
    <tr>
      <td>QR generator</td>
      <td>services/quizService.js</td>
      <td>Call qrcode.toDataURL(fullUrl) to produce base64 QR image. Return with link data.</td>
    </tr>
    <tr>
      <td>Access control</td>
      <td>quizController.js</td>
      <td>Check quiz.visibility (public / link-only / private) and quiz.status before serving quiz data.</td>
    </tr>
    <tr>
      <td>Status manager</td>
      <td>quizController.js</td>
      <td>Handle draft - published - archived transitions. Set published_at timestamp. Enforce expiry.</td>
    </tr>
    <tr>
      <td>Analytics tracker</td>
      <td>quizController.js</td>
      <td>After each student completion, increment total_attempts and recalculate average_score.</td>
    </tr>
  </tbody>
</table>

## 2.4.2 API routes

<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span>POST</span></td>
      <td>/api/quiz/create</td>
      <td>Create new quiz document</td>
    </tr>
    <tr>
      <td><span>GET</span></td>
      <td>/api/quiz/:quiz_id</td>
      <td>Get full quiz details and questions</td>
    </tr>
    <tr>
      <td><span>PUT</span></td>
      <td>/api/quiz/:quiz_id</td>
      <td>Update quiz settings or metadata</td>
    </tr>
    <tr>
      <td><span>DELETE</span></td>
      <td>/api/quiz/:quiz_id</td>
      <td>Delete quiz and its questions</td>
    </tr>
    <tr>
      <td><span>GET</span></td>
      <td>/api/quiz/creator/:creator_id</td>
      <td>List all quizzes by a creator</td>
    </tr>
    <tr>
      <td><span>GET</span></td>
      <td>/api/quiz/:short_link/public</td>
      <td>Public quiz access via short link - no auth</td>
    </tr>
    <tr>
      <td><span>POST</span></td>
      <td>/api/quiz/:short_link/start</td>
      <td>Start a student quiz session</td>
    </tr>
  </tbody>
</table>

---

## 2.4.3 Quiz status lifecycle
* draft - created but not accessible to students. Creator can edit freely.
* published - live and accessible. Short link and QR code are active. Analytics begin.
* archived - hidden from students. Short link returns 404. Analytics preserved for creator.

## 2.4.4 Key npm packages

<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>nanoid</td>
      <td>customAlphabet(urlSafeChars, 8)() generates short quiz link ID</td>
    </tr>
    <tr>
      <td>qrcode</td>
      <td>qrcode.toDataURL(url, options) returns base64 PNG data URL</td>
    </tr>
    <tr>
      <td>mongoose</td>
      <td>Quiz.findOne(), Quiz.findByIdAndUpdate(), Question.insertMany()</td>
    </tr>
  </tbody>
</table>

---

# Module 5 - Scoring and Results
routes/results.js resultController.js
reportService.js models/Result.js

Manages the full student session from quiz start to final score report. Each answer is evaluated immediately against the correct_answer in the Question document. On completion a comprehensive Result document is written to MongoDB and an analytics endpoint aggregates performance data for the creator dashboard.

## 2.5.1 Sub-components

<table>
  <thead>
    <tr>
      <th>Sub-component</th>
      <th>File</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Session handler</td>
      <td>resultController.js</td>
      <td>Create session on quiz start. Track session_id, start_time, question_order (shuffled if enabled), running score.</td>
    </tr>
    <tr>
      <td>Answer evaluator</td>
      <td>resultController.js</td>
      <td>On each submit: retrieve correct_answer from Question doc, compare with selected_option, flag is_correct, record time_taken.</td>
    </tr>
    <tr>
      <td>Score calculator</td>
      <td>resultController.js</td>
      <td>On completion: sum correct answers, compute percentage, determine pass/fail against passing_score threshold.</td>
    </tr>
    <tr>
      <td>Result store</td>
      <td>resultController.js</td>
      <td>Save complete Result: score, percentage, passed, answers[], total_time_taken, device_info, timestamps.</td>
    </tr>
    <tr>
      <td>PDF report</td>
      <td>services/reportService.js</td>
      <td>Generate downloadable PDF result - score summary, question breakdown, performance chart.</td>
    </tr>
    <tr>
      <td>Analytics endpoint</td>
      <td>resultController.js</td>
      <td>Aggregate across all Result docs for a quiz: avg score, pass rate, completion rate, question accuracy.</td>
    </tr>
  </tbody>
</table>

## 2.5.2 API routes

<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/api/quiz/:short_link/start</td>
      <td>Create session, return first question</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/quiz/submit-answer</td>
      <td>Submit answer, receive instant feedback</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/quiz/:session_id/complete</td>
      <td>Finalize quiz, get full result</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/results/:result_id</td>
      <td>Fetch full result with review data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/quiz/:quiz_id/results</td>
      <td>List all results for a quiz (creator only)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/quiz/:quiz_id/analytics</td>
      <td>Aggregated analytics for creator dashboard</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/results/:result_id/export-pdf</td>
      <td>Download result as PDF</td>
    </tr>
  </tbody>
</table>

## 2.5.3 Per-answer scoring logic

---

*   Receive: { session_id, question_id, selected_option, timestamp }
*   Look up Question document by question_id from MongoDB
*   Compare: selected_option === question.correct_answer
*   If match: increment session.correct_count, set is_correct = true
*   If mismatch: increment session.incorrect_count, set is_correct = false
*   Store answer object: { question_id, selected_option, is_correct, time_taken }
*   Calculate running percentage: (correct_count / total_questions) * 100
*   Return: { is_correct, explanation } (explanation shown if instant feedback is enabled)

### 2.5.4 Final completion logic
*   Sum all correct answers from session.answers[]
*   Compute percentage: (correct / total) * 100 rounded to 2 decimal places
*   Determine pass/fail: percentage >= quiz.settings.passing_score
*   Build breakdown: correct_count, incorrect_count, unanswered_count, time_taken
*   Create and save Result document to MongoDB
*   Update quiz.analytics: increment total_attempts, recalculate average_score
*   Return full result object to client for display on ResultsPage

### 2.5.5 Key npm packages

<table>
<thead>
<tr>
<th>Package</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>pdfkit or puppeteer</td>
<td>Generate PDF result reports server-side</td>
</tr>
<tr>
<td>mongoose</td>
<td>Result.create(), Result.aggregate() for analytics queries</td>
</tr>
<tr>
<td>uuid</td>
<td>Generate unique session_id per quiz attempt</td>
</tr>
</tbody>
</table>

---

# Module 6 - Middleware and Error Handling
middleware/ app.js config/

The invisible layer that runs before every controller. Centralizes cross-cutting concerns so no module handles them individually. Top row (auth, validation, rate-limit) runs on protected routes. Bottom row (error handler, logger, CORS) runs on every request.

## 2.6.1 Middleware files

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Runs on</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>auth.js</td>
      <td>Protected routes only</td>
      <td>Extract Bearer token, verify JWT signature, attach req.user. Return 401 if missing or invalid.</td>
    </tr>
    <tr>
      <td>validation.js</td>
      <td>POST and PUT routes</td>
      <td>Joi schema validation of req.body. Return 400 with field-level error messages if schema fails.</td>
    </tr>
    <tr>
      <td>rateLimiter.js</td>
      <td>All routes</td>
      <td>express-rate-limit: max 100 requests per 15-minute window per IP. Returns 429 on breach.</td>
    </tr>
    <tr>
      <td>fileUpload.js</td>
      <td>Upload route only</td>
      <td>Multer config: MIME type whitelist, 25 MB size limit, diskStorage to /tmp directory.</td>
    </tr>
    <tr>
      <td>errorHandler.js</td>
      <td>All routes - last</td>
      <td>Global catch-all. Formats error as { status, message, errors[], stack (dev only) }. Logs via Winston.</td>
    </tr>
    <tr>
      <td>logger.js</td>
      <td>All routes</td>
      <td>Winston middleware: logs method, URL, status code, and response time on every request.</td>
    </tr>
    <tr>
      <td>cors.js</td>
      <td>All routes</td>
      <td>Allow requests from REACT_APP_URL. Expose Authorization header. Handle preflight OPTIONS.</td>
    </tr>
  </tbody>
</table>

## 2.6.2 Middleware registration order in app.js
Order is critical in Express - middleware runs top-to-bottom:

1. cors() - must be first so preflight OPTIONS requests pass through
2. express.json() - parse JSON request body
3. express.urlencoded() - parse URL-encoded form data
4. logger (Winston) - log all incoming requests before processing
5. rateLimiter - block abuse before any route logic executes
6. Routes registered - /api/auth, /api/quiz, /api/upload, /api/ai, /api/results
7. 404 handler - catch unmatched routes and return standard not-found response
8. errorHandler - must be last, requires 4-argument (err, req, res, next) signature

## 2.6.3 Standard error response format

---

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "must be a valid email" }],
  "stack": "Error: ..." // stack only shown in development mode
}
```

## 2.6.4 Key npm packages

<table>
<thead>
<tr>
<th>Package</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>express-rate-limit</td>
<td>rateLimit({ windowMs: 15*60*1000, max: 100 })</td>
</tr>
<tr>
<td>joi</td>
<td>Joi.object().keys({ email: Joi.string().email() }).validate(req.body)</td>
</tr>
<tr>
<td>winston</td>
<td>createLogger with Console + File transports, JSON format in production</td>
</tr>
<tr>
<td>cors</td>
<td>cors({ origin: process.env.REACT_APP_URL, exposedHeaders: ['Authorization'] })</td>
</tr>
<tr>
<td>helmet</td>
<td>Security headers: X-Frame-Options, CSP, HSTS, X-Content-Type-Options</td>
</tr>
</tbody>
</table>

---

# 3. Full Folder Structure

The backend follows a strict layered pattern - routes call controllers, controllers call services, services use models.
Color: green = route, purple = controller, orange = service, red = model, coral = middleware, gray = config.

```mermaid
graph TD
    subgraph server/
        config/
            db.js
            env.js
            constants.js
        routes/
            auth.js
            quiz.js
            upload.js
            ai.js
            results.js
            templates.js
        controllers/
            authController.js
            quizController.js
            uploadController.js
            aiController.js
            resultController.js
            templateController.js
        services/
            authService.js
            fileService.js
            aiService.js
            quizService.js
            reportService.js
            emailService.js
        models/
            User.js
            Quiz.js
            Question.js
            Result.js
            Template.js
        middleware/
            auth.js
            validation.js
            rateLimiter.js
```

---

fileUpload.js
errorHandler.js
logger.js
cors.js
app.js
server.js
.env
package.json

Route Controller Service Model Middleware Config

# 4. Summary

<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Key Files</th>
      <th>Routes / Scope</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 - Auth</td>
      <td>authController.js, authService.js, middleware/auth.js</td>
      <td>POST /api/auth/register, /login, /logout, /google</td>
    </tr>
    <tr>
      <td>2 - File Processing</td>
      <td>uploadController.js, fileService.js, middleware/fileUpload.js</td>
      <td>POST /api/upload, GET /api/upload/status/:id</td>
    </tr>
    <tr>
      <td>3 - AI Integration</td>
      <td>aiController.js, aiService.js</td>
      <td>POST /api/ai/generate-options, /generate-questions, GET /api/ai/templates</td>
    </tr>
    <tr>
      <td>4 - Quiz Management</td>
      <td>quizController.js, quizService.js, Quiz.js, Question.js</td>
      <td>POST/GET/PUT/DELETE /api/quiz/:id, GET /:link/public</td>
    </tr>
    <tr>
      <td>5 - Scoring and Results</td>
      <td>resultController.js, reportService.js, Result.js</td>
      <td>POST /submit-answer, /complete, GET /results/:id, /analytics</td>
    </tr>
    <tr>
      <td>6 - Middleware</td>
      <td>auth.js, validation.js, rateLimiter.js, errorHandler.js</td>
      <td>Runs on all routes - not exposed as API endpoints</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Count / Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Modules total</td>
      <td>6 - Auth, File Processing, AI Integration, Quiz Management, Scoring and Results, Middleware</td>
    </tr>
    <tr>
      <td>Route files</td>
      <td>6 - auth.js, quiz.js, upload.js, ai.js, results.js, templates.js</td>
    </tr>
    <tr>
      <td>Controllers</td>
      <td>6 - one per module, handle HTTP layer only (no business logic)</td>
    </tr>
    <tr>
      <td>Services</td>
      <td>6 - authService, fileService, aiService, quizService, reportService, emailService</td>
    </tr>
    <tr>
      <td>Mongoose models</td>
      <td>5 - User, Quiz, Question, Result, Template</td>
    </tr>
  </tbody>
</table>

---

<table>
  <tr>
    <td>Middleware files</td>
    <td>7 - auth, validation, rateLimiter, fileUpload, errorHandler, logger, cors</td>
  </tr>
  <tr>
    <td>AI prompt templates</td>
    <td>5 - Standard, Challenging, Educational, Mixed, Conceptual</td>
  </tr>
  <tr>
    <td>Total API endpoints</td>
    <td>20+ across all 6 modules</td>
  </tr>
  <tr>
    <td>Auth strategy</td>
    <td>JWT (jsonwebtoken) + bcrypt (12 rounds) + Google OAuth (Firebase Admin)</td>
  </tr>
  <tr>
    <td>Error format</td>
    <td>Consistent { status, message, errors[], stack } on all failures</td>
  </tr>
  <tr>
    <td>Rate limiting</td>
    <td>100 requests per 15 minutes per IP via express-rate-limit</td>
  </tr>
  <tr>
    <td>File size limit</td>
    <td>25 MB max per upload enforced by Multer</td>
  </tr>
</table>

Prepared by Shezan Fayaz | Islamia College of Science and Commerce | March 2026

March 2026


