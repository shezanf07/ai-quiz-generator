import { CheckCircle2, XCircle, Info } from "lucide-react";

interface ReviewCardProps {
  number: string;
  question: string;
  selectedOption: string;
  isCorrect: boolean;
  correctOption?: string;
}

export default function ReviewCard({ number, question, selectedOption, isCorrect, correctOption }: ReviewCardProps) {
  return (
    <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6 relative">
      <div className="flex items-start justify-between mb-2">
        <span className="text-primary font-serif italic text-2xl font-medium">{number}</span>
        <div className={`px-2 py-1 flex items-center justify-center rounded-[3px] text-[9px] font-bold tracking-[0.1em] uppercase ${isCorrect ? 'bg-muted text-muted-foreground border border-border' : 'bg-[#e57a7a]/10 text-[#e57a7a] border border-[#e57a7a]/20'
          }`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      </div>

      <p className="text-foreground leading-relaxed text-sm md:text-base max-w-2xl">{question}</p>

      <div className={`w-full flex items-center gap-3 p-4 rounded-md border ${isCorrect ? 'bg-muted border-border' : 'bg-[#151111] border-[#331f1f]'
        }`}>
        {isCorrect ? (
          <CheckCircle2 size={18} className="text-muted-foreground" />
        ) : (
          <XCircle size={18} className="text-[#e57a7a]" />
        )}
        <span className={`${isCorrect ? 'text-foreground' : 'text-[#e57a7a]'} text-sm`}>{selectedOption}</span>
      </div>

      {!isCorrect && correctOption && (
        <div className="flex items-center gap-2 text-muted-foreground opacity-80 mt-1">
          <Info size={14} />
          <span className="text-xs">Correct answer: {correctOption}</span>
        </div>
      )}
    </div>
  );
}
