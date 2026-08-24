import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ConsultationModal } from '../shared/ConsultationModal';
import { PhoneCall, Calendar } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-amber-400/30 selection:text-amber-900 relative">
      <ScrollToTop />
      
      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Page Body (offset for fixed header) */}
      <main className="flex-grow pt-16 md:pt-24 bg-[#f8fafc]">
        <Outlet />
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        <button
          onClick={() => setIsConsultOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300"
          aria-label="Book Quick Consultation"
        >
          <Calendar className="w-4 h-4 text-slate-950 animate-bounce" />
          <span className="hidden sm:inline">Book Consultation</span>
        </button>
      </div>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </div>
  );
};
