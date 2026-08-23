import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../shared/AnimatedCounter';
import statsData from '../../data/stats.json';
import { StatItem } from '../../types';

export const StatsBar: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#121f3d] via-[#16274a] to-[#121f3d] border-y border-white/15 relative overflow-hidden shadow-inner">
      {/* Gold decorative light streak */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Measurable Pedigree
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 px-2">
            Delivering High-Impact Outcomes Across Indian Commerce
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {(statsData as StatItem[]).map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-[#182a50]/90 border border-white/15 hover:border-amber-400/60 hover:bg-[#1e3463] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/30 ${
                idx === statsData.length - 1 && statsData.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 mt-2 leading-snug">
                {stat.label}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 leading-snug hidden sm:block font-medium">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
