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
    <section className="py-16 sm:py-20 bg-[#0b1329] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Sector Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Trusted Across Critical Industry Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
            Tailored tax structures, audit checklists, and financial models calibrated for distinct regulatory domains.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#142344]/90 border border-white/15 hover:border-amber-400/60 hover:bg-[#1a2e56] transition-all group card-hover-glow"
            >
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 group-hover:scale-110 transition-transform mb-3">
                {ind.icon}
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 transition-colors leading-snug">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300">
          <span className="font-bold text-white uppercase tracking-wider">
            Firm Accreditations:
          </span>
          {firmData.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-slate-200 font-semibold px-3 py-1 rounded-full bg-[#13213f] border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
