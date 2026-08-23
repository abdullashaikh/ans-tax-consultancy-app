import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../shared/SectionHeading';
import testimonialsData from '../../data/testimonials.json';
import { TestimonialItem } from '../../types';

export const Testimonials: React.FC = () => {
  const testimonials = testimonialsData as TestimonialItem[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 6 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-16 sm:py-28 bg-white border-y border-slate-200 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Testimonials"
          title="Endorsed by Fast-Growing"
          highlightedText="Enterprises & Founders"
          subtitle="Discover how ANS has transformed bookkeeping, simplified multi-state taxation, and guided high-stakes financial transactions."
          align="center"
        />

        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 md:p-12 shadow-xl card-hover-glow">
            
            {/* Top quote icon & Rating */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                <Quote className="w-6 sm:w-8 h-6 sm:h-8 rotate-180" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-4.5 h-4 sm:h-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Content with Animated Transition */}
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5 sm:space-y-6 w-full"
                >
                  <p className="text-base sm:text-xl md:text-2xl text-slate-900 font-semibold leading-relaxed italic">
                    "{current.quote}"
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 sm:pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-xs sm:text-sm shadow-md shrink-0">
                        {current.avatar}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-bold text-sm sm:text-base">
                          {current.name}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {current.role}, <span className="text-amber-700 font-bold">{current.company}</span>
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-700 font-bold self-start sm:self-auto shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      {current.serviceUsed}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 sm:w-8 bg-amber-500'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
