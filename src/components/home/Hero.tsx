import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  Receipt, 
  Award, 
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Button } from '../shared/Button';
import { ConsultationModal } from '../shared/ConsultationModal';
import firmData from '../../data/firm.json';

export const Hero: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-grid-pattern pt-12 pb-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/80 to-blue-50/30">
      {/* Background Soft Radiant Light Beams & Luminous Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-amber-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 -left-20 sm:-left-32 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 sm:right-0 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-amber-400/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Live Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6 sm:mb-8 shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Premier Accounting & Financial Advisory</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-amber-400"></span>
            <span className="hidden sm:inline text-slate-600 font-semibold">Est. {firmData.founded}</span>
          </motion.div>

          {/* Main Headline (Optimized H1 for Google Search & Brand Discovery) */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.12]"
          >
            ANS Tax Consultancy —{' '}
            <span className="text-amber-600 block sm:inline font-extrabold">
              Tax, Accounting & Business Advisory in India & Dubai
            </span>
          </motion.h1>

          {/* Subheadline with natural SEO keyword integration */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 sm:mt-8 text-sm sm:text-lg lg:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed px-2 font-normal"
          >
            Empowering enterprises with expert Income Tax filing, GST compliance, accounting, statutory audits, and strategic business consultancy across India and Dubai.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 px-4 sm:px-0"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsConsultOpen(true)}
              icon={<Calendar className="w-5 h-5 text-slate-950" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Book Free Consultation
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="#services"
              icon={<ArrowRight className="w-4 h-4 text-amber-700" />}
              className="w-full sm:w-auto"
            >
              Explore 4 Service Lines
            </Button>
          </motion.div>

          {/* Trust Value Badges with clean elevated card background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all shadow-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform shrink-0 border border-amber-200">
                <Calculator className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Accounting</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Clean Ledgers & MIS</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all shadow-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform shrink-0 border border-amber-200">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Rigorous Audits</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Statutory & Internal</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all shadow-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform shrink-0 border border-amber-200">
                <Receipt className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Tax Advisory</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Direct & GST Filings</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all shadow-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform shrink-0 border border-amber-200">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Virtual CFO</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Valuation & Growth</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#services"
        className="mt-10 sm:mt-12 hidden md:inline-flex flex-col items-center gap-1 text-slate-500 hover:text-amber-700 transition-colors text-xs font-semibold"
        aria-label="Scroll to services"
      >
        <span>Explore Services</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-600" />
      </a>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </section>
  );
};
