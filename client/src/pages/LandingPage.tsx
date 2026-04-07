import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import HeroSection from "../components/landing/HeroSection";
import FeatureCards from "../components/landing/FeatureCards";
import HowItWorks from "../components/landing/HowItWorks";
import BottomCTA from "../components/landing/BottomCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center">
        <HeroSection />
        <FeatureCards />
        <HowItWorks />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
