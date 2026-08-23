import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  Calculator, 
  ShieldCheck, 
  Receipt, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Button } from '../shared/Button';
import { ConsultationModal } from '../shared/ConsultationModal';
import firmData from '../../data/firm.json';
import servicesData from '../../data/services.json';

const serviceIcons: Record<string, React.ReactNode> = {
  accounting: <Calculator className="w-5 h-5 text-amber-400" />,
  auditing: <ShieldCheck className="w-5 h-5 text-amber-400" />,
  taxation: <Receipt className="w-5 h-5 text-amber-400" />,
  'financial-services': <TrendingUp className="w-5 h-5 text-amber-400" />,
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Top Info Bar */}
        <div className="bg-[#0b1429] border-b border-white/10 text-xs text-slate-300 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a 
                href={`tel:${firmData.phone}`} 
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium text-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{firmData.phone}</span>
              </a>
              <a 
                href={`mailto:${firmData.email}`} 
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors hidden md:flex text-slate-200"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{firmData.email}</span>
              </a>
              <div className="flex items-center gap-1.5 text-slate-400 hidden lg:flex">
                <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                <span>{firmData.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 animate-pulse text-amber-400" />
                Chartered Financial & Tax Experts
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0f1b36]/95 backdrop-blur-xl shadow-xl shadow-slate-950/40 border-b border-white/15 py-2.5 sm:py-3'
              : 'bg-[#0f1b36]/85 backdrop-blur-md border-b border-white/10 py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
              <div className="relative p-1 sm:p-1.5 rounded-xl bg-white border border-amber-400/60 shadow-md group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all">
                <img
                  src="/logo.png"
                  alt="ANS Tax Consultancy Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  ANS
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-amber-300 font-bold leading-none">
                  Tax Consultancy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-amber-400 font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>Home</span>
                {isActive('/') && location.pathname === '/' && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>

              <Link
                to="/about"
                className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                  isActive('/about')
                    ? 'text-amber-400 font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>About Us</span>
                {isActive('/about') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 focus:outline-none cursor-pointer ${
                    isActive('/services')
                      ? 'text-amber-400 font-bold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>

                {/* Dropdown Box */}
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-96 pt-2 z-50"
                    >
                      <div className="rounded-2xl bg-[#142342] border border-white/20 p-3.5 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl ring-1 ring-amber-500/30">
                        <div className="p-2 border-b border-white/10 mb-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                            Core Practice Areas
                          </p>
                        </div>
                        <div className="space-y-1">
                          {servicesData.map((service) => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/90 group transition-all"
                            >
                              <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 group-hover:bg-amber-500/25 group-hover:border-amber-400 group-hover:scale-105 transition-all shrink-0">
                                {serviceIcons[service.slug] || <Sparkles className="w-5 h-5 text-amber-400" />}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                                  <span>{service.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                                </div>
                                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                                  {service.shortDescription}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10 px-2 flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">Need custom advisory?</span>
                          <button
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              setIsConsultModalOpen(true);
                            }}
                            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            Talk to a Partner →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/contact"
                className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                  isActive('/contact')
                    ? 'text-amber-400 font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>Contact</span>
                {isActive('/contact') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>
            </div>

            {/* Desktop Right CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsConsultModalOpen(true)}
                icon={<Calendar className="w-4 h-4 text-slate-950" />}
                iconPosition="left"
              >
                Get Consultation
              </Button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${firmData.phone}`}
                className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                aria-label="Call direct"
              >
                <Phone className="w-4 h-4" />
              </a>

              <Button
                variant="primary"
                size="sm"
                className="text-xs px-2.5 py-1.5 font-bold"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Book Call
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Slide up mobile sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-h-[88vh] bg-[#121e38] border-t border-amber-500/40 rounded-t-3xl p-5 sm:p-6 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1.5 rounded-full bg-slate-600 mx-auto mb-4" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-lg bg-white border border-amber-400/50">
                    <img src="/logo.png" alt="ANS" className="h-7 w-auto" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">ANS Advisory</p>
                    <p className="text-[10px] text-amber-300 font-bold mt-0.5">Tax & Audit Practice</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 space-y-2">
                <Link
                  to="/"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/') && location.pathname === '/'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/about')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Mobile Services Accordion */}
                <div className="rounded-xl bg-slate-900/80 border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Our 4 Core Practice Areas
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3 space-y-1.5 border-t border-white/10 pt-2"
                      >
                        {servicesData.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-amber-300 hover:bg-slate-800 bg-slate-950/60"
                          >
                            <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400">
                              {serviceIcons[s.slug]}
                            </div>
                            <span>{s.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/contact"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/contact')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              </div>

              {/* Mobile Footer CTAs */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-sm font-bold shadow-lg shadow-amber-500/25"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConsultModalOpen(true);
                  }}
                  icon={<Calendar className="w-4 h-4 text-slate-950" />}
                  iconPosition="left"
                >
                  Book 30-Min Consultation
                </Button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${firmData.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-amber-400 font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`mailto:${firmData.email}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-amber-400 font-bold"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </>
  );
};
