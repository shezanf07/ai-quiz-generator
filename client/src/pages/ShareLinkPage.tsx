import ShareModal from "../components/quiz/ShareModal";

export default function ShareLinkPage() {
  return (
    <div className="min-h-screen bg-[#0D1511] flex flex-col font-sans">
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-6 md:p-12 pb-24">
        <ShareModal />
      </main>
    </div>
  );
}
