import { Link } from "react-router-dom";

export default function BottomCTA() {
  return (
    <section className="w-full px-6 md:px-12 py-12 max-w-6xl mx-auto mb-16">
      <div className="w-full bg-[#1c2321] dark:bg-[#15221c] text-[#f4f0e6] rounded-3xl p-12 md:p-24 flex flex-col items-center text-center gap-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 blur-3xl bg-primary pointer-events-none"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold max-w-3xl leading-[1.1] z-10 text-white dark:text-[#f4f0e6]">
          Ready to transcribe your knowledge?
        </h2>
        <p className="text-sm md:text-[15px] opacity-70 max-w-md z-10 font-medium">
          Join 50,000+ educators and students who are building the future of assessment with Quizly.
        </p>
        
        <Link 
          to="/create/upload" 
          className="mt-8 z-10 inline-block bg-primary hover:bg-primary-hover text-white text-[11px] font-bold uppercase tracking-[0.15em] px-10 py-4 rounded-[3px] transition-colors"
        >
          Generate your first quiz free
        </Link>
      </div>
    </section>
  );
}
