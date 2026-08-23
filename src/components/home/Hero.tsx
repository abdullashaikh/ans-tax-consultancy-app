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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-grid-pattern pt-8 pb-16 lg:py-24">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-amber-500/12 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 -left-20 sm:-left-32 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-blue-900/25 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 sm:right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-amber-600/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Live Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-8 shadow-lg shadow-amber-500/15 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Premier Accounting & Financial Advisory</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-amber-400"></span>
            <span className="hidden sm:inline text-slate-300">Est. {firmData.founded}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.12]"
          >
            Your Trusted Partner in{' '}
            <span className="gold-gradient-text block sm:inline font-extrabold">
              Accounting, Audit, Tax & Financial Advisory
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 sm:mt-8 text-sm sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2"
          >
            {firmData.subTagline}
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
              className="w-full sm:w-auto shadow-amber-500/30"
            >
              Book Free Consultation
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="#services"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Explore 4 Service Lines
            </Button>
          </motion.div>

          {/* Trust Value Badges with hover and scroll animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all backdrop-blur-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <Calculator className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Accounting</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">Clean Ledgers & MIS</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all backdrop-blur-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Rigorous Audits</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">Statutory & Internal</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all backdrop-blur-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <Receipt className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Tax Advisory</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">Direct & GST Filings</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all backdrop-blur-sm group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Virtual CFO</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">Valuation & Growth</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#services"
        className="mt-10 sm:mt-12 hidden md:inline-flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors text-xs"
        aria-label="Scroll to services"
      >
        <span>Explore Services</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </section>
  );
};
