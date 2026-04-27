import { Check, Download, ArrowLeft, BarChart2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export default function ShareModal() {
  const shareUrl = "https://quizly.app/q/scholar-123";

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6 sm:gap-8">
      {/* Success Animation/Icon */}
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full"></div>
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center relative z-10 shadow-lg transform rotate-3">
          <Check size={40} className="text-primary-foreground" strokeWidth={3} />
        </div>
        {/* Floating dots decoration */}
        <div className="absolute top-0 -right-8 w-2 h-2 rounded-full bg-primary"></div>
        <div className="absolute bottom-4 -left-6 w-1.5 h-1.5 rounded-full bg-primary/60"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Your quiz is live!</h1>
        <p className="text-muted-foreground text-[15px] font-medium">Share it with your students using the link or QR code below</p>
      </div>

      {/* Main Card */}
      <div className="w-full bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-2xl mt-2 sm:mt-4">

        {/* Link Section */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-background border border-border p-2 rounded-md">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 w-full md:w-auto bg-transparent border-none text-[15px] text-foreground px-4 py-2 md:py-0 outline-none selection:bg-primary/30 truncate"
          />
          <button className="w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-bold uppercase tracking-[0.1em] px-8 py-3.5 rounded-[3px] transition-colors whitespace-nowrap">
            Copy Link
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-8">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink-0 mx-4 text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-bold">OR</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center gap-8 pb-4">
          <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-foreground">
            <QRCodeSVG
              value={shareUrl}
              size={180}
              bgColor="#ffffff"
              fgColor="#0D1511"
              level="M"
            />
          </div>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-[0.1em]">
            <Download size={14} />
            Download QR Code
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 px-2 sm:px-4 mt-2">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold uppercase tracking-[0.1em]">
            <ArrowLeft size={16} />
            Back to Editor
          </Link>
          <Link to="/stats/1" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold uppercase tracking-[0.1em]">
            View Quiz Stats
            <BarChart2 size={16} />
          </Link>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-md w-full sm:w-auto">
          <Calendar size={14} className="text-primary" />
          <span className="text-xs text-muted-foreground font-medium mr-2">Expires:</span>
          <select className="bg-transparent border-none text-foreground text-sm font-bold outline-none cursor-pointer pr-4 appearance-none">
            <option className="bg-card">30 Days</option>
            <option className="bg-card">7 Days</option>
            <option className="bg-card">24 Hours</option>
            <option className="bg-card">Never</option>
          </select>
        </div>
      </div>
    </div>
  );
}
