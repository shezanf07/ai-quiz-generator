import { Link } from "react-router-dom";
import { Plus, Trash2, Sparkles, Check } from "lucide-react";

export default function QuizEditorPage() {
  const questions = [
    { id: 1, number: "01.", text: "What is the central concept of Hegel's dialectic?", status: "COMPLETED", statusColor: "text-[#8A9C94]", dotColor: "bg-[#3bb97e]" },
    { id: 2, number: "02.", text: "Differentiate between 'Being-in-itself' and 'Being-...", status: "NEEDS REVIEW", statusColor: "text-[#C69B35]", dotColor: "bg-[#C69B35]" },
    { id: 3, number: "03.", text: "The concept of the 'Eternal Recurrence' was proposed...", status: "COMPLETED", statusColor: "text-[#8A9C94]", dotColor: "bg-[#3bb97e]" },
    { id: 4, number: "04.", text: "Discuss the ethical implications of Bentham's...", status: "DRAFT", statusColor: "text-[#D87070]", dotColor: "bg-[#8A9C94]" },
  ];

  return (
    <div className="flex-1 w-full flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-[350px] bg-[#0D1511] border-r border-[#1f3329] flex-col h-[calc(100vh-89px)] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold italic text-[#F2EBD9] mb-10">Modern Philosophy 101</h2>
          
          <nav className="flex flex-col gap-2">
            {questions.map((q) => (
              <div key={q.id} className={`p-5 rounded-lg cursor-pointer transition-colors ${q.id === 1 ? 'bg-[#111C16] border-l-2 border-[#C69B35]' : 'hover:bg-[#111C16] border-l-2 border-transparent'}`}>
                <div className="flex items-start gap-4">
                  <span className={`font-serif italic font-bold text-lg mt-0.5 ${q.id === 1 ? 'text-[#C69B35]' : 'text-[#8A9C94]'}`}>
                    {q.number}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className={`text-[13px] leading-relaxed ${q.id === 1 ? 'text-[#F2EBD9]' : 'text-[#8A9C94]'}`}>{q.text}</p>
                    <div className={`flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase ${q.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${q.dotColor} ${q.id === 1 && 'shadow-[0_0_5px_#3bb97e]'}`} />
                      {q.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 flex flex-col gap-3 border-t border-[#1f3329] bg-[#0D1511] sticky bottom-0">
          <button className="flex items-center gap-2 justify-center w-full py-3 border border-[#1f3329] rounded-md text-[#8A9C94] hover:border-[#1f3329]/80 transition-colors text-[10px] font-bold tracking-widest uppercase hover:bg-[#111C16]">
            <Plus size={14} />
            Add Question
          </button>
          <button className="flex items-center gap-2 justify-center w-full py-3 bg-[#111C16] border border-[#1f3329] rounded-md text-[#8A9C94] hover:text-[#F2EBD9] transition-colors text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A2A22]">
            <Sparkles size={14} />
            Regenerate All
          </button>
        </div>
      </aside>

      {/* Main Editor */}
      <main className="flex-1 bg-[#0a100d] flex flex-col items-center py-8 px-4 overflow-y-auto min-h-[calc(100vh-89px)] pb-36 relative">
        
        {/* Toggle Nav */}
        <div className="w-full max-w-4xl flex items-center mb-8 gap-1 p-1 bg-[#111C16] border border-[#1f3329] rounded-lg w-fit mr-auto ml-2 lg:ml-12">
           <button className="px-8 py-2.5 bg-[#1A1515] border border-[#2A1E1E] text-[#F2EBD9] text-[10px] uppercase tracking-widest font-bold rounded-md shadow-sm">Edit</button>
           <button className="px-8 py-2.5 text-[#8A9C94] text-[10px] uppercase tracking-widest font-bold rounded-md hover:text-[#F2EBD9] transition-colors">Preview</button>
        </div>

        <div className="w-full max-w-3xl bg-[#111C16] border border-[#1f3329] rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col relative z-0">
          <span className="text-[#C69B35] text-[11px] font-bold tracking-[0.2em] uppercase mb-10">Question 01</span>
          
          <textarea 
            className="w-full bg-transparent text-xl md:text-2xl lg:text-3xl font-serif text-[#F2EBD9] border-none outline-none resize-none min-h-[100px] mb-8 placeholder:text-[#8A9C94]/50 leading-relaxed selection:bg-[#C69B35]/30 focus:ring-0"
             defaultValue="What is the central concept of Hegel's dialectic?"
          />

          <div className="flex flex-col gap-4">
            {/* Correct Option */}
            <div className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-[#3bb97e]/40 bg-[#3bb97e]/5 shadow-[0_0_30px_rgba(59,185,126,0.03)]">
              <div className="w-6 h-6 rounded-full bg-[#3bb97e] flex items-center justify-center flex-shrink-0 cursor-pointer shadow-[0_0_10px_rgba(59,185,126,0.3)]">
                <Check size={14} className="text-[#0D1511]" strokeWidth={3} />
              </div>
              <input 
                 className="flex-1 bg-transparent border-none text-[#F2EBD9] text-[15px] outline-none selection:bg-[#3bb97e]/30 pt-1"
                 defaultValue="The synthesis of opposing forces (Thesis, Antithesis, Synthesis)"
              />
            </div>
            
            {/* Incorrect Options */}
            <div className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-[#1f3329] hover:border-[#C69B35]/30 bg-[#0D1511] transition-colors">
              <div className="w-6 h-6 rounded-full border border-[#1f3329] flex-shrink-0 cursor-pointer" />
              <input 
                 className="flex-1 bg-transparent border-none text-[#8A9C94] text-[15px] outline-none selection:bg-[#C69B35]/30 focus:text-[#F2EBD9] transition-colors pt-1"
                 defaultValue="The categorical imperative of moral duty"
              />
            </div>
            
            <div className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-[#1f3329] hover:border-[#C69B35]/30 bg-[#0D1511] transition-colors">
              <div className="w-6 h-6 rounded-full border border-[#1f3329] flex-shrink-0 cursor-pointer" />
              <input 
                 className="flex-1 bg-transparent border-none text-[#8A9C94] text-[15px] outline-none selection:bg-[#C69B35]/30 focus:text-[#F2EBD9] transition-colors pt-1"
                 defaultValue="The verification principle of logical positivism"
              />
            </div>

            <div className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-[#1f3329] hover:border-[#C69B35]/30 bg-[#0D1511] transition-colors">
              <div className="w-6 h-6 rounded-full border border-[#1f3329] flex-shrink-0 cursor-pointer" />
              <input 
                 className="flex-1 bg-transparent border-none text-[#8A9C94] text-[15px] outline-none selection:bg-[#C69B35]/30 focus:text-[#F2EBD9] transition-colors pt-1"
                 defaultValue="The tabula rasa of empiricist thought"
              />
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-[#1f3329] flex items-center justify-between">
            <button className="flex items-center gap-2 text-[#8A9C94] hover:text-[#D87070] transition-colors text-[10px] font-bold tracking-widest uppercase">
               <Trash2 size={16} /> Delete
            </button>
            <button className="text-[#C69B35] hover:text-[#daa834] transition-colors bg-[#C69B35]/10 p-2 rounded-md">
               <Sparkles size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Next Step Navigation */}
      <div className="absolute bottom-0 right-0 left-0 lg:left-[350px] p-6 pb-8 z-20 bg-gradient-to-t from-[#0a100d] via-[#0a100d] to-transparent flex justify-end">
        <Link to="/create/config" className="flex items-center gap-3 bg-[#B28228] hover:bg-[#976E22] text-[#0D1511] text-[11px] font-bold uppercase tracking-[0.15em] px-12 py-4 rounded-[3px] transition-colors shadow-lg">
          Configure Quiz
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

    </div>
  );
}
