import { UploadCloud, FileText, X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { uploadApi, aiApi, quizApi } from "../services/api";
import LoadingOverlay from "../components/shared/LoadingOverlay";


export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fileStatus, setFileStatus] = useState<'idle' | 'uploading' | 'parsing' | 'ready' | 'generating' | 'error'>('idle');
  const [fileName, setFileName] = useState("");
  const [textInput, setTextInput] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = async (file: File) => {
    setFileStatus('uploading');
    setFileName(file.name);
    setErrorMsg("");

    try {
      const data = await uploadApi.uploadFile(file);
      setSourceId(data.documentId);
      setFileStatus('ready');
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload file");
      setFileStatus('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    let currentSourceId = sourceId;
    
    try {
      setFileStatus('generating');
      setErrorMsg("");

      if (!currentSourceId && textInput.trim().length > 0) {
        const data = await uploadApi.uploadText(textInput);
        currentSourceId = data.documentId;
        setSourceId(currentSourceId);
      }

      if (!currentSourceId) {
         throw new Error("Please upload a file or paste some text first.");
      }


      const aiData = await aiApi.generateQuiz({ sourceDocumentId: currentSourceId, questionCount: 10, difficulty: "medium" });
      

      const quizData = await quizApi.create({
        sourceDocumentId: currentSourceId,
        aiGenerationId: aiData.data.aiGenerationId,
        title: "Generated AI Quiz",
        questions: aiData.data.questions
      });

      navigate(`/create/edit?id=${quizData._id}`);

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to generate quiz");
      setFileStatus('error');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col max-w-350 mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 pb-24 md:pb-28">
      <LoadingOverlay active={fileStatus === 'uploading'} type="ai" message="Uploading and parsing your file..." />
      <LoadingOverlay active={fileStatus === 'generating'} type="ai" message="AI is generating your quiz..." />


      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          Upload your <span className="text-primary italic">file</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Upload your notes, lecture slides, or any document and the AI will generate quiz questions from it automatically.
        </p>
      </div>




      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 items-start">


        <div className="flex-1 flex flex-col gap-6 w-full">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />


          <div
            onClick={() => fileStatus === 'idle' && fileInputRef.current?.click()}
            className="flex-1 min-h-62.5 md:min-h-75 bg-card border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 transition-colors hover:border-primary/30 group cursor-pointer relative overflow-hidden"
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


          {fileStatus !== 'idle' && (
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col relative overflow-hidden shadow-sm mt-2">
              {/* Progress bar effect on top */}
              {(fileStatus === 'uploading' || fileStatus === 'parsing') && (
                <div className="absolute top-0 left-0 h-1 bg-primary/10 w-full overflow-hidden">
                  <div className="h-full bg-primary animate-pulse w-full"></div>
                </div>
              )}
              {fileStatus === 'ready' && (
                <div className="absolute top-0 left-0 h-1 bg-green-500/80 w-full"></div>
              )}

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted border border-border rounded-lg hidden sm:block">
                    <FileText size={20} className={fileStatus === 'ready' ? "text-green-500" : fileStatus === 'error' ? "text-red-400" : "text-primary"} />
                  </div>
                  <div>
                    <h4 className="text-foreground text-sm font-bold mb-1 break-all pr-4">{fileName || "Document"}</h4>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      {fileStatus === 'uploading' && <><Loader2 size={12} className="animate-spin text-primary shrink-0" /> <span className="truncate">Uploading & Parsing...</span></>}
                      {fileStatus === 'generating' && <><Loader2 size={12} className="animate-spin text-primary shrink-0" /> <span className="truncate">AI Generating Quiz...</span></>}
                      {fileStatus === 'ready' && <><CheckCircle size={12} className="text-green-500 shrink-0" /> <span className="truncate text-green-500">Ready for AI</span></>}
                      {fileStatus === 'error' && <><span className="text-red-400">Error Occurred</span></>}
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

              {fileStatus === 'generating' && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Extracting text and identifying key concepts. The AI is crafting your quiz questions.
                </p>
              )}
              {fileStatus === 'ready' && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Document successfully processed. You can now generate the quiz!
                </p>
              )}
              {fileStatus === 'error' && (
                <p className="text-xs text-red-400 mt-3 leading-relaxed">
                  {errorMsg}
                </p>
              )}
            </div>
          )}
        </div>


        <div className="w-full lg:w-100 xl:w-120 bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-xl h-75 md:h-100 lg:sticky lg:top-24 focus-within:border-primary/30 transition-colors">
          <div className="p-4 md:p-5 border-b border-border flex justify-between items-center bg-muted">
            <h3 className="font-serif text-foreground text-base md:text-lg">Paste Plain Text</h3>
            <FileText size={18} className="text-muted-foreground hidden sm:block" />
          </div>
          <div className="p-4 md:p-5 flex-1 flex flex-col">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-full bg-transparent resize-none text-foreground placeholder:text-muted-foreground/50 text-sm md:text-base outline-none minimal-scrollbar"
              placeholder="Paste your content here..."
            ></textarea>
          </div>
        </div>

      </div>


      <div className="fixed bottom-0 right-0 z-20 w-full bg-background/90 backdrop-blur-md border-t border-border flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-5">
        <button
          onClick={handleGenerate}
          disabled={fileStatus === 'uploading' || fileStatus === 'generating' || (!sourceId && !textInput.trim())}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-primary-foreground font-bold uppercase rounded-sm transition-all shadow-lg active:scale-95 whitespace-nowrap
            text-[9px] tracking-[0.06em] px-3.5 py-2.5
            sm:text-[10px] sm:tracking-widest sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          {fileStatus === 'generating' ? "Generating..." : "Generate Quiz With AI"}
          <ArrowRight size={13} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
        </button>
      </div>



    </div>
  )
}