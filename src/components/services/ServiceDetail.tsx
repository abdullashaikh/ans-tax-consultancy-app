import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  ArrowLeft,
  Sparkles,
  Layers,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { Button } from '../shared/Button';
import { OfferingItem } from './OfferingItem';
import { ServiceFaq } from './ServiceFaq';
import { ConsultationModal } from '../shared/ConsultationModal';
import { IconRenderer } from '../shared/IconRenderer';
import servicesData from '../../data/services.json';
import firmData from '../../data/firm.json';

interface ServiceDetailProps {
  service: ServiceItem;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  // Other services for bottom cross-navigation
  const otherServices = (servicesData as ServiceItem[]).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <div className="bg-[#0b1329]">
      {/* 1. Hero Banner */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-b from-[#121f3d] via-[#0b1329] to-[#0b1329] border-b border-white/10 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-amber-500/15 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-5 sm:mb-6 overflow-x-auto whitespace-nowrap py-1 font-medium">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-amber-400 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-300 font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Header info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-4 sm:space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <IconRenderer name={service.icon} className="w-4 h-4 text-amber-400" />
                <span>Core Practice Line</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-xl text-amber-300 font-semibold leading-relaxed">
                {service.tagline}
              </p>

              <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-3xl font-normal">
                {service.overview}
              </p>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsConsultOpen(true)}
                  icon={<Calendar className="w-4 h-4 text-slate-950" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Consult an Expert
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  href="/contact"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-amber-300 border-amber-400/60 hover:bg-amber-400/10"
                >
                  Send Detailed Inquiry
                </Button>
              </div>
            </motion.div>

            {/* Right Quick Summary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4"
            >
              <div className="rounded-2xl bg-[#142347] border border-amber-400/40 p-5 sm:p-7 shadow-2xl shadow-slate-950/40 card-hover-glow">
                <h3 className="text-white font-bold text-sm sm:text-base mb-4 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-amber-400" />
                  Key Engagement Highlights
                </h3>

                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Senior Partner Direct Supervision</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Statutory & Regulatory Rigor Guaranteed</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Confidential, Cloud-Enabled Workflows</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Custom SLAs & Transparent Billing</span>
                  </li>
                </ul>

                <div className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-300 space-y-1 font-medium">
                  <p>Direct Inquiries: <a href={`tel:${firmData.phone}`} className="text-amber-300 font-bold hover:underline">{firmData.phone}</a></p>
                  <p>Email: <span className="text-white">{firmData.email}</span></p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Sub-Services / "What We Offer" Section */}
      <section className="py-16 sm:py-24 bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Scope of Capabilities</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              What We Offer in <span className="gold-gradient-text">{service.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
              End-to-end execution backed by senior chartered professionals, precision checklists, and proactive compliance alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {service.offerings.map((offering, idx) => (
              <OfferingItem key={idx} offering={offering} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. "Why It Matters" & Deliverables Matrix */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#121f3d] via-[#16274a] to-[#121f3d] border-y border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Why It Matters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-4"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Strategic Impact
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                Why Professional {service.title} Matters to Your Bottom Line
              </h3>
              <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal">
                {service.whyItMatters}
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsConsultOpen(true)}
                  icon={<Calendar className="w-4 h-4 text-slate-950" />}
                  className="w-full sm:w-auto"
                >
                  Discuss Your Requirements
                </Button>
              </div>
            </motion.div>

            {/* Concrete Deliverables Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl bg-[#182a50]/95 border border-white/20 p-5 sm:p-8 card-hover-glow">
                <h4 className="text-sm sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  Key Tangible Deliverables
                </h4>
                <div className="space-y-2.5 sm:space-y-3">
                  {service.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#111e3b] border border-white/10 hover:border-amber-400/40 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-amber-500/30">
                        {dIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Service-Specific FAQ Accordion */}
      {service.faqs && <ServiceFaq faqs={service.faqs} serviceTitle={service.title} />}

      {/* 5. Cross-Service Navigation */}
      <section className="py-14 sm:py-20 bg-[#0b1329] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-white">
                Explore Other Core Practice Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Integrated financial solutions to support every dimension of your business.
              </p>
            </div>
            <Link
              to="/#services"
              className="text-xs sm:text-sm text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1"
            >
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="group p-5 sm:p-6 rounded-2xl bg-[#142344]/90 border border-white/15 hover:border-amber-400/60 transition-all hover:-translate-y-1.5 block card-hover-glow"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 w-fit mb-3 sm:mb-4 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all">
                  <IconRenderer name={other.icon} className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5 sm:mb-2">
                  {other.title}
                </h4>
                <p className="text-xs text-slate-200 line-clamp-2 mb-3 sm:mb-4 font-normal">
                  {other.shortDescription}
                </p>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        defaultService={service.slug}
      />
    </div>
  );
};
