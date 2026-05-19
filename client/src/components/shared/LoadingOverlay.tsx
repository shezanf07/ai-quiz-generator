import { useEffect, useState } from "react";
import { Loader2, Sparkles, BookOpen, GraduationCap } from "lucide-react";

interface LoadingOverlayProps {
  active: boolean;
  message?: string;
  submessage?: string;
  type?: "ai" | "save" | "submit" | "generic";
}

const AI_TIPS = [
  "Reading your notes...",
  "Creating questions...",
  "Adding answer options...",
  "Writing explanations...",
  "Checking the quiz...",
  "Almost done..."
];

const SAVE_TIPS = [
  "Saving your quiz...",
  "Uploading data...",
  "Syncing with database...",
  "Finalizing save..."
];

const SUBMIT_TIPS = [
  "Checking answers...",
  "Calculating score...",
  "Reviewing results...",
  "Preparing feedback..."
];

export default function LoadingOverlay({ active, message, submessage, type = "generic" }: LoadingOverlayProps) {
  const [tipIndex, setTipIndex] = useState(0);

  // Cycle through dynamic tips every 2.5 seconds
  useEffect(() => {
    if (!active) return;
    setTipIndex(0);

    const tips = type === "ai" ? AI_TIPS : type === "save" ? SAVE_TIPS : type === "submit" ? SUBMIT_TIPS : [];
    if (tips.length === 0) return;

    const intervalId = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [active, type]);

  if (!active) return null;

  // Resolve messages
  let displayMessage = message;
  let displaySubmessage = submessage;

  if (!displayMessage) {
    if (type === "ai") displayMessage = "AI is studying your file...";
    else if (type === "save") displayMessage = "Saving your changes...";
    else if (type === "submit") displayMessage = "Grading your quiz attempt...";
    else displayMessage = "Please wait a moment...";
  }

  if (!displaySubmessage) {
    const tips = type === "ai" ? AI_TIPS : type === "save" ? SAVE_TIPS : type === "submit" ? SUBMIT_TIPS : [];
    displaySubmessage = tips.length > 0 ? tips[tipIndex] : "This won't take long.";
  }

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/85 backdrop-blur-md animate-fade-in transition-all duration-300">
      

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10">
        

        <div className="relative w-24 h-24 flex items-center justify-center mb-8">

          <div className="absolute inset-0 border-[3px] border-dashed border-primary/40 rounded-full animate-[spin_12s_linear_infinite]" />
          

          <Loader2 className="absolute w-20 h-20 text-primary/30 animate-spin" strokeWidth={1.5} />
          

          <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-2xl relative z-10 animate-[pulse_2s_ease-in-out_infinite]">
            {type === "ai" && <Sparkles className="text-primary w-7 h-7" />}
            {type === "save" && <BookOpen className="text-primary w-7 h-7" />}
            {type === "submit" && <GraduationCap className="text-primary w-7 h-7" />}
            {type === "generic" && <Loader2 className="text-primary w-7 h-7 animate-spin" />}
          </div>
        </div>


        <h3 className="font-serif italic text-foreground text-2xl md:text-3xl font-medium tracking-wide mb-3 animate-[pulse_2s_ease-in-out_infinite]">
          {displayMessage}
        </h3>


        <p className="text-muted-foreground text-sm font-sans font-medium tracking-wide h-6 transition-all duration-500 ease-in-out">
          {displaySubmessage}
        </p>

        <div className="w-12 h-px bg-primary/30 my-6 mx-auto rounded-full" />

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
          Quizly Academic System
        </span>

      </div>
    </div>
  );
}
