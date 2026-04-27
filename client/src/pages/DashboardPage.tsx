import { Link } from "react-router-dom";
import { BookOpen, User, Plus, Clock, MoreVertical, FileText } from "lucide-react";

export default function DashboardPage() {
  const quizzes = [
    { id: 1, title: "Modern Philosophy 101", questions: 12, date: "2 days ago", type: "Multiple Choice" },
    { id: 2, title: "Advanced Quantum Mechanics", questions: 24, date: "1 week ago", type: "Mixed" },
    { id: 3, title: "European History (14th Century)", questions: 15, date: "1 month ago", type: "Multiple Choice" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-border bg-background z-10 sticky top-0">
        <Link to="/" className="flex items-center gap-3 font-serif hover:opacity-80 transition-opacity">
          <BookOpen className="text-primary" size={28} />
          <span className="text-2xl font-bold">Quizly</span>
        </Link>

        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary cursor-pointer hover:bg-card/80 transition-colors shadow-sm">
          <Link to="/dashboard">
            <User size={18} />
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Your Quizzes</h1>
            <p className="text-muted-foreground text-sm md:text-base">View and share your AI-generated quizzes.</p>
          </div>

          <Link to="/create/upload" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.1em] px-6 py-3.5 rounded-[3px] transition-colors shadow-lg">
            <Plus size={16} strokeWidth={3} />
            Create New Quiz
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-xl p-6 flex flex-col cursor-pointer hover:shadow-[0_8px_30px_-12px_rgba(198,155,53,0.15)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110">
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="bg-muted p-3 rounded-lg border border-border text-primary">
                  <FileText size={20} />
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <h3 className="text-xl font-serif font-bold text-foreground mb-2 leading-snug">{quiz.title}</h3>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-8">{quiz.type}</p>

              <div className="flex items-center justify-between text-muted-foreground text-xs mt-auto pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="text-primary">{quiz.questions}</span>
                  <span>Questions</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <Clock size={12} />
                  <span>{quiz.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
