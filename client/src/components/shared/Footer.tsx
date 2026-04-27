import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 py-10 bg-background mt-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-2 items-center md:items-start">
        <div className="flex items-center gap-2 text-foreground font-serif tracking-tight">
          <span className="text-xl font-bold">Quizly</span>
        </div>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.1em]">
          © 2024 QUIZLY. THE DIGITAL SCRIBE.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.1em]">
        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
      </div>
    </footer>
  );
}
