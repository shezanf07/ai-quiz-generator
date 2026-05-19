import { Link, useLocation, useParams } from "react-router-dom";
import { BookOpen, Check, X } from "lucide-react";
import ReviewCard from "../components/quiz/ReviewCard";

export default function ResultsPage() {
    const { id } = useParams();
    const location = useLocation();
    const result = location.state?.result;

    if (!result) {
        return <div className="flex justify-center mt-20">No results found.</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviews = result.results.map((r: any, index: number) => ({
        number: String(index + 1).padStart(2, "0"),
        question: r.questionText,
        selectedOption: r.selectedOptionText || "No answer",
        isCorrect: r.isCorrect,
        correctOption: r.correctOptionText
    }));

    const passOffset = 477 - (477 * (result.percentage / 100));

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
                <div className="flex flex-col items-center justify-center pt-8 pb-16 border-b border-border">
                    <div className="relative flex items-center justify-center w-40 h-40 mb-10">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="76" stroke="var(--border)" strokeWidth="4" fill="transparent" />
                            {/* 82% of 477 (2 * pi * 76) = ~391 */}
                            <circle cx="80" cy="80" r="76" stroke="var(--primary)" strokeWidth="4" fill="transparent" strokeDasharray="477" strokeDashoffset={passOffset} className="transition-all duration-1000 ease-out" />
                        </svg>
                        <span className="absolute text-5xl font-serif font-bold tracking-tighter">{Math.round(result.percentage)}%</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-serif font-bold italic mb-6">{result.passed ? "Great job!" : "Keep trying!"}</h1>
                    <p className="text-muted-foreground text-[15px] mb-8">You answered {result.score} of {reviews.length} questions correctly.</p>

                    <div className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {result.passed ? <Check size={14} className="text-muted-foreground" /> : <X size={14} className="text-muted-foreground" />}
                        {result.passed ? "Passed" : "Failed"}
                    </div>
                </div>




                {/* Review List */}
                <div className="pt-12 pb-24 flex flex-col gap-8">
                    <div className="flex items-end justify-between mb-2">
                        <h2 className="text-3xl font-serif">Review</h2>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{reviews.length} Questions</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        {reviews.map((r: any) => (
                            <ReviewCard key={r.number} {...r} />
                        ))}
                    </div>
                </div>




                {/* Footer Actions */}
                <div className="w-full py-12 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-border">
                    <Link to={`/quiz/${id}`} className="bg-primary hover:bg-primary-hover text-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-12 py-4 rounded-[3px] transition-colors shadow-lg text-center w-full sm:w-auto">
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
