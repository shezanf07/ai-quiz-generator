import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-transparent bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-foreground font-serif tracking-tight cursor-pointer shrink-0">
        <BookOpen className="text-primary" size={24} />
        <span className="text-lg sm:text-2xl font-bold">Quizly</span>
      </Link>
      
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <ThemeToggle />
        <Link to="/login" className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors uppercase whitespace-nowrap">
          Log In
        </Link>
        <Link to="/register" className="bg-primary hover:bg-primary-hover text-primary-foreground text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.15em] px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-[3px] transition-colors cursor-pointer whitespace-nowrap">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
