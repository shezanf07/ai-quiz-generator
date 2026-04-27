import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="w-full px-5 sm:px-6 md:px-12 py-12 sm:py-16 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-16 max-w-7xl mx-auto overflow-hidden">

      {/* ── Text block ── */}
      <div className="flex-1 flex flex-col items-start gap-6 sm:gap-8 z-10 lg:pr-12 w-full">
        <h1 className="text-[2.6rem] sm:text-[3.5rem] md:text-7xl lg:text-[5.5rem] leading-[1.05] font-serif tracking-tight text-foreground">
          Turn any<br />
          document<br />
          into a <span className="text-primary italic font-medium">quiz</span> in<br />
          seconds
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
          Upload any document and get a ready-to-share quiz in seconds. No manual question writing needed.
        </p>
        <Link
          to="/create/upload"
          className="group mt-2 sm:mt-4 inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.15em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-[3px] transition-colors cursor-pointer"
        >
          Upload your first file <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── Perspective card ──
          • Mobile  → flat, no transform, constrained width
          • Desktop → static 3D tilt via .hero-card in index.css (no animation)
      -->*/}
      <div
        className="flex-1 w-full max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl relative mx-auto lg:mx-0"
        style={{ perspective: '1000px' }}
      >
        <div className="hero-card relative w-full aspect-[4/3] bg-background border border-border shadow-2xl rounded-sm p-5 sm:p-8">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary/5 to-transparent blur-2xl -z-10 rounded-sm" />

          <div className="flex flex-col gap-4 sm:gap-5 w-full h-full opacity-80">
            {/* Mock header lines */}
            <div className="w-1/4 h-2.5 sm:h-3 bg-muted rounded-full" />
            <div className="w-3/4 h-2 bg-muted rounded-full mt-1 sm:mt-2" />
            <div className="w-2/3 h-2 bg-muted rounded-full mb-4 sm:mb-8" />

            {/* Selected option */}
            <div className="w-full border shadow-sm border-primary/40 rounded-sm p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 bg-primary/5">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[3px] border-primary shrink-0" />
              <div className="w-3/4 h-2 bg-primary/40 rounded-full" />
            </div>

            {/* Unselected option */}
            <div className="w-full border border-border rounded-sm p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 opacity-60">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-muted-foreground shrink-0" />
              <div className="w-2/3 h-2 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
