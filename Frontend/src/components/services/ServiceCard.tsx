import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  Receipt,
  TrendingUp,
  Building2,
  Layers,
  ReceiptText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  Receipt: <Receipt className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  ReceiptText: <ReceiptText className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  Building2: <Building2 className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  Layers: <Layers className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
  TrendingUp: <TrendingUp className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200 hover:border-amber-400 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl overflow-hidden"
    >
      {/* Top ambient hover glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Icon & Service Number Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50 border border-amber-200 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300">
            {iconMap[service.icon] || <Sparkles className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />}
          </div>
          {service.priceStarting ? (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              Starts {service.priceStarting}
            </span>
          ) : (
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
              0{index + 1}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {service.shortDescription}
        </p>

        {/* Sample offerings list */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          {service.offerings.slice(0, 3).map((offering, oIdx) => (
            <div key={oIdx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                {offering.title}
              </span>
            </div>
          ))}
          {service.offerings.length > 3 && (
            <p className="text-[11px] text-amber-700 font-bold pl-5 pt-0.5">
              + {service.offerings.length - 3} more specialized capabilities
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold text-amber-700 group-hover:text-amber-800 transition-colors"
        >
          <span>View Packages & Pricing</span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-slate-950 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
