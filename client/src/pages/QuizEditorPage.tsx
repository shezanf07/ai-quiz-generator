import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Sparkles, Check, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function QuizEditorPage() {
  const questions = [
    { id: 1, number: "01.", text: "What is the central concept of Hegel's dialectic?" },
    { id: 2, number: "02.", text: "Differentiate between 'Being-in-itself' and 'Being-...'" },
    { id: 3, number: "03.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 4, number: "04.", text: "Discuss the ethical implications of Bentham's..." },
    { id: 5, number: "05.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 6, number: "06.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 7, number: "07.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 8, number: "08.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 9, number: "09.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
    { id: 10, number: "10.", text: "The concept of the 'Eternal Recurrence' was proposed..." },
  ];

  const [activeQuestion, setActiveQuestion] = useState(1);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [questionText, setQuestionText] = useState(questions[activeQuestion - 1].text);
  const [options, setOptions] = useState([
    "The synthesis of opposing forces (Thesis, Antithesis, Synthesis)",
    "The categorical imperative of moral duty",
    "The verification principle of logical positivism",
    "The tabula rasa of empiricist thought"
  ]);

  useEffect(() => {
    setQuestionText(questions[activeQuestion - 1].text);
  }, [activeQuestion])

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const goToPrev = () => setActiveQuestion(q => Math.max(1, q - 1));
  const goToNext = () => setActiveQuestion(q => Math.min(questions.length, q + 1));

  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row relative">


      <aside className="hidden lg:flex w-[350px] bg-background border-r border-border flex-col min-h-[calc(100vh-89px)] shrink-0">
        <div className="p-8 sticky top-0 pb-44 overflow-y-auto max-h-screen scrollbar-hide">
          <h2 className="text-2xl font-serif font-bold italic text-foreground mb-10">Quiz 101</h2>

          <nav className="flex flex-col gap-2">
            {questions.map((q) => (
              <div
                key={q.id}
                onClick={() => setActiveQuestion(q.id)}
                className={`p-5 rounded-lg cursor-pointer transition-colors ${activeQuestion === q.id ? 'bg-card border-l-2 border-primary' : 'hover:bg-card border-l-2 border-transparent'}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-serif italic font-bold text-lg mt-0.5 ${activeQuestion === q.id ? 'text-primary' : 'text-muted-foreground'}`}>
                    {q.number}
                  </span>
                  <p className={`text-[13px] leading-relaxed ${activeQuestion === q.id ? 'text-foreground' : 'text-muted-foreground'}`}>{q.text}</p>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>


      <div className="lg:hidden w-full bg-background border-b border-border px-3 py-3">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2 px-1">Quiz 101</p>

        <div className="flex items-center gap-2">
          {/* Prev arrow */}
          <button
            onClick={goToPrev}
            disabled={activeQuestion === 1}
            className="shrink-0 w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:border-primary/50 hover:text-primary transition-colors"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Scrollable pill row */}
          <div className="flex-1 overflow-x-auto scrollbar-hide flex gap-2 pb-0.5">
            {questions.map((q) => {
              const isActive = activeQuestion === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestion(q.id)}
                  className={`shrink-0 flex items-center justify-center px-3 py-2 rounded-lg border transition-colors min-w-[48px] ${isActive
                    ? 'bg-card border-primary'
                    : 'border-border bg-card/50 hover:border-primary/30'
                    }`}
                >
                  <span className={`text-[11px] font-bold font-serif italic ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {q.number}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={goToNext}
            disabled={activeQuestion === questions.length}
            className="shrink-0 w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:border-primary/50 hover:text-primary transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>


      <main className="flex-1 bg-background flex flex-col items-center py-6 sm:py-10 px-4 min-h-[calc(100vh-89px)] pb-28 sm:pb-36 relative">

        <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-5 sm:p-8 md:p-12 shadow-2xl flex flex-col relative z-0 mt-4 sm:mt-8 mb-8 sm:mb-12">
          <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-6 sm:mb-10">
            Question {String(activeQuestion).padStart(2, "0")}
          </span>
          <textarea
            className="w-full bg-transparent text-lg sm:text-2xl lg:text-3xl font-serif text-foreground border-none outline-none resize-none min-h-[80px] sm:min-h-[100px] mb-6 sm:mb-8 placeholder:text-muted-foreground/50 leading-relaxed selection:bg-primary/30 focus:ring-0"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <div className="flex flex-col gap-3 sm:gap-4">
            {options.map((opt, idx) => (
              <div key={idx} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl border transition-colors ${correctIndex === idx ? 'border-[#3bb97e]/40 bg-[#3bb97e]/5' : 'border-border hover:border-primary/30 bg-background'}`}>
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${correctIndex === idx ? 'bg-[#3bb97e] shadow-[0_0_10px_rgba(59,185,126,0.3)]' : 'border border-border hover:border-primary/50'}`}
                  onClick={() => setCorrectIndex(idx)}
                >
                  {correctIndex === idx && <Check size={12} className="text-primary-foreground" strokeWidth={4} />}
                </div>
                <input
                  className={`flex-1 bg-transparent border-none text-[14px] sm:text-[15px] outline-none pt-0.5 transition-colors ${correctIndex === idx ? 'text-foreground selection:bg-[#3bb97e]/30' : 'text-muted-foreground selection:bg-primary/30 focus:text-foreground'}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 pt-5 sm:pt-6 border-t border-border flex items-center justify-between">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-[#D87070] transition-colors text-[10px] font-bold tracking-widest uppercase">
              <Trash2 size={15} /> Delete
            </button>
            <button className="text-primary hover:text-primary-hover transition-colors bg-primary/10 p-2 rounded-md">
              <Sparkles size={17} />
            </button>
          </div>
        </div>



      </main>


      <div className="fixed bottom-0 left-0 right-0 w-full px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-5 z-30 bg-background/95 backdrop-blur-md border-t border-border flex items-center justify-between gap-3">
        <div className="hidden lg:block w-[350px] shrink-0" />

        {/* Mobile: question counter */}
        <span className="lg:hidden text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] shrink-0">
          {activeQuestion} / {questions.length}
        </span>

        <Link
          to="/create/config"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold uppercase rounded-[4px] transition-all shadow-lg active:scale-95 ml-auto whitespace-nowrap
            text-[9px] tracking-[0.08em] px-4 py-2.5
            sm:text-[10px] sm:tracking-[0.12em] sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          Configure Quiz
          <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </Link>
      </div>

    </div>
  );
}
