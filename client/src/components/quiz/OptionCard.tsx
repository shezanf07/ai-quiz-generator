import { clsx } from "clsx";

interface OptionCardProps {
  letter: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionCard({ letter, text, isSelected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-300 flex items-start md:items-center gap-5 md:gap-6 group relative overflow-hidden",
        isSelected 
          ? "bg-[#C69B35]/10 border-[#C69B35] shadow-[0_0_20px_rgba(198,155,53,0.15)]" 
          : "bg-[#0D1511] border-[#1f3329] hover:border-[#C69B35]/50 hover:bg-[#111C16]"
      )}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#C69B35]/10 to-transparent pointer-events-none" />
      )}
      
      <div className={clsx(
        "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-serif text-sm md:text-base transition-colors shrink-0 mt-0.5 md:mt-0",
        isSelected
          ? "bg-[#C69B35] text-[#0D1511] font-bold shadow-[0_0_10px_rgba(198,155,53,0.4)]"
          : "border border-[#1f3329] text-[#8A9C94] group-hover:border-[#C69B35]/50 group-hover:text-[#F2EBD9]"
      )}>
        {letter}
      </div>
      
      <span className={clsx(
        "text-base md:text-lg font-medium leading-relaxed transition-colors mt-1 md:mt-0 pt-0.5",
        isSelected ? "text-[#C69B35]" : "text-[#8A9C94] group-hover:text-[#F2EBD9]"
      )}>
        {text}
      </span>
    </button>
  );
}
