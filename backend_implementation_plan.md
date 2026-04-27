# Backend Implementation Plan

## Phase 1: User Authentication & Authorization Module
* Implement the `User` Mongoose model (email, password hash, role, etc.).
* Create the Authentication Controller with `Register` and `Login` functions.
* Implement `bcrypt` for password hashing and `jsonwebtoken` for issuing stateless sessions.
* Create a JWT verification middleware (`protect`) to secure future endpoints.
* Wire up the `/api/auth` routes.

## Phase 2: File Processing & Source Document Module
* Implement the `SourceDocument` Mongoose model to store extracted text.
* Set up `multer` middleware to safely accept multipart/form-data file uploads (PDF, DOCX, TXT).
* Integrate parsers (`pdf-parse`, `mammoth`, or native `fs` for TXT) to extract raw text from uploads.
* Build the `/api/upload` route that receives a file, extracts the text, and saves it to the database.

## Phase 3: AI Integration Engine
* Implement the `AiGeneration` Mongoose model to track API usage and generations.
* Integrate the `openai` Node SDK for GPT-4 Turbo (with a potential Gemini fallback if needed).
* Build the prompt assembly logic to format the extracted text according to your 5 themes (Standard, Educational, etc.).
* Create the `/api/ai/generate` endpoint that sends text to the AI, validates the returned JSON, and saves the history.

## Phase 4: Quiz Management & Link Generation
* Implement the core `Quiz` Mongoose model with its embedded `questions` and `options` sub-schemas.
* Create CRUD controllers to allow the creator to save approved AI questions into a finalized Quiz.
* Implement the configuration update endpoints (timer, theme, passing score).
* Integrate `nanoid` to generate secure, short shareable links (e.g., `quizly.com/q/aBcDeFgH`).

## Phase 5: Student Attempts & Analytics System
* Implement the `Attempt` Mongoose model to track student sessions and answers.
* Create the public endpoint for students to fetch quiz questions via the short link.
* Build the grading logic: when a student submits their quiz, the backend compares it against the correct answers, calculates the score/percentage, and saves the `Attempt`.
* Build the creator analytics endpoint (calculating total submissions, pass rates, and averages for the Dashboard).

## Phase 6: Frontend Integration & End-to-End Wiring
* Connect the React frontend (`AuthPage`, `UploadPage`, `QuizEditorPage`, etc.) to the new API endpoints.
* Implement backend request validation (e.g., ensuring passwords meet length requirements, verifying valid IDs).
* Set up centralized error handling on the backend to send clean error messages to the frontend.
* Final polish (toast notifications, loading states, ensuring the end-to-end flow is seamless).
