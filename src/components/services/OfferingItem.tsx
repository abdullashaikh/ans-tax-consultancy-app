import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ServiceOffering } from '../../types';
import { IconRenderer } from '../shared/IconRenderer';

interface OfferingItemProps {
  offering: ServiceOffering;
  index: number;
}

export const OfferingItem: React.FC<OfferingItemProps> = ({ offering, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative rounded-2xl bg-[#0f172a]/90 border border-slate-800/90 hover:border-amber-500/50 p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60 card-hover-glow"
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-400 group-hover:scale-110 shrink-0 transition-all">
          {offering.icon ? (
            <IconRenderer name={offering.icon} className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
          )}
        </div>

        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
            {offering.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {offering.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
