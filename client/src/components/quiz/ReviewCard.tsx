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
    <div className="w-full bg-[#111C16] border border-[#1f3329] rounded-xl p-6 md:p-8 flex flex-col gap-6 relative">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[#C69B35] font-serif italic text-2xl font-medium">{number}</span>
        <div className={`px-2 py-1 flex items-center justify-center rounded-[3px] text-[9px] font-bold tracking-[0.1em] uppercase ${isCorrect ? 'bg-[#15221c] text-[#8A9C94] border border-[#1f3329]' : 'bg-[#e57a7a]/10 text-[#e57a7a] border border-[#e57a7a]/20'
          }`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      </div>

      <p className="text-[#F2EBD9] leading-relaxed text-sm md:text-base max-w-2xl">{question}</p>

      <div className={`w-full flex items-center gap-3 p-4 rounded-md border ${isCorrect ? 'bg-[#15221c] border-[#1f3329]' : 'bg-[#151111] border-[#331f1f]'
        }`}>
        {isCorrect ? (
          <CheckCircle2 size={18} className="text-[#8A9C94]" />
        ) : (
          <XCircle size={18} className="text-[#e57a7a]" />
        )}
        <span className={`${isCorrect ? 'text-[#F2EBD9]' : 'text-[#e57a7a]'} text-sm`}>{selectedOption}</span>
      </div>

      {!isCorrect && correctOption && (
        <div className="flex items-center gap-2 text-[#8A9C94] opacity-80 mt-1">
          <Info size={14} />
          <span className="text-xs">Correct answer: {correctOption}</span>
        </div>
      )}
    </div>
  );
}
