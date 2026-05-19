// Dashboard page. Creators can see their quizzes and start a new one.
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, User, Plus, Clock, FileText, Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { quizApi, removeAuthToken } from "../services/api";
import LoadingOverlay from "../components/shared/LoadingOverlay";

export default function DashboardPage() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);


    useEffect(() => {
        // Load dashboard cards for the logged-in creator.
        quizApi.getAll()

            .then((data: any) => {
                setQuizzes(data);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        // Show a short overlay so logout feels intentional.
        setLoggingOut(true);
        setTimeout(() => {
            removeAuthToken();
            setLoggingOut(false);
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

            <LoadingOverlay active={loggingOut} message="Signing out..." submessage="Clearing your secure credentials..." />

            <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-border bg-background z-10 sticky top-0">
                <Link to="/" className="flex items-center gap-3 font-serif hover:opacity-80 transition-opacity">
                    <BookOpen className="text-primary" size={28} />
                    <span className="text-2xl font-bold">QuizlyAI</span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary cursor-pointer hover:bg-card/80 transition-colors shadow-sm">
                        <User size={18} />
                    </div>
                    <button onClick={handleLogout} className="text-muted-foreground hover:text-[#D87070] transition-colors p-2">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>


            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">


                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Your Quizzes</h1>
                        <p className="text-muted-foreground text-sm md:text-base">Manage and distribute your generated quiz collections.</p>
                    </div>

                    <Link to="/create/upload" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-background text-[11px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-[3px] transition-colors shadow-lg">
                        <Plus size={16} strokeWidth={3} />
                        Create New Quiz
                    </Link>
                </div>



                {/* Empty state when creator has no saved quizzes yet */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : quizzes.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-xl">
                        <p className="text-muted-foreground mb-4">
                            You haven't created any quizzes yet.
                        </p>

                        <Link
                            to="/create/upload"
                            className="text-primary hover:underline text-sm font-bold tracking-wider uppercase"
                        >
                            Create Your First Quiz
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <Link
                                to={
                                    quiz.status === 'published'
                                        ? `/stats?id=${quiz.id}`
                                        : `/create/config?id=${quiz.id}`
                                }
                                key={quiz.id}
                                className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-xl p-6 flex flex-col cursor-pointer hover:shadow-[0_8px_30px_-12px_rgba(198,155,53,0.15)] overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110">
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-muted p-3 rounded-lg border border-border text-primary">
                                        <FileText size={20} />
                                    </div>

                                    {quiz.status === 'published' && (
                                        <span className="text-[10px] bg-[#3bb97e]/10 text-[#3bb97e] font-bold uppercase tracking-widest px-2 py-1 rounded">
                                            Published
                                        </span>
                                    )}

                                    {quiz.status === 'draft' && (
                                        <span className="text-[10px] bg-primary/10 text-primary font-bold uppercase tracking-widest px-2 py-1 rounded">
                                            Draft
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-serif font-bold text-foreground mb-2 leading-snug">
                                    {quiz.title}
                                </h3>

                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-8">
                                    {quiz.type}
                                </p>

                                <div className="flex items-center justify-between text-muted-foreground text-xs mt-auto pt-4 border-t border-border">
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <span className="text-primary">
                                            {quiz.questionsCount}
                                        </span>

                                        <span>Questions</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 opacity-60">
                                        <Clock size={12} />

                                        <span>
                                            {new Date(quiz.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </main>


        </div>


    )
}
