import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../shared/Button';
import { ConsultationModal } from '../shared/ConsultationModal';
import firmData from '../../data/firm.json';

export const CtaBanner: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#070b14] to-[#04070e] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[250px] sm:h-[350px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 bg-gradient-to-r from-[#0e1629] via-[#121c33] to-[#0e1629] border border-amber-500/40 shadow-2xl shadow-black/90 overflow-hidden card-hover-glow"
        >
          {/* Top Gold Glowing Trim */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start With A Free 30-Minute Diagnostic</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Simplify Your Finances &amp;{' '}
                <span className="gold-gradient-text block sm:inline">Eliminate Compliance Risk?</span>
              </h2>

              <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Connect with our senior partners today. Whether you require flawless statutory audit, complex direct tax litigation, GST optimization, or full Virtual CFO steering, ANS delivers.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Direct Partner Access
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  NDA Confidentiality
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Fast Turnaround
                </span>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end pt-2 lg:pt-0">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsConsultOpen(true)}
                icon={<Calendar className="w-5 h-5 text-slate-950" />}
                iconPosition="left"
                className="w-full text-center shadow-amber-500/25"
              >
                Schedule Consultation
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href={`tel:${firmData.phone}`}
                icon={<Phone className="w-4 h-4 text-amber-400" />}
                iconPosition="left"
                className="w-full text-center"
              >
                Call: {firmData.phone}
              </Button>
            </div>

          </div>
        </motion.div>
      </div>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </section>
  );
};
