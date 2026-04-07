import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, User } from "lucide-react";

export default function CreatorLayout() {
  const location = useLocation();
  const path = location.pathname;

  const steps = [
    { number: 1, label: "UPLOAD", path: "/create/upload" },
    { number: 2, label: "EDIT", path: "/create/edit" },
    { number: 3, label: "CONFIGURE", path: "/create/config" },
    { number: 4, label: "PUBLISH", path: "/create/share" } 
  ];

  const currentStep = steps.findIndex(s => s.path === path) + 1 || 0;

  return (
    <div className="min-h-screen bg-[#0D1511] text-[#F2EBD9] flex flex-col font-sans selection:bg-[#C69B35]/30">
      <header className="w-full px-6 py-6 flex items-center justify-between bg-[#0D1511] z-10 sticky top-0 border-b border-[#1f3329]">
        <Link to="/" className="flex items-center gap-3 font-serif hover:opacity-80 transition-opacity flex-1">
          <BookOpen className="text-[#C69B35]" size={24} opacity={0.8} />
          <span className="text-2xl font-bold hidden sm:block">Quizly</span>
        </Link>
        
        {currentStep > 0 && (
          <div className="flex-1 flex items-center justify-center max-w-2xl w-full px-4">
            <div className="flex items-center w-full justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#1f3329] -z-10" />
              
              {steps.map((step) => {
                const isActive = currentStep === step.number;
                const isPast = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex flex-col items-center gap-3 bg-[#0D1511] px-2 sm:px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#C69B35] text-[#0D1511] shadow-[0_0_15px_rgba(198,155,53,0.3)]' 
                        : isPast
                          ? 'border border-[#C69B35] text-[#C69B35] bg-[#0D1511]'
                          : 'border border-[#1f3329] text-[#8A9C94] bg-[#111C16]'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                      isActive ? 'text-[#C69B35]' : 'text-[#8A9C94]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-1 flex justify-end">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1f3329] bg-[#111C16] text-[#C69B35] cursor-pointer hover:bg-[#15221c] transition-colors">
            <Link to="/dashboard">
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
