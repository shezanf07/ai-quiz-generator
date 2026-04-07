import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsPage() {
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
           <h1 className="text-4xl md:text-5xl font-serif text-[#F2EBD9] mb-4">Terms and Conditions</h1>
           <p className="text-[#8A9C94] text-sm md:text-base">Last updated: April 2026</p>
        </div>

        <section className="bg-[#111C16] border border-[#1f3329] p-8 rounded-2xl flex flex-col gap-6">
           <h2 className="text-2xl font-serif text-[#C69B35]">Welcome to Quizly!</h2>
           <p className="text-[#8A9C94] leading-relaxed">
             Hey there! Just a quick heads-up: Quizly is an academic college project created for educational and demonstration purposes. It is currently not a production application meant for massive commercial distribution. By using this academic prototype, you agree to these simple terms.
           </p>
           
           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">1. Use of the App</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             Feel free to upload your mock lecture notes, PDFs, and slide decks to generate quizzes! However, please avoid uploading highly sensitive or personally identifiable information since this is just a student project and not a fort-knox enterprise server.
           </p>

           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">2. AI Generation</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             Quizly uses AI to generate these questions. Like all AI, sometimes it might get a little confused and ask a silly question. We don't guarantee that every single question is 100% accurate, so please review your quizzes before sharing them with your friends!
           </p>

           <h3 className="text-xl font-serif text-[#F2EBD9] mt-4">3. Data Retention</h3>
           <p className="text-[#8A9C94] leading-relaxed">
             We reset our databases occasionally. Don't use Quizly as the sole repository for your important tests. We reserve the right to wipe the data when we grade the project or push major updates.
           </p>
        </section>
        
        <Link to="/" className="text-[#C69B35] hover:text-[#F2EBD9] text-sm uppercase tracking-widest font-bold self-start transition-colors">
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
}
