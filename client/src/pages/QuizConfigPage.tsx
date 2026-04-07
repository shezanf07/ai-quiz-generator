import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function QuizConfigPage() {
  return (
    <div className="flex-1 w-full bg-[#0a100d] flex flex-col items-center pt-10 pb-36 overflow-y-auto px-4 z-0">
      <div className="w-full max-w-3xl mb-12 text-center md:text-left ml-0 md:ml-4">
        <h1 className="text-3xl md:text-4xl font-serif text-[#F2EBD9] mb-4">Configure your <span className="italic">Quiz</span></h1>
        <p className="text-[#8A9C94] text-[15px] font-medium">Set your rules and branding before publishing your manuscript.</p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Theme Settings */}
        <div className="w-full bg-[#111C16] border border-[#1f3329] rounded-xl p-8 shadow-sm">
          <h3 className="text-lg font-serif italic text-[#F2EBD9] mb-8">Choose a Theme</h3>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            {/* Theme 1 - Light */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full h-[120px] bg-[#E2E8F0] rounded-xl border border-[#cbd5e1] overflow-hidden opacity-50 relative cursor-pointer" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9C94]">Light</span>
            </div>
            {/* Theme 2 - Dark Academic */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full h-[120px] bg-[#0D1511] rounded-xl border-2 border-[#C69B35] shadow-[0_0_15px_rgba(198,155,53,0.15)] overflow-hidden relative cursor-pointer flex items-center justify-center relative">
                 <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#C69B35] flex items-center justify-center shadow-lg"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D1511" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
                 
                 {/* Mini rendering of dark academic styling */}
                 <div className="w-3/4 h-20 border border-[#1f3329] bg-[#111C16] opacity-80 rounded-md flex flex-col p-2 gap-1.5">
                    <div className="w-1/3 h-1 bg-[#C69B35]/40 rounded-full mx-auto" />
                    <div className="w-full h-0.5 bg-[#1f3329]" />
                    <div className="w-full h-1 bg-[#8A9C94]/20 rounded-full mt-2" />
                    <div className="w-2/3 h-1 bg-[#8A9C94]/20 rounded-full" />
                 </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C69B35]">Dark Academic</span>
            </div>
            {/* Theme 3 - Amber Glow */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full h-[120px] bg-gradient-to-br from-[#B28228] to-[#452b02] rounded-xl border border-[#8a6217] overflow-hidden opacity-50 relative cursor-pointer" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9C94]">Amber Glow</span>
            </div>
          </div>
        </div>

        {/* Timer & Rules Settings */}
        <div className="w-full bg-[#111C16] border border-[#1f3329] rounded-xl p-8 flex flex-col gap-8 shadow-sm">
          <h3 className="text-lg font-serif italic text-[#F2EBD9]">Timer & Rules</h3>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#F2EBD9] text-[15px] font-bold mb-1">Enable timer</p>
              <p className="text-[#8A9C94] text-[13px]">Set a time limit for the entire quiz experience</p>
            </div>
            <div className="w-10 h-5 bg-[#C69B35] rounded-full relative cursor-pointer shadow-md mt-1">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-[#F2EBD9] rounded-full shadow-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0D1511] w-fit p-1 rounded-md border border-[#1f3329]">
             <div className="h-6 w-[2px] bg-[#C69B35] ml-2"></div>
             <span className="text-[#8A9C94] text-[10px] font-bold uppercase tracking-widest pl-2">Duration</span>
             <input type="number" defaultValue={15} className="w-16 bg-[#111C16] border-none outline-none text-[#F2EBD9] font-bold text-center py-2 rounded-md selection:bg-[#C69B35]/30 focus:bg-[#1A1515] transition-colors" />
             <span className="text-[#8A9C94] text-[10px] font-bold uppercase tracking-widest pr-4">Minutes</span>
          </div>
        </div>

        {/* Passing Score Settings */}
        <div className="w-full bg-[#111C16] border border-[#1f3329] rounded-xl p-8 flex flex-col gap-6 shadow-sm">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif italic text-[#F2EBD9]">Passing Score</h3>
              <div className="bg-[#B28228] text-[#0D1511] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-sm">70% Required</div>
           </div>

           <div className="py-6 w-full px-2 relative font-sans">
             <div className="w-full h-1.5 bg-[#1f3329] rounded-full overflow-hidden absolute top-1/2 left-0 -translate-y-1/2">
                <div className="h-full bg-[#1f3329] w-full" />
             </div>
             {/* Track highlight */}
             <div className="h-1.5 bg-[#C69B35] w-[70%] absolute top-1/2 left-0 -translate-y-1/2 rounded-l-full" />
             <div className="w-5 h-5 bg-[#C69B35] rounded-full absolute top-1/2 -translate-y-1/2 left-[70%] -translate-x-[50%] shadow-[0_0_10px_#C69B35] border-2 border-[#111C16]" />
             
             <div className="flex justify-between w-full mt-6 text-[#8A9C94] text-[10px] font-bold uppercase tracking-widest opacity-60">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
             </div>
           </div>
        </div>

        {/* Details Form */}
        <div className="w-full bg-[#111C16] border border-[#1f3329] rounded-xl p-8 flex flex-col gap-8 shadow-sm">
          <h3 className="text-lg font-serif italic text-[#F2EBD9]">Quiz Details</h3>
          
          <div className="flex flex-col gap-3">
             <label className="text-[10px] font-bold tracking-widest text-[#8A9C94] uppercase pl-1">Manuscript Title</label>
             <input className="w-full bg-[#0a100d] border border-[#1f3329] p-4 rounded-lg text-[#F2EBD9] text-sm outline-none focus:border-[#C69B35]/50 transition-colors placeholder:text-[#8A9C94]/30" defaultValue="Modern Philosophy 101" />
          </div>

          <div className="flex flex-col gap-3">
             <label className="text-[10px] font-bold tracking-widest text-[#8A9C94] uppercase pl-1">Description</label>
             <textarea className="w-full bg-[#0a100d] border border-[#1f3329] p-4 rounded-lg text-[#F2EBD9] text-sm min-h-[140px] resize-none outline-none focus:border-[#C69B35]/50 transition-colors placeholder:text-[#8A9C94]/30" placeholder="Briefly describe what your students will learn from this study..." defaultValue="An exploration into Hegel's dialectic, existentialism concepts, and major turning points of 19th-century ethical theory." />
          </div>
        </div>
      </div>

      {/* Floating Action Publish */}
      <div className="fixed bottom-0 right-0 p-6 z-20 w-full bg-[#0D1511] border-t border-[#1f3329] flex items-center justify-between px-6 md:px-12">
        <Link to="/create/edit" className="flex items-center gap-2 text-[#8A9C94] hover:text-[#F2EBD9] transition-colors text-[11px] font-bold uppercase tracking-[0.1em]">
          <ArrowLeft size={16} />
          Back to Editor
        </Link>
        <Link to="/create/share" className="flex items-center gap-3 bg-[#B28228] hover:bg-[#976E22] text-[#0D1511] text-[11px] font-bold uppercase tracking-[0.15em] px-10 py-4 rounded-[3px] transition-colors shadow-lg">
          Publish Manuscript
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
}
