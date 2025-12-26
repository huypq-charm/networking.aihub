import React from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { Footer } from '../components/Footer';
export function LandingPage() {
  return <div className="min-h-screen bg-[#0B0F17] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <Header />

      <main className="relative pt-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialSection />

        {/* Bottom decorative gradient */}
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />
      </main>

      <Footer />
    </div>;
}