import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full h-24 px-6 md:px-12 flex items-center justify-between border-b border-transparent bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-foreground font-serif tracking-tight cursor-pointer">
        <BookOpen className="text-primary" size={28} />
        <span className="text-2xl font-bold">Quizly</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Link to="/login" className="text-[11px] font-bold tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors uppercase">
          Log In
        </Link>
        <Link to="/register" className="bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-3 rounded-[3px] transition-colors cursor-pointer">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
