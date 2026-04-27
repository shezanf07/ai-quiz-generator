import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, Minus, Plus } from "lucide-react";

export default function QuizConfigPage() {
  const [selectedTheme, setSelectedTheme] = useState("dark-academic");
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [duration, setDuration] = useState(15);
  const [passingScore, setPassingScore] = useState(70);
  const [quizTitle, setQuizTitle] = useState("");

  const themes = [
    { id: "light", name: "Light", color: "#E2E8F0" },
    { id: "dark-academic", name: "Dark Academic", color: "#0D1511" },
    { id: "amber-glow", name: "Amber Glow", color: "linear-gradient(to bottom right, #B28228, #452b02)" },
  ];

  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center pt-10 pb-36 overflow-y-auto px-4 z-0 font-sans">
      <div className="w-full max-w-3xl mb-12 text-center md:text-left transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Configure your <span className="italic px-1">Quiz</span></h1>
        <p className="text-muted-foreground text-[15px]">Set your quiz rules and preferences before publishing.</p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6">


        <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
          <h2 className="text-lg font-serif italic text-foreground mb-8 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-primary"></span>
            Visual Theme
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className="flex flex-col items-center gap-4 w-full cursor-pointer group"
              >
                <div
                  className={`w-full h-[120px] rounded-xl border-2 transition-all duration-300 relative overflow-hidden flex items-center justify-center
                    ${selectedTheme === theme.id
                      ? "border-primary shadow-[0_0_15px_rgba(198,155,53,0.15)] scale-[1.02]"
                      : "border-border opacity-30 hover:opacity-60"}`}
                  style={{ background: theme.color }}
                >
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                      <Check size={14} strokeWidth={4} className="text-primary-foreground" />
                    </div>
                  )}

                  {selectedTheme === theme.id && (
                    <div className="w-3/4 h-20 border border-border bg-card opacity-80 rounded-md flex flex-col p-2 gap-1.5 pointer-events-none">
                      <div className="w-1/3 h-1 bg-primary/40 rounded-full mx-auto" />
                      <div className="w-full h-0.5 bg-border" />
                      <div className="w-full h-1 bg-muted-foreground/20 rounded-full mt-2" />
                      <div className="w-2/3 h-1 bg-muted-foreground/20 rounded-full" />
                    </div>
                  )}


                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                  ${selectedTheme === theme.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {theme.name}
                </span>
              </div>
            ))}
          </div>
        </div>


        <div className={`w-full bg-card/40 backdrop-blur-sm border rounded-xl p-8 shadow-xl transition-all duration-500
          ${isTimerEnabled ? "border-border" : "border-border/50 opacity-80"}`}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-lg font-serif italic text-foreground mb-1">Quiz Timer</h2>
              <p className="text-muted-foreground text-[13px]">Enable or disable the timer for this quiz</p>
            </div>
            <button
              onClick={() => setIsTimerEnabled(!isTimerEnabled)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 flex items-center px-1
                ${isTimerEnabled ? "bg-primary" : "bg-border"}`}
            >
              <div className={`w-4 h-4 bg-foreground rounded-full shadow-md transition-all duration-300 transform
                ${isTimerEnabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTimerEnabled ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 invisible"}`}>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-background/60 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg border transition-colors ${isTimerEnabled ? "bg-card border-primary/50 text-primary" : "bg-card border-border text-muted-foreground"}`}>
                  <Clock size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Duration</span>
                  <span className="text-foreground text-2xl font-serif">{duration} <span className="text-sm font-sans italic opacity-60">minutes</span></span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-1 justify-end w-full md:w-auto">
                <button
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90"
                  title="Decrease time"
                >
                  <Minus size={20} />
                </button>

                <div className="flex bg-background p-1 rounded-lg border border-border gap-1">
                  {[5, 15, 30, 45, 60].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setDuration(preset)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all
                        ${duration === preset
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
                    >
                      {preset}m
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setDuration(duration + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90"
                  title="Increase time"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-serif italic text-foreground">Passing Score</h2>
            <div className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-primary/5 rounded-md border border-primary/20">
              {passingScore}% Required
            </div>
          </div>
          <p className="text-muted-foreground text-[13px] mb-8">Set the minimum score a student needs to pass.</p>

          <div className="relative pt-6 pb-2 cursor-pointer group">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={passingScore}
              onChange={(e) => setPassingScore(parseInt(e.target.value))}
              className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, var(--primary) ${passingScore}%, var(--border) ${passingScore}%)`
              }}
            />
            <div className="flex justify-between w-full mt-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-40">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>


        <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
          <h2 className="text-lg font-serif italic text-foreground mb-8 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-primary"></span>
            Quiz Details
          </h2>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase pl-1">Quiz Title</label>
            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full bg-background border border-border p-4 rounded-lg text-foreground text-sm outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
              placeholder="e.g. Introduction to Philosophy"
            />
          </div>
        </div>
      </div>


      <div className="fixed bottom-0 right-0 z-20 w-full bg-background/90 backdrop-blur-md border-t border-border flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-5">
        <Link to="/create/edit" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] group shrink-0">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Back to </span>Editor
        </Link>
        <Link
          to="/create/share"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold uppercase rounded-[4px] transition-all shadow-lg active:scale-95 whitespace-nowrap
            text-[9px] tracking-[0.06em] px-3.5 py-2.5
            sm:text-[10px] sm:tracking-[0.1em] sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          Publish Quiz
          <ArrowRight size={13} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
        </Link>
      </div>
    </div>
  );
}
