# AI-Powered Quiz Generator

## Frontend Documentation

| Field | Details |
| --- | --- |
| Project | AI Quiz Generator / QuizlyAI |
| Frontend path | `client/` |
| Main source path | `client/src/` |
| Framework | React 19 with TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 through `@tailwindcss/vite` and custom CSS variables |
| Routing | React Router |
| Last checked | May 19, 2026 |

---

## 1. Frontend Overview

The frontend is the user interface for the full quiz flow. A creator can register or log in, upload a file or paste text, generate quiz questions with AI, edit those questions, configure the quiz, publish it, share the link, and view stats. A student can open the shared quiz link, answer questions, submit the quiz, and see the result page.

The app stores the JWT token in `localStorage` using the key `token`. It also stores the user display name in `user_name` and the selected theme in `theme`.

---

## 2. Frontend Stack

| Package | Used for |
| --- | --- |
| `react`, `react-dom` | UI rendering |
| `react-router-dom` | Routes, links, redirects and nested pages |
| `vite` | Dev server and production build |
| `typescript` | Type checking |
| `tailwindcss`, `@tailwindcss/vite` | Styling utilities |
| `lucide-react` | Icons |
| `qrcode.react` | QR code on the share page |
| `clsx` | Conditional class names |

Scripts in `client/package.json`:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts Vite dev server |
| `npm run build` | Runs TypeScript build and Vite build |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Serves the production build locally |

---

## 3. Actual Route Map

These are the routes from `client/src/App.tsx`.

| Route | File | Access | Purpose |
| --- | --- | --- | --- |
| `/` | `src/pages/LandingPage.tsx` | Public | Landing page |
| `/terms` | `src/pages/TermsPage.tsx` | Public | Terms page |
| `/privacy` | `src/pages/PrivacyPage.tsx` | Public | Privacy page |
| `/login` | `src/pages/AuthPage.tsx` | Public only | Login form |
| `/register` | `src/pages/AuthPage.tsx` | Public only | Register form |
| `/dashboard` | `src/pages/DashboardPage.tsx` | Protected | Creator dashboard |
| `/create/upload` | `src/pages/UploadPage.tsx` | Protected | Upload file or paste text |
| `/create/edit?id=:quizId` | `src/pages/QuizEditPage.tsx` | Protected | Edit generated questions |
| `/create/config?id=:quizId` | `src/pages/QuizConfigPage.tsx` | Protected | Configure title, timer and passing score |
| `/create/share?id=:quizId&url=:shareUrl` | `src/pages/ShareLinkPage.tsx` | Protected | Show share link and QR code |
| `/stats?id=:quizId` | `src/pages/StatsPage.tsx` | Protected | Creator analytics page |
| `/quiz/:id` | `src/pages/QuizViewPage.tsx` | Protected in current code | Student quiz page using share id |
| `/quiz/:id/results` | `src/pages/ResultPage.tsx` | Protected in current code | Student result review |

Important note: The current router wraps `/quiz/:id` and `/quiz/:id/results` inside `ProtectedRoute`. That means public quiz links currently require login on the frontend, even though the backend routes for taking a quiz are public.

---

## 4. API Client

File: `src/services/api.ts`

Base URL:

```text
VITE_API_URL or http://localhost:5000/api
```

The helper adds `Authorization: Bearer <token>` when a token exists. It sends JSON by default, but skips `Content-Type` when the body is `FormData`.

| API object | Methods |
| --- | --- |
| `authApi` | `login`, `register`, `googleLogin`, `getConfig` |
| `uploadApi` | `uploadFile`, `uploadText` |
| `aiApi` | `generateQuiz` |
| `quizApi` | `create`, `getAll`, `getById`, `update`, `publish` |
| `attemptApi` | `getPublicQuiz`, `submit`, `getAnalytics` |

Actual frontend API paths:

| Frontend call | Backend path |
| --- | --- |
| `authApi.login` | `POST /api/auth/login` |
| `authApi.register` | `POST /api/auth/register` |
| `authApi.googleLogin` | `POST /api/auth/google` |
| `authApi.getConfig` | `GET /api/auth/config` |
| `uploadApi.uploadFile` | `POST /api/upload` |
| `uploadApi.uploadText` | `POST /api/upload` |
| `aiApi.generateQuiz` | `POST /api/ai/generate` |
| `quizApi.create` | `POST /api/quizzes` |
| `quizApi.getAll` | `GET /api/quizzes` |
| `quizApi.getById` | `GET /api/quizzes/:id` |
| `quizApi.update` | `PUT /api/quizzes/:id` |
| `quizApi.publish` | `POST /api/quizzes/:id/publish` |
| `attemptApi.getPublicQuiz` | `GET /api/attempts/quiz/:shareId` |
| `attemptApi.submit` | `POST /api/attempts/:shareId` |
| `attemptApi.getAnalytics` | `GET /api/attempts/analytics/:quizId` |

---

## 5. Main User Flows

### Creator Flow

1. User opens landing page.
2. User logs in or registers.
3. User goes to dashboard.
4. User clicks create new quiz.
5. User uploads PDF, DOCX, TXT, or pastes text.
6. Frontend uploads the source to `/api/upload`.
7. Frontend calls `/api/ai/generate` with the source document id.
8. Frontend creates a draft quiz with `/api/quizzes`.
9. User edits question text, option text and correct option.
10. User saves and moves to config.
11. User sets title, timer and passing score.
12. Frontend updates quiz and publishes it.
13. Share page displays the generated link and QR code.
14. Dashboard and stats show quiz activity.

