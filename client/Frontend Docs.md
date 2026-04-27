# AI-Powered Quiz Generator

## Frontend Module Documentation

| Field | Details |
| --- | --- |
| Prepared By | Shezan Fayaz |
| Institution | Islamia College of Science and Commerce |
| Project | AI-Powered Quiz Generator - BCA Final Year |
| Document | Frontend Modules, Pages and Components |
| Date | April 2026 |
| Version | 1.1 |

---

## 1. Frontend Overview

The frontend of the AI-Powered Quiz Generator, branded as **Quizly**, provides the complete user interface for creators and students. It allows a creator to upload learning material, generate a quiz, edit questions, configure quiz rules, publish the quiz, share it through a link or QR code, and view quiz statistics. Students can open the shared quiz link, answer questions, submit the quiz, and review their result.

The frontend is built with React, TypeScript, Vite, React Router and Tailwind CSS. The interface uses a refined academic visual style with serif headings, warm gold accents, responsive layouts, and light/dark theme support.

---

## 2. Technology Stack

| Technology | Purpose |
| --- | --- |
| React | Component-based frontend UI |
| TypeScript | Type safety for components and props |
| Vite | Development server and production build tool |
| React Router | Page routing and navigation |
| Tailwind CSS | Utility-first styling |
| CSS Variables | Theme color system |
| Lucide React | Icons used across the UI |
| qrcode.react | QR code generation on the share page |
| clsx | Conditional class names |

---

## 3. Application Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Landing Page | Introduces Quizly and directs users to create a quiz |
| `/login` | Login Page | Allows creators to sign in |
| `/register` | Register Page | Allows creators to create an account |
| `/dashboard` | Dashboard Page | Shows the creator's generated quizzes |
| `/create/upload` | Upload Page | Accepts PDF, DOCX, TXT or pasted text |
| `/create/edit` | Quiz Editor Page | Allows review and editing of generated questions |
| `/create/config` | Quiz Config Page | Allows title, theme, timer and passing score settings |
| `/create/share` | Share Link Page | Shows the generated share link and QR code |
| `/quiz/:id` | Quiz View Page | Allows students to take a published quiz |
| `/quiz/:id/results` | Results Page | Shows score, pass/fail status and answer review |
| `/stats/:id` | Stats Page | Shows creator analytics for a quiz |
| `/terms` | Terms Page | Terms and conditions |
| `/privacy` | Privacy Page | Privacy policy |

---

## 4. Main User Flows

### 4.1 Creator Flow

1. The creator opens the landing page.
2. The creator logs in or registers.
3. The creator opens the dashboard.
4. The creator starts a new quiz.
5. The creator uploads a document or pastes plain text.
6. AI generates questions from the uploaded material.
7. The creator edits question text and answer options.
8. The creator marks the correct option for each question.
9. The creator configures quiz title, theme, timer and passing score.
10. The creator publishes the quiz.
11. The creator receives a shareable link and QR code.
12. The creator views quiz statistics after students submit attempts.

### 4.2 Student Flow

1. The student opens a shared quiz link.
2. The student answers multiple-choice questions.
3. The student moves through the quiz using previous and next controls.
4. The student submits the quiz.
5. The result page shows score percentage, pass/fail status and answer review.

---

## 5. Page Modules

### 5.1 Landing Page

File: `src/pages/LandingPage.tsx`

The landing page presents the product and contains:

| Component | Role |
| --- | --- |
| `Navbar` | Brand, theme toggle, login and register navigation |
| `HeroSection` | Main headline, product message and upload CTA |
| `FeatureCards` | Highlights AI generation, editing and sharing |
| `HowItWorks` | Shows the four-step process |
| `BottomCTA` | Final call-to-action |
| `Footer` | Privacy, terms and contact links |

### 5.2 Authentication Pages

Files:

- `src/pages/AuthPage.tsx`
- `src/layouts/AuthLayout.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/GoogleOAuthBtn.tsx`

The authentication module provides:

- Login form with email and password.
- Register form with full name, email, password and confirm password.
- Password visibility toggle.
- Google OAuth button.
- Terms and privacy links.
- Split-screen academic branding layout on large screens.

### 5.3 Dashboard Page

File: `src/pages/DashboardPage.tsx`

The dashboard provides the creator's main workspace. It displays quiz cards with title, quiz type, question count and recent activity. It also provides the "Create New Quiz" action that starts the quiz creation workflow.

### 5.4 Creator Layout

File: `src/layouts/CreatorLayout.tsx`

The creator layout wraps the quiz creation pages and provides:

- Brand navigation.
- Dashboard/avatar link.
- Four-step progress indicator.
- Responsive stepper for desktop and mobile.

Workflow steps:

| Step | Label | Route |
| --- | --- | --- |
| 1 | Upload | `/create/upload` |
| 2 | Edit | `/create/edit` |
| 3 | Configure | `/create/config` |
| 4 | Publish | `/create/share` |

