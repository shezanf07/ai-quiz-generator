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
          ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,155,53,0.15)]"
          : "bg-background border-border hover:border-primary/50 hover:bg-card"
      )}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
      )}

      <div className={clsx(
        "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-serif text-sm md:text-base transition-colors shrink-0 mt-0.5 md:mt-0",
        isSelected
          ? "bg-primary text-primary-foreground font-bold shadow-[0_0_10px_rgba(198,155,53,0.4)]"
          : "border border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
      )}>
        {letter}
      </div>

      <span className={clsx(
        "text-base md:text-lg font-medium leading-relaxed transition-colors mt-1 md:mt-0 pt-0.5",
        isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {text}
      </span>
    </button>
  );
}
