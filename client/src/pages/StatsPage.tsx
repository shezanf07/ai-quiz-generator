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
    <div className="min-h-screen bg-[#0D1511] text-[#F2EBD9] flex flex-col font-sans">
      <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-[#1f3329] bg-[#0D1511]">
        <Link to="/dashboard" className="flex items-center gap-2 text-[#8A9C94] hover:text-[#F2EBD9] transition-colors text-[10px] font-bold uppercase tracking-widest">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div>
           <h1 className="text-4xl md:text-5xl font-serif text-[#F2EBD9] mb-4">Quiz <span className="italic text-[#C69B35]">Statistics</span></h1>
           <p className="text-[#8A9C94] text-sm md:text-base">Modern Philosophy 101</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-[#111C16] border border-[#1f3329] p-6 rounded-xl flex items-center gap-6 shadow-sm hover:border-[#1f3329]/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#1A2A22] text-[#8A9C94] flex items-center justify-center border border-[#1f3329]">
                 <Users size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-[#8A9C94] uppercase tracking-widest mb-1">Total Submissions</p>
                 <p className="text-3xl font-serif text-[#F2EBD9]">124</p>
              </div>
           </div>
           
           <div className="bg-[#111C16] border border-[#1f3329] p-6 rounded-xl flex items-center gap-6 shadow-sm hover:border-[#1f3329]/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#3bb97e]/10 text-[#3bb97e] flex items-center justify-center border border-[#3bb97e]/20">
                 <CheckCircle size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-[#8A9C94] uppercase tracking-widest mb-1">Pass Rate</p>
                 <p className="text-3xl font-serif text-[#F2EBD9]">78%</p>
              </div>
           </div>

           <div className="bg-[#111C16] border border-[#C69B35]/30 p-6 rounded-xl flex items-center gap-6 shadow-[0_0_15px_rgba(198,155,53,0.1)]">
              <div className="w-12 h-12 rounded-full bg-[#C69B35]/10 text-[#C69B35] flex items-center justify-center border border-[#C69B35]/20">
                 <BarChart size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-[#C69B35] uppercase tracking-widest mb-1">Avg Score</p>
                 <p className="text-3xl font-serif text-[#F2EBD9]">84%</p>
              </div>
           </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-[#111C16] border border-[#1f3329] rounded-xl overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-[#1f3329]">
             <h3 className="text-xl font-serif text-[#F2EBD9]">Recent Submissions</h3>
           </div>
           
           <div className="w-full overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-[#15221c] text-[#8A9C94] text-[10px] uppercase font-bold tracking-widest">
                   <th className="p-5 border-b border-[#1f3329]">Student Name</th>
                   <th className="p-5 border-b border-[#1f3329]">Score</th>
                   <th className="p-5 border-b border-[#1f3329]">Time Taken</th>
                   <th className="p-5 border-b border-[#1f3329]">Status</th>
                   <th className="p-5 border-b border-[#1f3329]">Date</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {recentSubmissions.map((sub, idx) => (
                   <tr key={idx} className="border-b border-[#1f3329]/50 hover:bg-[#15221c] transition-colors">
                     <td className="p-5 text-[#F2EBD9] font-medium">{sub.name}</td>
                     <td className="p-5 text-[#C69B35] font-serif font-bold text-lg">{sub.score}</td>
                     <td className="p-5 text-[#8A9C94]">{sub.time}</td>
                     <td className="p-5">
                        <span className={`px-2 py-1 rounded-[3px] text-[9px] font-bold tracking-[0.1em] uppercase ${
                          sub.status === 'Passed' ? 'bg-[#3bb97e]/10 text-[#3bb97e] border border-[#3bb97e]/20' : 'bg-[#e57a7a]/10 text-[#e57a7a] border border-[#e57a7a]/20'
                        }`}>
                          {sub.status}
                        </span>
                     </td>
                     <td className="p-5 text-[#8A9C94] text-xs">{sub.date}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="p-5 border-t border-[#1f3329] bg-[#0a100d] flex justify-center">
              <button className="text-[#8A9C94] hover:text-[#F2EBD9] transition-colors text-[10px] font-bold uppercase tracking-widest">
                 Load More Results
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
