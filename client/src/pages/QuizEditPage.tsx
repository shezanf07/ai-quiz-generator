import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Trash2, Sparkles, Check, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { quizApi } from "../services/api";


export default function QuizEditPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const quizId = searchParams.get('id');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [quiz, setQuiz] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

    useEffect(() => {
        if (quizId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizApi.getById(quizId).then((data: any) => {
                setQuiz(data);
                setQuestions(data.questions || []);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
        }
    }, [quizId]);

    const activeQuestion = questions[activeQuestionIdx] || null;

    const handleOptionChange = (optIndex: number, value: string) => {
        const updated = [...questions];
        updated[activeQuestionIdx].options[optIndex].text = value;
        setQuestions(updated);
    };

    const handleCorrectOptionChange = (optId: string) => {
        const updated = [...questions];
        updated[activeQuestionIdx].correctOptionId = optId;
        setQuestions(updated);
    };

    const handleTextChange = (value: string) => {
        const updated = [...questions];
        updated[activeQuestionIdx].questionText = value;
        setQuestions(updated);
    };

    const goToPrev = () => setActiveQuestionIdx(q => Math.max(0, q - 1));
    const goToNext = () => setActiveQuestionIdx(q => Math.min(questions.length - 1, q + 1));

    const handleSaveAndConfigure = async () => {
        if (!quizId) return;
        setSaving(true);
        try {
            await quizApi.update(quizId, { questions });
            navigate(`/create/config?id=${quizId}`);
        } catch (err) {
            console.error(err);
            setSaving(false);
        }
    };

    if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    if (!quiz) return <div className="flex-1 flex items-center justify-center">Quiz not found</div>;


    return (
        <div className="flex-1 w-full flex flex-col lg:flex-row relative">


            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden lg:flex w-87.5 bg-background border-r border-border flex-col min-h-[calc(100vh-89px)] shrink-0">
                <div className="p-8 sticky top-0 pb-44 overflow-y-auto max-h-screen scrollbar-hide">
                    <h2 className="text-2xl font-serif font-bold italic text-foreground mb-10">Quiz 101</h2>

                    <nav className="flex flex-col gap-2">
                        {questions.map((q, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveQuestionIdx(idx)}
                                className={`p-5 rounded-lg cursor-pointer transition-colors ${activeQuestionIdx === idx ? 'bg-card border-l-2 border-primary' : 'hover:bg-card border-l-2 border-transparent'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <span className={`font-serif italic font-bold text-lg mt-0.5 ${activeQuestionIdx === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {String(idx + 1).padStart(2, "0")}.
                                    </span>
                                    <p className={`text-[13px] leading-relaxed line-clamp-2 ${activeQuestionIdx === idx ? 'text-foreground' : 'text-muted-foreground'}`}>{q.questionText}</p>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>



            {/* ── MOBILE QUESTION NAVIGATOR ── */}
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
                        {questions.map((_, idx) => {
                            const isActive = activeQuestionIdx === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveQuestionIdx(idx)}
                                    className={`shrink-0 flex items-center justify-center px-3 py-2 rounded-lg border transition-colors min-w-12 ${isActive
                                        ? 'bg-card border-primary'
                                        : 'border-border bg-card/50 hover:border-primary/30'
                                        }`}
                                >
                                    <span className={`text-[11px] font-bold font-serif italic ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {String(idx + 1).padStart(2, "0")}.
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Next arrow */}
                    <button
                        onClick={goToNext}
                        disabled={activeQuestionIdx === questions.length - 1}
                        className="shrink-0 w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>


            {/* ── MAIN EDITOR ── */}
            <main className="flex-1 bg-background flex flex-col items-center py-6 sm:py-10 px-4 min-h-[calc(100vh-89px)] pb-28 sm:pb-36 relative">
                {activeQuestion && (
                    <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-5 sm:p-8 md:p-12 shadow-2xl flex flex-col relative z-0 mt-4 sm:mt-8 mb-8 sm:mb-12">
                        <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-6 sm:mb-10">
                            Question {String(activeQuestionIdx + 1).padStart(2, "0")}
                        </span>
                        <textarea
                            className="w-full bg-transparent text-lg sm:text-2xl lg:text-3xl font-serif text-foreground border-none outline-none resize-none min-h-20 sm:min-h-25 mb-6 sm:mb-8 placeholder:text-muted-foreground/50 leading-relaxed selection:bg-primary/30 focus:ring-0"
                            value={activeQuestion.questionText}
                            onChange={(e) => handleTextChange(e.target.value)}
                        />

                        <div className="flex flex-col gap-3 sm:gap-4">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {activeQuestion.options.map((opt: any, idx: number) => {
                                const isCorrect = activeQuestion.correctOptionId === opt.id;
                                return (
                                    <div key={opt.id} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl border transition-colors ${isCorrect ? 'border-[#3bb97e]/40 bg-[#3bb97e]/5' : 'border-border hover:border-primary/30 bg-background'}`}>
                                        <div
                                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors ${isCorrect ? 'bg-[#3bb97e] shadow-[0_0_10px_rgba(59,185,126,0.3)]' : 'border border-border hover:border-primary/50'}`}
                                            onClick={() => handleCorrectOptionChange(opt.id)}
                                        >
                                            {isCorrect && <Check size={12} className="text-background" strokeWidth={4} />}
                                        </div>
                                        <input
                                            className={`flex-1 bg-transparent border-none text-[14px] sm:text-[15px] outline-none pt-0.5 transition-colors ${isCorrect ? 'text-foreground selection:bg-[#3bb97e]/30' : 'text-muted-foreground selection:bg-primary/30 focus:text-foreground'}`}
                                            value={opt.text}
                                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                                        />
                                    </div>
                                )
                            })}
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
                )}

            </main>




      <div className="fixed bottom-0 left-0 right-0 w-full px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-5 z-30 bg-background/95 backdrop-blur-md border-t border-border flex items-center justify-between gap-3">
        <div className="hidden lg:block w-87.5 shrink-0" />

        <span className="lg:hidden text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">
          {activeQuestionIdx + 1} / {questions.length}
        </span>

        <button
          onClick={handleSaveAndConfigure}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary text-background font-bold uppercase rounded-sm transition-all shadow-lg active:scale-95 ml-auto whitespace-nowrap
            text-[9px] tracking-[0.08em] px-4 py-2.5 disabled:opacity-50
            sm:text-[10px] sm:tracking-[0.12em] sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          {saving ? "Saving..." : "Configure Quiz"}
          <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>


        </div>
    )
}