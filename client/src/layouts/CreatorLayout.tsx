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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      <header className="w-full bg-background z-10 sticky top-0 border-b border-border">
        {/* Top row: logo + avatar (always visible) */}
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 font-serif hover:opacity-80 transition-opacity">
            <BookOpen className="text-primary" size={22} opacity={0.8} />
            <span className="text-lg sm:text-2xl font-bold">Quizly</span>
          </Link>

          {/* Stepper — inline on lg, hidden here (shown below on sm/md) */}
          {currentStep > 0 && (
            <div className="hidden lg:flex flex-1 items-center justify-center max-w-2xl w-full px-4">
              <div className="flex items-center w-full justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-border -z-10" />

                {steps.map((step) => {
                  const isActive = currentStep === step.number;
                  const isPast = currentStep > step.number;

                  return (
                    <div key={step.number} className="flex flex-col items-center gap-3 bg-background px-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive
                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(198,155,53,0.3)]'
                        : isPast
                          ? 'border border-primary text-primary bg-background'
                          : 'border border-border text-muted-foreground bg-card'
                        }`}>
                        {step.number}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border bg-card text-primary cursor-pointer hover:bg-card/80 transition-colors">
              <Link to="/dashboard">
                <User size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stepper row — visible only on sm/md (below lg) */}
        {currentStep > 0 && (
          <div className="lg:hidden w-full px-4 pb-3">
            <div className="flex items-center w-full justify-between relative">
              <div className="absolute left-0 right-0 top-4 h-[1px] bg-border -z-10" />

              {steps.map((step) => {
                const isActive = currentStep === step.number;
                const isPast = currentStep > step.number;

                return (
                  <div key={step.number} className="flex flex-col items-center gap-1.5 bg-background px-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive
                      ? 'bg-primary text-primary-foreground shadow-[0_0_12px_rgba(198,155,53,0.3)]'
                      : isPast
                        ? 'border border-primary text-primary bg-background'
                        : 'border border-border text-muted-foreground bg-card'
                      }`}>
                      {step.number}
                    </div>
                    <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
