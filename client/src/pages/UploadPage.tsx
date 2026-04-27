import { UploadCloud, FileText, X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UploadPage() {
  // Mock state for demonstration (to be replaced with actual backend logic)
  const [fileStatus, setFileStatus] = useState<'idle' | 'uploading' | 'parsing' | 'ready'>('idle');

  const handleSimulateUpload = () => {
    if (fileStatus !== 'idle') return;
    
    setFileStatus('uploading');
    
    // Simulate file transmission
    setTimeout(() => {
      setFileStatus('parsing'); // Document uploaded, now parsing

      // Simulate text extraction and AI preparation
      setTimeout(() => {
        setFileStatus('ready');
      }, 2500);
    }, 1500);

  };

  return (
    <div className="flex-1 w-full flex flex-col max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 pb-24 md:pb-28">

      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          Upload your <span className="text-primary italic">file</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Upload your notes, lecture slides, or any document and the AI will generate quiz questions from it automatically.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 items-start">
        {/* Left Column - Form */}
        <div className="flex-1 flex flex-col gap-6 w-full">

          <div 
            onClick={handleSimulateUpload}
            className="flex-1 min-h-[250px] md:min-h-[300px] bg-card border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 transition-colors hover:border-primary/30 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-16 h-16 bg-muted border border-border rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <UploadCloud size={28} />
            </div>

            <h3 className="text-lg font-medium text-foreground mb-2 relative z-10 text-center">
              Drag & drop PDF, DOCX, or TXT
            </h3>
            <p className="text-sm text-muted-foreground relative z-10 text-center">
              or <span className="text-primary">browse files from computer</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="px-4 py-2 rounded-full border border-border bg-card text-muted-foreground text-[10px] font-bold tracking-widest uppercase shadow-sm">PDF</span>
            <span className="px-4 py-2 rounded-full border border-border bg-card text-muted-foreground text-[10px] font-bold tracking-widest uppercase shadow-sm">DOCX</span>
            <span className="px-4 py-2 rounded-full border border-border bg-card text-muted-foreground text-[10px] font-bold tracking-widest uppercase shadow-sm">TXT</span>
          </div>

          {/* Upload & Parse Progress Simulation */}
          {fileStatus !== 'idle' && (
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col relative overflow-hidden shadow-sm mt-2">
              {/* Progress bar effect on top */}
              {(fileStatus === 'uploading' || fileStatus === 'parsing') && (
                <div className="absolute top-0 left-0 h-1 bg-primary/10 w-full overflow-hidden">
                  <div className="h-full bg-primary animate-pulse w-full"></div>
                </div>
              )}
              {fileStatus === 'ready' && (
                <div className="absolute top-0 left-0 h-1 bg-green-300/80 w-full"></div>
              )}

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted border border-border rounded-lg hidden sm:block">
                    <FileText size={20} className={fileStatus === 'ready' ? "text-green-300" : "text-primary"} />
                  </div>
                  <div>
                    <h4 className="text-foreground text-sm font-bold mb-1 break-all pr-4">lecture_notes_chapter_4.pdf</h4>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      {fileStatus === 'uploading' && <><Loader2 size={12} className="animate-spin text-primary shrink-0" /> <span className="truncate">Uploading (2.4 MB)</span></>}
                      {fileStatus === 'parsing' && <><Loader2 size={12} className="animate-spin text-primary shrink-0" /> <span className="truncate">Parsing Document...</span></>}
                      {fileStatus === 'ready' && <><CheckCircle size={12} className="text-green-300 shrink-0" /> <span className="truncate text-green-300">Ready for AI</span></>}
                    </div>
                  </div>
                </div>
                <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   setFileStatus('idle');
                 }}
                 className="text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2 -mt-2 shrink-0"
                 aria-label="Cancel upload"
                >
                  <X size={18} />
                </button>
              </div>
              
              {fileStatus === 'parsing' && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Extracting text and identifying key concepts. The content will be sent to the AI shortly.
                </p>
              )}
              {fileStatus === 'ready' && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Document successfully processed. You can now generate the quiz!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Paste Text */}
        <div className="w-full lg:w-[400px] xl:w-[480px] bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-xl h-[300px] md:h-[400px] lg:sticky lg:top-24 focus-within:border-primary/30 transition-colors">
          <div className="p-4 md:p-5 border-b border-border flex justify-between items-center bg-muted">
            <h3 className="font-serif text-foreground text-base md:text-lg">Paste Plain Text</h3>
            <FileText size={18} className="text-muted-foreground hidden sm:block" />
          </div>
          <div className="p-4 md:p-5 flex-1 flex flex-col">
            <textarea
              className="w-full h-full bg-transparent resize-none text-foreground placeholder:text-muted-foreground/50 text-sm md:text-base outline-none minimal-scrollbar"
              placeholder="Paste your content here..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 right-0 z-20 w-full bg-background/90 backdrop-blur-md border-t border-border flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-5">
        <Link
          to="/create/edit"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold uppercase rounded-[4px] transition-all shadow-lg active:scale-95 whitespace-nowrap
            text-[9px] tracking-[0.06em] px-3.5 py-2.5
            sm:text-[10px] sm:tracking-[0.1em] sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          Generate Quiz With AI
          <ArrowRight size={13} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
        </Link>
      </div>

    </div>
  );
}
