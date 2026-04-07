import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D1511] text-[#F2EBD9] flex flex-col font-sans">
      <header className="w-full px-6 md:px-12 py-6 flex items-center border-b border-[#1f3329] bg-[#0D1511]">
        <Link to="/" className="flex items-center gap-3 font-serif hover:opacity-80 transition-opacity">
          <BookOpen className="text-[#C69B35]" size={28} />
          <span className="text-2xl font-bold">Quizly</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col gap-8">
        <div className="mb-4">
           <h1 className="text-4xl md:text-5xl font-serif text-[#F2EBD9] mb-4">Privacy Policy</h1>
           <p className="text-[#8A9C94] text-sm md:text-base">Last updated: April 2026</p>
        </div>

        <section className="bg-[#111C16] border border-[#1f3329] p-8 rounded-2xl flex flex-col gap-6">
           <h2 className="text-2xl font-serif text-[#C69B35]">Your Privacy Matters</h2>
           <p className="text-[#8A9C94] leading-relaxed">
             Because Quizly is a college project intended for academic assessment, we treat your mock data extremely carefully—mostly because we don't really want to look at it!
           </p>
           
           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">1. What we collect</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             We collect the email address you sign up with and the actual files (PDFs, DOCX) you upload to generate the quizzes. We also collect the answers submitted by the mock students to show stats.
           </p>

           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">2. Do we share your data?</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             No. Your data stays in our sandbox environment. Unless our professor asks to see our database to grade us, no one else is looking at your test questions or your scores.
           </p>

           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">3. Security</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             While we try to apply basic security practices learned in our Web Development class (like hashing passwords!), please use a unique, dummy password when registering here just to be safe.
           </p>
        </section>

        <Link to="/" className="text-[#C69B35] hover:text-[#F2EBD9] text-sm uppercase tracking-widest font-bold self-start transition-colors">
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
}
