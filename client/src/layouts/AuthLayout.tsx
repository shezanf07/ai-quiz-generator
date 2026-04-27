import { BookOpen, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Branding Panel */ }
      <div className="hidden lg:flex flex-col flex-1 bg-background text-foreground relative overflow-hidden  p-12">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-primary hover:opacity-80 transition-opacity z-10 w-fit">
          <BookOpen size={24} />
          <span className="text-xl font-bold">Quizly</span>
        </Link>

        <div className="mt-48 z-10 max-w-lg mb-8">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-12">
            Quiz generation,<br />
            <span className="italic font-medium pr-2">reimagined.</span>
          </h1>

          <ul className="space-y-6">
            {[
              "AI-powered extraction from any manuscript",
              "Instant shareable links for scholars",
              "Beautiful quiz themes tailored for focus"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <CheckCircle2 size={18} className="text-primary-hover flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Form Panel (Themed) */}
      <div className="flex-[1.2] lg:flex-1 bg-card flex flex-col justify-center px-6 sm:px-12 md:px-24 py-12 overflow-y-auto ">
        {children}
      </div>
    </div>
  );
}
