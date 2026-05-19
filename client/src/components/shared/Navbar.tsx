// Landing navbar. It holds the brand, theme toggle and auth links.
import { BookOpen, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { getAuthToken, removeAuthToken } from "../../services/api";
import LoadingOverlay from "./LoadingOverlay";

export default function Navbar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Navbar reads token once when it mounts.
  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const handleLogout = () => {
    // Logout is local only: clear token and return home.
    setLoggingOut(true);
    setTimeout(() => {
      removeAuthToken();
      setIsLoggedIn(false);
      setLoggingOut(false);
      navigate("/");
    }, 1500);
  };


  return (
    <nav className="w-full h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-transparent bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <LoadingOverlay active={loggingOut} message="Signing out..." submessage="Clearing your secure credentials..." />
      <Link to="/" className="flex items-center gap-2 text-foreground font-serif tracking-tight cursor-pointer shrink-0">
        <BookOpen className="text-primary" size={24} />
        <span className="text-lg sm:text-2xl font-bold">QuizlyAI</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <ThemeToggle />
        {isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border bg-card text-primary cursor-pointer hover:bg-card/80 transition-colors shadow-sm"
              title="Go to Dashboard"
            >
              <User size={16} />
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-muted-foreground hover:text-[#D87070] transition-colors p-2"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors uppercase whitespace-nowrap">
              Log In
            </Link>
            <Link to="/register" className="bg-primary hover:bg-primary-hover text-primary-foreground text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.15em] px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-[3px] transition-colors cursor-pointer whitespace-nowrap">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
