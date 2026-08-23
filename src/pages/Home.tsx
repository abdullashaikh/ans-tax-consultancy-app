import React from 'react';
import { SEO } from '../components/shared/SEO';
import { Hero } from '../components/home/Hero';
import { AboutStrip } from '../components/home/AboutStrip';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { StatsBar } from '../components/home/StatsBar';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { Testimonials } from '../components/home/Testimonials';
import { TrustSection } from '../components/home/TrustSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="ANS Tax Consultancy | Tax & Accounting Services in India & Dubai"
        description="ANS Tax Consultancy provides professional tax, GST, accounting and business consultancy services across India and Dubai."
        keywords="ANS Tax Consultancy, Tax Consultancy, Income Tax, GST, Accounting, Tax Filing, Business Consultancy, Dubai Tax Consultancy, India Tax Consultancy, Auditing, Virtual CFO"
        canonicalPath=""
      />
      <Hero />
      <AboutStrip />
      <ServicesGrid />
      <StatsBar />
      <ProcessTimeline />
      <Testimonials />
      <TrustSection />
      <CtaBanner />
    </>
  );
};
