import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Cpu, 
  Factory, 
  ShoppingBag, 
  Pill, 
  Truck, 
  Home, 
  ShieldCheck 
} from 'lucide-react';
import firmData from '../../data/firm.json';

const industries = [
  { name: 'Manufacturing & Engineering', icon: <Factory className="w-5 h-5 text-amber-400" /> },
  { name: 'Technology & SaaS Startups', icon: <Cpu className="w-5 h-5 text-amber-400" /> },
  { name: 'Pharmaceuticals & Health', icon: <Pill className="w-5 h-5 text-amber-400" /> },
  { name: 'Retail & E-Commerce', icon: <ShoppingBag className="w-5 h-5 text-amber-400" /> },
  { name: 'Real Estate & Infra', icon: <Home className="w-5 h-5 text-amber-400" /> },
  { name: 'Logistics & Supply Chain', icon: <Truck className="w-5 h-5 text-amber-400" /> },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#070b14] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Sector Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Trusted Across Critical Industry Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Tailored tax structures, audit checklists, and financial models calibrated for distinct regulatory domains.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition-all group"
            >
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform mb-3">
                {ind.icon}
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-amber-300 transition-colors leading-snug">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">
            Firm Accreditations:
          </span>
          {firmData.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
