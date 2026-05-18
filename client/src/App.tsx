import AuthPage from "./pages/AuthPage"
import LandingPage from "./pages/LandingPage"
import { Routes, Route } from "react-router-dom"
import QuizViewPage from "./pages/QuizViewPage"
import ResultPage from "./pages/ResultPage"
import ShareLinkPage from "./pages/ShareLinkPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import StatsPage from "./pages/StatsPage"
import DashboardPage from "./pages/DashboardPage"
import QuizConfigPage from "./pages/QuizConfigPage"
import QuizEditPage from "./pages/QuizEditPage"
import CreaterLayout from "./layouts/CreaterLayout"
import UploadPage from "./pages/UploadPage"
import { useEffect } from "react"
import { ProtectedRoute, PublicRoute } from './components/shared/ProtectedRoute';



function App() {


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />


        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Route>


        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreaterLayout />}>
            <Route path="upload" element={<UploadPage />} />
            <Route path="edit" element={<QuizEditPage />} />
            <Route path="config" element={<QuizConfigPage />} />
            <Route path="share" element={<ShareLinkPage />} />
          </Route>
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/quiz/:id" element={<QuizViewPage />} />
          <Route path="/quiz/:id/results" element={<ResultPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
