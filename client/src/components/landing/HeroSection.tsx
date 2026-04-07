import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto">
      <div className="flex-1 flex flex-col items-start gap-8 z-10 lg:pr-12">
        <h1 className="text-[3.5rem] md:text-7xl lg:text-[5.5rem] leading-[1.05] font-serif tracking-tight text-foreground">
          Turn any<br />
          document<br />
          into a <span className="text-primary italic font-medium">quiz</span> in<br />
          seconds
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
          The AI-powered manuscript scribe that extracts wisdom from your files and transforms them into interactive learning experiences.
        </p>
        <Link 
          to="/create/upload" 
          className="group mt-4 inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] transition-all cursor-pointer"
        >
          Upload your first file <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="flex-1 w-full max-w-xl xl:max-w-2xl relative" style={{ perspective: '1000px' }}>
        <div 
          className="relative w-full aspect-[4/3] bg-background border border-border shadow-2xl rounded-sm p-8 transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0"
          style={{ transform: 'rotateY(-12deg) rotateX(8deg) scale(0.95)' }}
        >
          {/* Subtle glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary/5 to-transparent blur-2xl -z-10 rounded-sm"></div>
          
          <div className="flex flex-col gap-5 w-full h-full opacity-80">
            {/* Mock Header lines */}
            <div className="w-1/4 h-3 bg-muted rounded-full"></div>
            <div className="w-3/4 h-2 bg-muted rounded-full mt-2"></div>
            <div className="w-2/3 h-2 bg-muted rounded-full mb-8"></div>
            
            {/* Mock Quiz Option Selected */}
            <div className="w-full border shadow-sm border-primary/40 rounded-sm p-5 flex items-center gap-4 bg-primary/5">
              <div className="w-4 h-4 rounded-full border-[3px] border-primary"></div>
              <div className="w-3/4 h-2 bg-primary/40 rounded-full"></div>
            </div>
            
            {/* Mock Quiz Option Unselected */}
            <div className="w-full border border-border rounded-sm p-5 flex items-center gap-4 opacity-60">
              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
              <div className="w-2/3 h-2 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
