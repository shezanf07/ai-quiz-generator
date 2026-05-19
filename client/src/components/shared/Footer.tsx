// Footer component for the landing and policy pages.
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        // Shared footer stays simple because it appears on public pages.
        <footer className="w-full px-6 md:px-12 py-10 bg-background mt-auto flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand and copyright */}
      <div className="flex flex-col gap-2 items-center md:items-start">
        <div className="flex items-center gap-2 text-foreground font-serif tracking-tight">
          <span className="text-xl font-bold">QuizlyAI</span>
        </div>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          © 2026 QUIZLYAI. THE DIGITAL SCRIBE.
        </p>
      </div>

      {/* Footer navigation */}
      <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
      </div>
    </footer>
    );
}
