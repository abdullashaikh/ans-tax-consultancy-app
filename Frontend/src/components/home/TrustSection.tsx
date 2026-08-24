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
  { name: 'Manufacturing & Engineering', icon: <Factory className="w-5 h-5 text-amber-600" /> },
  { name: 'Technology & SaaS Startups', icon: <Cpu className="w-5 h-5 text-amber-600" /> },
  { name: 'Pharmaceuticals & Health', icon: <Pill className="w-5 h-5 text-amber-600" /> },
  { name: 'Retail & E-Commerce', icon: <ShoppingBag className="w-5 h-5 text-amber-600" /> },
  { name: 'Real Estate & Infra', icon: <Home className="w-5 h-5 text-amber-600" /> },
  { name: 'Logistics & Supply Chain', icon: <Truck className="w-5 h-5 text-amber-600" /> },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Sector Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Trusted Across Critical Industry Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
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
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 group-hover:scale-110 transition-transform mb-3">
                {ind.icon}
              </div>
              <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-800 transition-colors leading-snug">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
          <span className="font-bold text-slate-900 uppercase tracking-wider">
            Firm Accreditations:
          </span>
          {firmData.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
