import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TrustedLogos from "./TrustedLogos";
import MobileAppShowcase from "./MobileAppShowcase";
import LiveDemoSection from "./LiveDemoSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import WhyChooseUsSection from "./WhyChooseUsSection";
import KeyFeaturesSection from "./KeyFeaturesSection";

function Landing() {
  const [showDownloadBar, setShowDownloadBar] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px down
      if (window.scrollY > 400 && !dismissed) {
        setShowDownloadBar(true);
      } else if (window.scrollY <= 400) {
        setShowDownloadBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleAppDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/pos.exe";
    link.setAttribute("download", "pos.exe");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowDownloadBar(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navbar */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted Logos Section */}
      <TrustedLogos />

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Live Demo Section */}
      <LiveDemoSection />

      {/* Mobile App Showcase */}
      <MobileAppShowcase />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection id="contact" />

      {/* Footer */}
      <Footer />

      {/* ── Sticky Download Bar (pops up from bottom on scroll) ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showDownloadBar
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-primary/95 backdrop-blur-md shadow-[0_-4px_30px_rgba(0,0,0,0.15)] border-t border-primary-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Left: Text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primary-foreground/15 items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold text-primary-foreground truncate">
                  Download POS Pro Now
                </p>
                <p className="text-xs text-primary-foreground/70 hidden sm:block">
                  Get the desktop app for faster, offline-ready billing
                </p>
              </div>
            </div>

            {/* Right: Button + Close */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                onClick={handleAppDownload}
                size="sm"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold rounded-xl px-5 h-10 shadow-lg transition-all active:scale-95"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Download App
              </Button>
              <button
                onClick={handleDismiss}
                className="text-primary-foreground/60 hover:text-primary-foreground p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
