import { Link } from "react-router-dom";
import { BookOpen, Check } from "lucide-react";
import ReviewCard from "../components/quiz/ReviewCard";

export default function ResultsPage() {
  const reviews = [
    {
      number: "01",
      question: "Which ink type was most prevalent in the production of 14th-century liturgical manuscripts?",
      selectedOption: "Iron Gall Ink",
      isCorrect: true,
    },
    {
      number: "02",
      question: "The term \"rubrication\" refers to the practice of adding text in which specific color?",
      selectedOption: "Azure Blue",
      isCorrect: false,
      correctOption: "Vermillion Red"
    },
    {
      number: "03",
      question: "Which tool was traditionally used by scribes to maintain consistent line spacing on vellum?",
      selectedOption: "Pricking and Ruling Awl",
      isCorrect: true,
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="w-full px-6 md:px-12 py-6 flex flex-col items-start bg-background">
        <Link to="/" className="flex items-center gap-3 font-serif hover:opacity-80 transition-opacity">
          <BookOpen className="text-foreground" size={24} opacity={0.7} />
          <span className="text-xl font-bold italic text-foreground opacity-80">Quizly</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 flex flex-col">
        {/* Score Ring Header */}
        <div className="flex flex-col items-center justify-center pt-8 pb-16 border-b border-border">
          <div className="relative flex items-center justify-center w-40 h-40 mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="76" stroke="var(--border)" strokeWidth="4" fill="transparent" />
              {/* 82% of 477 (2 * pi * 76) = ~391 */}
              <circle cx="80" cy="80" r="76" stroke="var(--primary)" strokeWidth="4" fill="transparent" strokeDasharray="477" strokeDashoffset="86" className="transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute text-5xl font-serif font-bold tracking-tighter">82%</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold italic mb-6">Great job!</h1>
          <p className="text-muted-foreground text-[15px] mb-8">You answered 10 of 12 questions correctly.</p>

          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Check size={14} className="text-muted-foreground" />
            Passed
          </div>
        </div>

        {/* Review List */}
        <div className="pt-12 pb-24 flex flex-col gap-8">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-3xl font-serif">Review</h2>
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">12 Questions</span>
          </div>

          <div className="flex flex-col gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.number} {...r} />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="w-full py-12 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-border">
          <Link to="/quiz/1" className="bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-12 py-4 rounded-[3px] transition-colors shadow-lg text-center w-full sm:w-auto">
            Retake Quiz
          </Link>
          <Link to="/" className="text-primary hover:text-foreground text-[11px] font-bold uppercase tracking-[0.15em] transition-colors text-center w-full sm:w-auto">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
