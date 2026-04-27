import { Sparkles, Edit3, Link as LinkIcon } from "lucide-react";

export default function FeatureCards() {
  return (
    <section className="w-full px-6 md:px-12 py-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      <div className="flex-[1.5] bg-card border border-border rounded-xl p-8 md:p-12 flex flex-col gap-8 transition-colors">
        <div className="bg-background w-8 h-8 rounded-sm flex items-center justify-center border border-border shadow-sm">
          <Sparkles className="text-primary w-4 h-4" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">AI-Powered Generation</h2>
        </div>
        <div className="mt-8 overflow-hidden rounded-md border border-border relative aspect-[16/10] bg-background/50 flex items-center justify-center">
          <img
            src="/pen_and_book.png"
            alt="Antique fountain pen on leather manuscript"
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800";
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 bg-card border border-border rounded-xl p-8 md:p-10 flex flex-col gap-6 transition-colors">
          <div className="bg-background w-8 h-8 rounded-sm flex items-center justify-center border border-border shadow-sm">
            <Edit3 className="text-primary w-4 h-4" />
          </div>
          <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">Question Editor</h3>
              <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">Easily edit, reorder, or rewrite any generated question before you publish.</p>
          </div>
        </div>

        <div className="flex-1 bg-card border border-border rounded-xl p-8 md:p-10 flex flex-col gap-6 transition-colors">
          <div className="bg-background w-8 h-8 rounded-sm flex items-center justify-center border border-border shadow-sm">
            <LinkIcon className="text-primary w-4 h-4" />
          </div>
          <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">Share Instantly</h3>
              <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">Share your quiz with a single link — no login required for students to access it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
