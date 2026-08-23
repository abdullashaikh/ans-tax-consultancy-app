import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, Shield, Target } from 'lucide-react';
import { Button } from '../shared/Button';
import firmData from '../../data/firm.json';

export const AboutStrip: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0f1b34] via-[#142344] to-[#0f1b34] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story & Introduction (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Shield className="w-3.5 h-3.5" />
              <span>About {firmData.shortName}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              A Decade of Proven Leadership in <span className="gold-gradient-text">Financial Advisory & Taxation</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Founded in {firmData.founded}, {firmData.name} is a premier multi-disciplinary advisory firm serving fast-growing businesses, mid-market enterprises, and high-net-worth individuals. We combine deep chartered expertise with modern digital processes to deliver impeccable compliance and strategic growth value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Partner-led strategic engagement</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>End-to-end statutory & tax compliance</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Data privacy & enterprise confidentiality</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Proactive risk & audit mitigation</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="secondary"
                size="md"
                href="/about"
                icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                className="bg-[#192b50] hover:bg-[#203666] border-white/20 text-white"
              >
                Learn More About Our Firm
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Visual Card / Legacy Box (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#16274a] border border-amber-500/40 shadow-2xl shadow-slate-950/40 overflow-hidden card-hover-glow">
              {/* Gold gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base">Client Commitment</h4>
                      <p className="text-xs text-slate-300 font-medium">Excellence in Every Audit</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Est. 2015
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#0f1b34]/90 border border-white/10 space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Our Guarantee
                  </p>
                  <p className="leading-relaxed">
                    We deliver transparent billing, zero hidden fee structures, and dedicated relationship managers ensuring timely responses to every tax filing and financial query.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-4 border-t border-white/10 text-center">
                  <div>
                    <p className="text-2xl font-extrabold text-white">350+</p>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">Retained Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-amber-400">99.8%</p>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">Filing Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
