import React from 'react';
import { SectionHeading } from '../shared/SectionHeading';
import { ServiceCard } from '../services/ServiceCard';
import servicesData from '../../data/services.json';
import { ServiceItem } from '../../types';

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Our Core Practice Areas"
          title="Specialized Financial &"
          highlightedText="Tax Advisory Solutions"
          subtitle="Comprehensive, partner-led services engineered to simplify compliance, protect corporate assets, and maximize commercial valuation."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(servicesData as ServiceItem[]).map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
