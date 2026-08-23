import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Award, 
  Users, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ArrowRight,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { SectionHeading } from '../components/shared/SectionHeading';
import { Button } from '../components/shared/Button';
import { StatsBar } from '../components/home/StatsBar';
import { ConsultationModal } from '../components/shared/ConsultationModal';
import { IconRenderer } from '../components/shared/IconRenderer';
import { SEO } from '../components/shared/SEO';
import aboutData from '../data/about.json';
import firmData from '../data/firm.json';
import { AboutData } from '../types';

const typedAbout = aboutData as AboutData;

export const About: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <div className="bg-[#0b1329]">
      <SEO
        title="About Us | ANS Tax Consultancy - Leading Tax & Accounting Firm"
        description="Learn about ANS Tax Consultancy's 10-year pedigree in providing premier corporate tax, auditing, GST compliance, and financial advisory services in India and Dubai."
        keywords="About ANS Tax Consultancy, Tax Advisors India, Dubai Tax Consultants, Chartered Accountants, Tax Firm Legacy, Corporate Financial Advisory"
        canonicalPath="/about"
      />
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-b from-[#121f3d] via-[#0b1329] to-[#0b1329] border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[300px] sm:h-[400px] bg-amber-500/15 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>About {firmData.name}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            A Decade of Dedication to{' '}
            <span className="gold-gradient-text block sm:inline">Financial Precision & Strategic Advisory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-xs sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            {typedAbout.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 sm:mt-8 flex items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsConsultOpen(true)}
              icon={<Calendar className="w-4 h-4 text-slate-950" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Consult With Our Partners
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Firm Story & Legacy */}
      <section className="py-14 sm:py-24 bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Our Heritage
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {typedAbout.story.heading}
              </h2>
              {typedAbout.story.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Mission Card */}
                <div className="p-5 sm:p-7 rounded-2xl bg-[#142344]/95 border border-amber-400/40 shadow-xl space-y-2.5 card-hover-glow">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                    <Target className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {typedAbout.mission.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {typedAbout.mission.description}
                  </p>
                </div>

                {/* Vision Card */}
                <div className="p-5 sm:p-7 rounded-2xl bg-[#142344]/95 border border-white/15 hover:border-amber-400/40 transition-all shadow-xl space-y-2.5 card-hover-glow">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 flex items-center justify-center">
                    <Award className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {typedAbout.vision.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {typedAbout.vision.description}
                  </p>
                </div>

                {/* Quality Policy */}
                <div className="p-5 sm:p-7 rounded-2xl bg-[#142344]/95 border border-white/15 hover:border-amber-400/40 transition-all shadow-xl space-y-2 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        Standard of Professional Conduct
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300 font-medium">Strict adherence to ICAI ethical guidelines and peer review norms.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#121f3d] via-[#16274a] to-[#121f3d] border-y border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Principles"
            title="The Values That Define"
            highlightedText="Every Engagement"
            subtitle="Our four pillars dictate how we audit accounts, formulate tax defenses, and guide enterprise valuations."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {typedAbout.values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-7 rounded-2xl bg-[#182a50]/90 border border-white/15 hover:border-amber-400/60 transition-all hover:-translate-y-1.5 card-hover-glow"
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-4 sm:mb-5">
                  <IconRenderer name={val.icon} className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Senior Partners */}
      <section className="py-16 sm:py-28 bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Partner Leadership"
            title="Senior Leaders with"
            highlightedText="Proven Track Records"
            subtitle="Led by seasoned Chartered Accountants and financial specialists with deep industry specialization."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {typedAbout.leadership.map((leader, lIdx) => (
              <div
                key={lIdx}
                className="group rounded-2xl bg-[#142344]/90 border border-white/15 hover:border-amber-400/60 p-5 sm:p-8 transition-all hover:-translate-y-1.5 flex flex-col justify-between card-hover-glow"
              >
                <div>
                  {/* Leader Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {leader.experience}
                    </span>
                    <Briefcase className="w-4 h-4 text-slate-300" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-300 mt-1">
                    {leader.role}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2 mb-3.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{leader.qualifications}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-3.5 font-normal">
                    {leader.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="text-white font-bold">ANS Partner</span>
                  <button
                    onClick={() => setIsConsultOpen(true)}
                    className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                  >
                    Request Meeting →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats Bar */}
      <StatsBar />

      {/* 6. Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </div>
  );
};
