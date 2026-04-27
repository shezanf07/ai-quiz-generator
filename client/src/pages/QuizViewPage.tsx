import { useState } from "react";
import { BookOpen, Timer, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import OptionCard from "../components/quiz/OptionCard";

export default function QuizViewPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>("A");

  const options = [
    { letter: "A", text: "The Form of the Good" },
    { letter: "B", text: "The physical light of the visible world" },
    { letter: "C", text: "The source of human shadow perceptions" },
    { letter: "D", text: "The philosopher's return to the cave" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      {/* Top Navigation */}
      <header className="w-full px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-background z-10 sticky top-0">

        <Link
          to="/"
          className="flex items-center gap-2 font-serif hover:opacity-80 transition-opacity shrink-0"
        >
          <BookOpen className="text-primary" size={22} />
          <span className="text-lg sm:text-2xl font-bold">Quizly</span>
        </Link>

        <div className="flex flex-col items-center order-3 sm:order-2 w-full sm:w-auto">
          <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.12em] sm:tracking-[0.15em] mb-1.5">
            Question 5 of 12
          </span>

          <div className="w-20 sm:w-24 h-[2px] bg-border rounded-full overflow-hidden">
            <div className="w-5/12 h-full bg-primary" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-primary font-bold tracking-wider order-2 sm:order-3 shrink-0">
          <Timer size={16} />
          <span className="text-xs sm:text-sm">00:45:00</span>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 flex flex-col">

        <div className="bg-card border border-border rounded-xl p-8 md:p-14 shadow-2xl flex flex-col gap-12 w-full">

          <h2 className="text-3xl md:text-5xl font-serif leading-[1.3] text-foreground">
            <span className="italic font-medium">
              In Plato's Allegory of the Cave,
            </span>{" "}
            what does the sun represent in the realm of the intelligible?
          </h2>

          <div className="flex flex-col gap-4">

            {options.map((opt) => (
              <OptionCard
                key={opt.letter}
                letter={opt.letter}
                text={opt.text}
                isSelected={selectedOption === opt.letter}
                onClick={() => setSelectedOption(opt.letter)}
              />
            ))}

          </div>

        </div>

      </main>

      {/* Bottom Action Bar */}
      <footer className="w-full px-6 md:px-12 py-6 flex items-center justify-between bg-[var(--muted)] border-t border-border">

        <button className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold uppercase tracking-[0.15em]">
          <ArrowLeft size={16} />
          Previous
        </button>

        <button className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-3.5 rounded-[3px] transition-colors shadow-lg">
          Next Question
          <ArrowRight size={16} />
        </button>

      </footer>

    </div>
  );
}