import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquareText, 
  FileSearch, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../shared/SectionHeading';
import processData from '../../data/process.json';
import { ProcessItem } from '../../types';

const stepIcons: Record<string, React.ReactNode> = {
  MessageSquareText: <MessageSquareText className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />,
  FileSearch: <FileSearch className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />,
  TrendingUp: <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />,
};

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-16 sm:py-28 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Our Working Methodology"
          title="Structured Engagement"
          highlightedText="From Diagnostic to Advisory"
          subtitle="Our battle-tested 4-step framework guarantees complete regulatory safety, transparent communication, and rapid turnaround."
          align="center"
        />

        {/* Timeline Desktop & Mobile Grid */}
        <div className="relative mt-10 sm:mt-16">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 -translate-y-12 z-0 opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 relative z-10">
            {(processData as ProcessItem[]).map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-amber-400 p-5 sm:p-7 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl card-hover-glow"
              >
                <div>
                  {/* Step badge & icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300">
                      {stepIcons[item.icon] || <Sparkles className="w-5 h-5 text-amber-600" />}
                    </div>
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-slate-400 group-hover:text-amber-600 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 mb-1 block">
                    {item.subtitle}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-slate-500 group-hover:text-amber-700 transition-colors">
                  <span>Phase 0{index + 1} of 04</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
