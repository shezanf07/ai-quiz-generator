// Student quiz page. It loads the public quiz and submits answers.
import { useState, useEffect, useRef } from "react";
import { BookOpen, Timer, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OptionsCard from "../components/quiz/OptionsCard";
import { attemptApi } from "../services/api";
import LoadingOverlay from "../components/shared/LoadingOverlay";

export default function QuizViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    // Timer State
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    // Track the exact start time of the quiz taker session
    const startTimeRef = useRef<number>(Date.now());

    // Keep answers state in ref to prevent closure capture in timer effect
    const answersRef = useRef(answers);
    useEffect(() => {
        answersRef.current = answers;
    }, [answers]);

    useEffect(() => {
        if (id) {
            // The route id is the public share id.
            attemptApi.getPublicQuiz(id)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((data: any) => {
                    setQuiz(data);
                    setLoading(false);
                    // reset start time when quiz is loaded and student begins
                    startTimeRef.current = Date.now();
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err: any) => {
                    setErrorMsg(err.message || "Failed to load quiz");
                    setLoading(false);
                });
        }
    }, [id]);

    useEffect(() => {
        if (quiz) {
            // Timer starts only after quiz data is loaded.
            if (quiz.settings?.timerEnabled) {
                const duration = (quiz.settings.durationMinutes || 15) * 60;
                setTimeLeft(duration);
            } else {
                setTimeLeft(null);
            }
        }
    }, [quiz]);

    const submitQuiz = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            // Calculate total time taken in seconds.
            const totalTimeTakenSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));

            // Convert local answer map into the backend submit format.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payload = quiz.questions.map((q: any) => ({
                questionId: q._id,
                selectedOptionId: answersRef.current[q._id] || null,
                timeTakenSeconds: 0
            }));

            const studentName = localStorage.getItem('user_name') || 'Student';

            const result = await attemptApi.submit(id!, {
                participant: { name: studentName },
                answers: payload,
                timeTakenSeconds: totalTimeTakenSeconds
            });
            navigate(`/quiz/${id}/results`, { state: { result } });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.message || "Failed to submit quiz");
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft <= 0) {
            // Auto-submit when timer finishes.
            submitQuiz();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => (prev !== null ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleNext = () => {
        if (!quiz) return;

        if (currentQIdx < quiz.questions.length - 1) {
            setCurrentQIdx(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const handlePrev = () => {
        setCurrentQIdx(prev => Math.max(0, prev - 1));
    };

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    if (loading) return <div className="flex-1 flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    if (errorMsg || !quiz) return <div className="flex-1 flex items-center justify-center min-h-screen text-red-400">{errorMsg || "Quiz not found"}</div>;

    const currentQuestion = quiz.questions[currentQIdx];
    const selectedOption = answers[currentQuestion._id];

    return (

        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
            <LoadingOverlay active={submitting} type="submit" message="Grading your quiz attempt..." />

            <header className="w-full px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-background z-10 sticky top-0">

                <Link
                    to="/"
                    className="flex items-center gap-2 font-serif hover:opacity-80 transition-opacity shrink-0"
                >
                    <BookOpen className="text-primary" size={22} />
                    <span className="text-lg sm:text-2xl font-bold">QuizlyAI</span>
                </Link>

                <div className="flex flex-col items-center order-3 sm:order-2 w-full sm:w-auto">
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.12em] sm:tracking-[0.15em] mb-1.5">
                        Question {currentQIdx + 1} of {quiz.questions.length}
                    </span>

                    <div className="w-20 sm:w-24 h-0.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentQIdx + 1) / quiz.questions.length) * 100}%` }} />
                    </div>
                </div>

                {timeLeft !== null && (
                    <div className="flex items-center gap-1.5 text-primary font-bold tracking-wider order-2 sm:order-3 shrink-0">
                        <Timer size={16} />
                        <span className="text-xs sm:text-sm">{formatTime(timeLeft)}</span>
                    </div>
                )}

            </header>


            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 flex flex-col">

                <div className="bg-card border border-border rounded-xl p-8 md:p-14 shadow-2xl flex flex-col gap-12 w-full">
                    <h2 className="text-3xl md:text-5xl font-serif leading-[1.3] text-foreground">
                        {currentQuestion.questionText}
                    </h2>





                    <div className="flex flex-col gap-4">

                        {/* Answer options */}
                        {currentQuestion.options.map((opt: any, idx: number) => {
                            const letter = String.fromCharCode(65 + idx);
                            return (
                                <OptionsCard
                                    key={opt.id}
                                    letter={letter}
                                    text={opt.text}
                                    isSelected={selectedOption === opt.id}
                                    onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion._id]: opt.id }))}
                                />
                            )
                        })}

                    </div>

                </div>

            </main>



            <footer className="w-full px-6 md:px-12 py-6 flex items-center justify-between bg-muted border-t border-border">

                <button
                    onClick={handlePrev}
                    disabled={currentQIdx === 0}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold uppercase tracking-[0.15em] disabled:opacity-30">
                    <ArrowLeft size={16} />
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={submitting}
                    className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-background text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-3.5 rounded-[3px] transition-colors shadow-lg disabled:opacity-50">
                    {submitting ? "Submitting..." : currentQIdx === quiz.questions.length - 1 ? "Submit Quiz" : "Next Question"}
                    <ArrowRight size={16} />
                </button>

            </footer>




        </div>

    );
}