### Student Flow

1. Student opens `/quiz/:shareId`.
2. Frontend loads public quiz data from `/api/attempts/quiz/:shareId`.
3. Student answers questions.
4. Timer auto-submits when it reaches zero, if enabled.
5. Frontend submits answers to `/api/attempts/:shareId`.
6. Result page shows score and review from navigation state.

---

## 6. Pages

| Page | File | Current behavior |
| --- | --- | --- |
| Landing | `src/pages/LandingPage.tsx` | Combines navbar, hero, feature cards, how-it-works, bottom CTA and footer |
| Auth | `src/pages/AuthPage.tsx` | Chooses login or register form based on `/login` or `/register` |
| Dashboard | `src/pages/DashboardPage.tsx` | Loads creator quizzes, shows cards, logs out by clearing token |
| Upload | `src/pages/UploadPage.tsx` | Uploads file or text, generates AI questions, creates quiz, then navigates to edit |
| Quiz Edit | `src/pages/QuizEditPage.tsx` | Loads quiz by query id, edits questions and options, saves questions |
| Quiz Config | `src/pages/QuizConfigPage.tsx` | Loads quiz settings, updates title/timer/passing score, publishes with 7-day expiry |
| Share Link | `src/pages/ShareLinkPage.tsx` | Shows header and `ShareModal` |
| Quiz View | `src/pages/QuizViewPage.tsx` | Loads quiz by share id, handles answer selection, timer and submit |
| Result | `src/pages/ResultPage.tsx` | Reads result from router state and shows review cards |
| Stats | `src/pages/StatsPage.tsx` | Loads analytics by quiz id query parameter |
| Terms | `src/pages/TermsPage.tsx` | Static terms content |
| Privacy | `src/pages/PrivacyPage.tsx` | Static privacy content |

---

## 7. Layouts and Components

| Component | File | Purpose |
| --- | --- | --- |
| `AuthLayout` | `src/layouts/AuthLayout.tsx` | Login/register screen wrapper |
| `CreaterLayout` | `src/layouts/CreaterLayout.tsx` | Quiz creation wrapper and stepper. File name is currently spelled `Creater` |
| `Navbar` | `src/components/shared/Navbar.tsx` | Landing page nav |
| `Footer` | `src/components/shared/Footer.tsx` | Footer links |
| `ThemeToggle` | `src/components/shared/ThemeToggle.tsx` | Light/dark theme switch |
| `ProtectedRoute` | `src/components/shared/ProtectedRoute.tsx` | Redirects logged-out users to login |
| `PublicRoute` | `src/components/shared/ProtectedRoute.tsx` | Redirects logged-in users away from login/register |
| `FormInput` | `src/components/shared/FormInput.tsx` | Shared input with password visibility toggle |
| `LoadingOverlay` | `src/components/shared/LoadingOverlay.tsx` | Full-screen loading message |
| `LoginForm` | `src/components/auth/LoginForm.tsx` | Email/password login |
| `RegisterForm` | `src/components/auth/RegisterForm.tsx` | Email/password registration |
| `GoogleAuthBtn` | `src/components/auth/GoogleAuthBtn.tsx` | Google Sign-In button if client id exists |
| `OptionsCard` | `src/components/quiz/OptionsCard.tsx` | Selectable answer option |
| `ReviewCard` | `src/components/quiz/ReviewCard.tsx` | Result review item |
| `ShareModal` | `src/components/quiz/ShareModal.tsx` | Share URL, copy button and QR code |
| `HeroSection` | `src/components/landing/HeroSection.tsx` | Landing hero |
| `FeatureCards` | `src/components/landing/FeatureCards.tsx` | Landing features |
| `HowItWorks` | `src/components/landing/HowItWorks.tsx` | Process section |
| `BottomCTA` | `src/components/landing/BottomCTA.tsx` | Final CTA |

---

## 8. Theme and Styling

File: `src/index.css`

The app uses CSS variables for theme colors and utility classes for shared effects. `App.tsx` reads `localStorage.theme` on mount and adds or removes the `dark` class on the document root.

Important theme variables include:

| Variable | Purpose |
| --- | --- |
| `--background` | Page background |
| `--foreground` | Main text color |
| `--primary` | Main accent color |
| `--primary-hover` | Accent hover color |
| `--card` | Card background |
| `--muted` | Muted panels |
| `--border` | Borders |

The frontend has a dark academic style with gold accents. Many page components use cards, borders, serif headings and fixed bottom action bars.

---

## 9. Current Frontend Notes

- Google Sign-In depends on `GET /api/auth/config` returning `googleClientId`.
- The server currently reads `VITE_GOOGLE_CLIENT_ID` from `server/.env` for that config response.
- `ShareModal` shows a QR code and expiry dropdown, but changing the dropdown does not update the backend after publish.
- `ShareModal` has a Download QR Code button, but no download handler is connected yet.
- `QuizEditPage` shows delete and regenerate icons, but those actions are not connected yet.
- `QuizConfigPage` contains commented-out theme selector code. The active UI currently edits timer, passing score and title.
- The result page depends on router state. Refreshing the result page shows `No results found.` because there is no result fetch endpoint used by the frontend.
- The dashboard links published quizzes to `/stats?id=:quizId` and draft quizzes to `/create/config?id=:quizId`.

---

## 10. File Comments Added

Simple comments were added to the source files to explain what each file does. They are intentionally short and plain.