### 5.5 Upload Page

File: `src/pages/UploadPage.tsx`

The upload page accepts the source material used to generate the quiz. It supports three file types and direct text input.

Features:

- Drag-and-drop upload area.
- Supported file labels: PDF, DOCX and TXT.
- Pasted plain-text input area.
- Upload/parsing/ready states.
- Continue action to generate quiz with AI.

### 5.6 Quiz Editor Page

File: `src/pages/QuizEditorPage.tsx`

The quiz editor allows creators to review and refine generated questions before publishing.

Features:

- Question list/sidebar on desktop.
- Compact question selector on mobile.
- Editable question text.
- Four editable answer options.
- Correct answer selector.
- Delete question action.
- Regenerate question action.
- Continue action to quiz configuration.

### 5.7 Quiz Config Page

File: `src/pages/QuizConfigPage.tsx`

The config page stores final quiz settings.

Features:

- Theme selector.
- Timer enable/disable toggle.
- Duration setting in minutes.
- Preset duration options: 5, 15, 30, 45 and 60 minutes.
- Passing score slider.
- Quiz title input.
- Publish action.

Available themes:

| Theme ID | Display Name |
| --- | --- |
| `light` | Light |
| `dark-academic` | Dark Academic |
| `amber-glow` | Amber Glow |

### 5.8 Share Link Page

Files:

- `src/pages/ShareLinkPage.tsx`
- `src/components/quiz/ShareModal.tsx`

The share page appears after a quiz is published.

Features:

- Published success message.
- Shareable quiz URL.
- Copy link action.
- QR code display.
- Download QR code action.
- Expiry selector with 24 hours, 7 days, 30 days and never options.
- Link to quiz statistics.

### 5.9 Quiz View Page

File: `src/pages/QuizViewPage.tsx`

The quiz view page is used by students.

Features:

- Quiz brand header.
- Question progress.
- Timer display.
- Multiple-choice question card.
- Selectable answer options.
- Previous and next question controls.

### 5.10 Results Page

File: `src/pages/ResultsPage.tsx`

The results page shows the student's quiz performance.

Features:

- Circular score display.
- Score percentage.
- Correct answer count.
- Pass/fail badge.
- Question review list.
- Correct and incorrect answer states.
- Retake quiz action.
- Back to home action.

### 5.11 Stats Page

File: `src/pages/StatsPage.tsx`

The stats page gives creators a summary of student performance.

Features:

- Total submissions.
- Pass rate.
- Average score.
- Recent submissions table.
- Student name, score, time taken, status and submission date.
- Load more results action.

### 5.12 Terms and Privacy Pages

Files:

- `src/pages/TermsPage.tsx`
- `src/pages/PrivacyPage.tsx`

These pages provide simple academic-project policy content for users.

---

## 6. Shared Components

| Component | File | Description |
| --- | --- | --- |
| `Navbar` | `components/shared/Navbar.tsx` | Top navigation for landing page |
| `Footer` | `components/shared/Footer.tsx` | Footer with policy links |
| `ThemeToggle` | `components/shared/ThemeToggle.tsx` | Light/dark mode switch |
| `FormInput` | `components/shared/FormInput.tsx` | Reusable input component |
| `GoogleOAuthBtn` | `components/auth/GoogleOAuthBtn.tsx` | Google authentication button |
| `OptionCard` | `components/quiz/OptionCard.tsx` | Selectable answer option |
| `ReviewCard` | `components/quiz/ReviewCard.tsx` | Result review card |
| `ShareModal` | `components/quiz/ShareModal.tsx` | Share URL and QR display |

---

## 7. Theme System

The frontend uses CSS variables defined in `src/index.css`.

| Variable | Purpose |
| --- | --- |
| `--background` | Page background |
| `--foreground` | Main text color |
| `--primary` | Main accent color |
| `--primary-hover` | Accent hover color |
| `--primary-foreground` | Text on primary buttons |
| `--card` | Card background |
| `--card-foreground` | Text inside cards |
| `--muted` | Muted background |
| `--muted-foreground` | Secondary text |
| `--border` | Borders |

The selected light/dark mode is stored in `localStorage` under the key `theme`.

---

## 8. Frontend Data Requirements

The frontend requires the backend to provide the following data:

| Feature | Required data |
| --- | --- |
| Authentication | User name, email, token/session |
| Dashboard | User quizzes with title, type, question count and last updated date |
| Upload | File metadata, extracted text and processing status |
| Quiz Editor | Generated questions, options and correct answers |
| Config | Quiz title, selected theme, timer and passing score |
| Share | Public quiz link, QR value and expiry |
| Quiz View | Published quiz questions and settings |
| Results | Score, percentage, pass/fail state and answer review |
| Stats | Total submissions, pass rate, average score and recent submissions |

---

## 9. Summary

The frontend defines the complete software flow for Quizly. The backend and database should follow this frontend structure so each page can be connected directly to API data without changing the user experience.
