import React from 'react';
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
