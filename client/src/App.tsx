import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import QuizViewPage from './pages/QuizViewPage';
import ResultsPage from './pages/ResultsPage';
import ShareLinkPage from './pages/ShareLinkPage';
import CreatorLayout from './layouts/CreatorLayout';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import QuizEditorPage from './pages/QuizEditorPage';
import QuizConfigPage from './pages/QuizConfigPage';
import StatsPage from './pages/StatsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        {/* Creator Workflow Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreatorLayout />}>
           <Route path="upload" element={<UploadPage />} />
           <Route path="edit" element={<QuizEditorPage />} />
           <Route path="config" element={<QuizConfigPage />} />
           <Route path="share" element={<ShareLinkPage />} />
        </Route>

        <Route path="/quiz/:id" element={<QuizViewPage />} />
        <Route path="/quiz/:id/results" element={<ResultsPage />} />
    
        <Route path="/stats/:id" element={<StatsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
