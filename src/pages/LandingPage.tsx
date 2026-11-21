import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { ProblemSolutionSection } from '../components/ProblemSolutionSection';
import { CoreFeaturesSection } from '../components/CoreFeaturesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { IdentityTrustSection } from '../components/trust/IdentityTrustSection';
import { ProductPreviewSection } from '../components/ProductPreviewSection';
import { AboutSection } from '../components/AboutSection';
import { FaqSection } from '../components/FaqSection';
import { CtaBanner } from '../components/CtaBanner';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <TrustBar />
      <ProblemSolutionSection onNavigate={onNavigate} />
      <CoreFeaturesSection onNavigate={onNavigate} />
      <HowItWorksSection onNavigate={onNavigate} />
      <BenefitsSection onNavigate={onNavigate} />
      <IdentityTrustSection onNavigate={onNavigate} />
      <ProductPreviewSection />
      <AboutSection />
      <FaqSection />
      <CtaBanner onNavigate={onNavigate} />
    </>
  );
};
