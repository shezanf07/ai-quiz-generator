import { ArrowLeft, Users, CheckCircle, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsPage() {
  const recentSubmissions = [
    { name: "Alice Johnson", score: "92%", time: "12m 45s", status: "Passed", date: "Today, 10:23 AM" },
    { name: "Bob Smith", score: "65%", time: "14m 10s", status: "Failed", date: "Today, 09:15 AM" },
    { name: "Charlie Davis", score: "88%", time: "11m 30s", status: "Passed", date: "Yesterday, 04:45 PM" },
    { name: "Diana Prince", score: "100%", time: "08m 20s", status: "Passed", date: "Yesterday, 02:10 PM" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-border bg-background">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[10px] font-bold uppercase tracking-widest">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Quiz <span className="italic text-primary">Statistics</span></h1>
          <p className="text-muted-foreground text-sm md:text-base">Modern Philosophy 101</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-6 shadow-sm hover:border-border/80 transition-colors">
            <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Submissions</p>
              <p className="text-3xl font-serif text-foreground">124</p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-6 shadow-sm hover:border-border/80 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#3bb97e]/10 text-[#3bb97e] flex items-center justify-center border border-[#3bb97e]/20">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Pass Rate</p>
              <p className="text-3xl font-serif text-foreground">78%</p>
            </div>
          </div>

          <div className="bg-card border border-primary/30 p-6 rounded-xl flex items-center gap-6 shadow-[0_0_15px_rgba(198,155,53,0.1)]">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <BarChart size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Avg Score</p>
              <p className="text-3xl font-serif text-foreground">84%</p>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-serif text-foreground">Recent Submissions</h3>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                  <th className="p-5 border-b border-border">Student Name</th>
                  <th className="p-5 border-b border-border">Score</th>
                  <th className="p-5 border-b border-border">Time Taken</th>
                  <th className="p-5 border-b border-border">Status</th>
                  <th className="p-5 border-b border-border">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentSubmissions.map((sub, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted transition-colors">
                    <td className="p-5 text-foreground font-medium">{sub.name}</td>
                    <td className="p-5 text-primary font-serif font-bold text-lg">{sub.score}</td>
                    <td className="p-5 text-muted-foreground">{sub.time}</td>
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded-[3px] text-[9px] font-bold tracking-[0.1em] uppercase ${sub.status === 'Passed' ? 'bg-[#3bb97e]/10 text-[#3bb97e] border border-[#3bb97e]/20' : 'bg-[#e57a7a]/10 text-[#e57a7a] border border-[#e57a7a]/20'
                        }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-5 text-muted-foreground text-xs">{sub.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 border-t border-border bg-background flex justify-center">
            <button className="text-muted-foreground hover:text-foreground transition-colors text-[10px] font-bold uppercase tracking-widest">
              Load More Results
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
