import { UploadCloud, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function UploadPage() {
  return (
    <div className="flex-1 w-full flex flex-col max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-10 pb-20">

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#F2EBD9] mb-4">
          Upload your <span className="text-[#C69B35] italic">file</span>
        </h1>
        <p className="text-[#8A9C94] text-sm md:text-base max-w-2xl leading-relaxed">
          Transform your manuscripts, lecture notes, or research papers into interactive quizzes. Our AI scribe will analyze the text to create bespoke questions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 items-start">
        {/* Left Column - Form */}
        <div className="flex-1 flex flex-col gap-6 w-full">

          <div className="flex-1 min-h-[300px] bg-[#111C16] border border-dashed border-[#1f3329] rounded-2xl flex flex-col items-center justify-center p-8 transition-colors hover:border-[#C69B35]/30 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-[#C69B35]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-16 h-16 bg-[#15221c] border border-[#1f3329] rounded-2xl flex items-center justify-center mb-6 text-[#C69B35] group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <UploadCloud size={28} />
            </div>

            <h3 className="text-lg font-medium text-[#F2EBD9] mb-2 relative z-10">
              Drag & drop PDF, DOCX, or TXT
            </h3>
            <p className="text-sm text-[#8A9C94] relative z-10">
              or <span className="text-[#C69B35]">browse files from computer</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 rounded-full border border-[#1f3329] bg-[#111C16] text-[#8A9C94] text-[10px] font-bold tracking-widest uppercase shadow-sm">PDF</span>
            <span className="px-4 py-2 rounded-full border border-[#1f3329] bg-[#111C16] text-[#8A9C94] text-[10px] font-bold tracking-widest uppercase shadow-sm">DOCX</span>
            <span className="px-4 py-2 rounded-full border border-[#1f3329] bg-[#111C16] text-[#8A9C94] text-[10px] font-bold tracking-widest uppercase shadow-sm">TXT</span>
          </div>

          {/* Upload Progress Simulation */}
          <div className="bg-[#111C16] border border-[#C69B35]/40 rounded-xl p-5 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(198,155,53,0.05)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#C69B35] mt-2">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1A1515] text-[#D87070] border border-[#2A1E1E] rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-[#F2EBD9] text-sm font-bold mb-1">lecture_notes.pdf</h4>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8A9C94]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C69B35] animate-pulse shadow-[0_0_5px_#C69B35]" />
                    2.4 MB · Uploading to scribe
                  </div>
                </div>
              </div>
              <button className="text-[#8A9C94] hover:text-[#D87070] transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            <div className="w-full h-1.5 bg-[#1A2A22] rounded-full overflow-hidden mt-2 relative">
              <div className="absolute top-0 left-0 h-full bg-[#C69B35] w-[85%] rounded-full shadow-[0_0_10px_#C69B35]" />
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] tracking-widest font-bold text-[#8A9C94] uppercase">
              <span>Optimizing Text Flow</span>
              <span className="text-[#C69B35]">85%</span>
            </div>
          </div>
        </div>

        {/* Right Column - Paste Text */}
        <div className="w-full lg:w-[400px] xl:w-[480px] bg-[#111C16] border border-[#1f3329] rounded-2xl flex flex-col overflow-hidden shadow-2xl h-[400px] sticky top-24 focus-within:border-[#C69B35]/30 transition-colors">
          <div className="p-5 border-b border-[#1f3329] flex justify-between items-center bg-[#15221c]">
            <h3 className="font-serif text-[#F2EBD9] text-base md:text-lg">Paste Plain Text</h3>
            <FileText size={18} className="text-[#8A9C94]" />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <textarea
              className="w-full h-full bg-transparent resize-none text-[#F2EBD9] placeholder:text-[#8A9C94]/50 text-sm md:text-base outline-none minimal-scrollbar"
              placeholder="Paste your content here..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full mt-12 pt-8 border-t border-[#1f3329] flex flex-col md:flex-row items-center justify-end gap-6 md:gap-8 sticky bottom-0 bg-[#0D1511] pb-6">
        <button className="text-[#8A9C94] hover:text-[#F2EBD9] transition-colors text-[11px] font-bold uppercase tracking-[0.15em]">
          Cancel Upload
        </button>
        <Link to="/create/edit" className="flex items-center gap-3 bg-[#B28228] hover:bg-[#976E22] text-[#0D1511] text-[11px] font-bold uppercase tracking-[0.15em] px-10 py-4 rounded-[3px] transition-colors shadow-lg">
          Generate Quiz With AI
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </Link>
      </div>

    </div>
  );
}
