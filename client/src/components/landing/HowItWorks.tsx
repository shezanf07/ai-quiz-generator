import { UploadCloud, Cpu, Edit2, Share2 } from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload",
    description: "Provide any document, link, or block of text to our AI scribe."
  },
  {
    icon: Cpu,
    title: "AI Extracts",
    description: "Our engine identifies core concepts and creates complex questions."
  },
  {
    icon: Edit2,
    title: "You Edit",
    description: "Review and curate the draft to ensure absolute academic rigor."
  },
  {
    icon: Share2,
    title: "Share Link",
    description: "Instantly publish and track the progress of your learners."
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full px-6 md:px-12 py-24 max-w-5xl mx-auto flex flex-col items-center gap-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">The Path to Enlightenment</h2>
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">Four simple steps from raw data to a bespoke educational manuscript.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full mt-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-6 group cursor-default">
            <div className="w-16 h-16 bg-background rounded-sm border border-border shadow-sm flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:-translate-y-2 transition-all duration-300">
              <step.icon size={26} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif mb-3 text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed px-4">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
