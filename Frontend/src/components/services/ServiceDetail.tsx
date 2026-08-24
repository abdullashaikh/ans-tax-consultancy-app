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
  HelpCircle,
  Calculator,
  FileText,
  DollarSign,
  Lock,
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
  const [selectedPackageName, setSelectedPackageName] = useState<string | undefined>(undefined);

  const handleOpenConsult = (pkgName?: string) => {
    setSelectedPackageName(pkgName ? `${service.title} (${pkgName})` : service.title);
    setIsConsultOpen(true);
  };

  // Other services for bottom cross-navigation
  const otherServices = (servicesData as ServiceItem[]).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <div className="bg-slate-50">
      {/* 1. Hero Banner */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-5 sm:mb-6 overflow-x-auto whitespace-nowrap py-1 font-medium">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-amber-700 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-800 font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Header info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-4 sm:space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                <IconRenderer name={service.icon} className="w-4 h-4 text-amber-600" />
                <span>Verified Compliance Practice</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-xl text-amber-800 font-bold leading-relaxed">
                {service.tagline}
              </p>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl font-normal">
                {service.overview}
              </p>

              <div className="pt-3 sm:pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenConsult()}
                  icon={<Calendar className="w-4 h-4 text-slate-950" />}
                  iconPosition="left"
                  className="w-full sm:w-auto shadow-md"
                >
                  Start Filing / Consultation
                </Button>

                {service.slug === 'income-tax-filing' && (
                  <Link
                    to="/calculator"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs border border-blue-200 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>Calculate Tax (Old vs New)</span>
                  </Link>
                )}

                <Link
                  to="/track"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Track Application Status</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Engagement Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4"
            >
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Starting From
                  </span>
                  <span className="text-xl font-black text-amber-700">
                    {service.priceStarting || '₹ 999'}
                  </span>
                </div>

                <h3 className="text-slate-900 font-bold text-sm sm:text-base my-4 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-amber-600" />
                  <span>Key Engagement Highlights</span>
                </h3>

                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Chartered Accountant Direct Supervision</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Reconciliation with AIS & Form 26AS</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Official Government Filing Acknowledgments</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Post-Filing Notice & Refund Support</span>
                  </li>
                </ul>

                <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <p>
                    Helpline: <a href={`tel:${firmData.phone}`} className="text-amber-700 font-bold hover:underline">{firmData.phone}</a>
                  </p>
                  <p>
                    Email: <span className="text-slate-800 font-semibold">{firmData.email}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Transparent Pricing Packages Grid (Taxware Style) */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Transparent Pricing Plans
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Choose the Right Filing Package for Your Needs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                All packages include complete preparation, CA review, government portal submission, and e-verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {service.packages.map((pkg, pIdx) => (
                <div
                  key={pIdx}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all border ${
                    pIdx === 1
                      ? 'bg-gradient-to-b from-white to-amber-50/50 border-amber-400 ring-2 ring-amber-400/20 shadow-xl relative'
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {pIdx === 1 && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-sm">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">{pkg.price}</span>
                      <span className="text-xs text-slate-500 ml-1">all-inclusive</span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-700 pb-6 border-b border-slate-100">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleOpenConsult(pkg.name)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        pIdx === 1
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>Select Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Scope of Capabilities */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Comprehensive Capabilities</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900">
              Complete Practice Solutions in <span className="gold-gradient-text">{service.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              End-to-end execution backed by senior chartered professionals and precision checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {service.offerings.map((offering, idx) => (
              <OfferingItem key={idx} offering={offering} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Required Documents Checklist (Taxware feature) */}
      {service.requiredDocuments && service.requiredDocuments.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Preparation Checklist
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                  Documents Required to Process Your Filing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Having these records ready enables our team to prepare and verify your filing in under 24 hours. You can upload digital scans directly in your secure client portal.
                </p>
                <div className="pt-2">
                  <Link
                    to="/portal/login"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <span>Upload via Client Portal</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-3">
                  {service.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 font-semibold">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Tangible Deliverables Matrix */}
      <section className="py-16 sm:py-20 bg-slate-50">
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
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Strategic Impact
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Why Professional {service.title} Matters
              </h3>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                {service.whyItMatters}
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenConsult()}
                  icon={<Calendar className="w-4 h-4 text-slate-950" />}
                  className="w-full sm:w-auto"
                >
                  Discuss Your Filing
                </Button>
              </div>
            </motion.div>

            {/* Deliverables Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-md">
                <h4 className="text-sm sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <span>Key Tangible Deliverables</span>
                </h4>
                <div className="space-y-3">
                  {service.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-amber-200">
                        {dIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Service-Specific FAQs */}
      {service.faqs && <ServiceFaq faqs={service.faqs} serviceTitle={service.title} />}

      {/* 7. Cross-Service Navigation */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900">
                Explore Other Core Practice Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Full-spectrum taxation, corporate law, statutory licenses, and bookkeeping solutions.
              </p>
            </div>
            <Link
              to="/#services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all group"
              >
                <IconRenderer name={s.icon} className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-800 transition-colors">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>{s.priceStarting || 'View Plans'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        defaultService={selectedPackageName || service.title}
      />
    </div>
  );
};
