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
  Calendar,
  User as UserIcon,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../shared/Button';
import { ConsultationModal } from '../shared/ConsultationModal';
import { useClientAuth } from '../../context/ClientAuthContext';
import firmData from '../../data/firm.json';
import servicesData from '../../data/services.json';

const serviceIcons: Record<string, React.ReactNode> = {
  accounting: <Calculator className="w-5 h-5 text-amber-600" />,
  auditing: <ShieldCheck className="w-5 h-5 text-amber-600" />,
  taxation: <Receipt className="w-5 h-5 text-amber-600" />,
  'financial-services': <TrendingUp className="w-5 h-5 text-amber-600" />,
};

export const Header: React.FC = () => {
  const { user: clientUser, isAuthenticated: isClientAuthenticated } = useClientAuth();
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
        {/* Top Executive Info Bar */}
        <div className="bg-[#0b1429] text-xs text-slate-200 hidden sm:block border-b border-slate-800">
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
              <div className="flex items-center gap-1.5 text-slate-300 hidden lg:flex">
                <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                <span>{firmData.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 animate-pulse text-amber-400" />
                Chartered Financial & Tax Experts
              </span>
            </div>
          </div>
        </div>

        {/* Main Light Navigation Bar */}
        <nav
          className={`transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm ${
            isScrolled ? 'py-2.5 sm:py-3 shadow-md' : 'py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
              <div className="relative p-1 sm:p-1.5 rounded-xl bg-white border border-amber-400/60 shadow-sm group-hover:shadow-amber-500/30 group-hover:scale-105 transition-all">
                <img
                  src="/logo.png"
                  alt="ANS Tax Consultancy Logo"
                  width="100"
                  height="40"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  ANS
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-amber-700 font-bold leading-none">
                  Tax Consultancy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-bold transition-all duration-200 relative py-1 ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                <span>Home</span>
                {isActive('/') && location.pathname === '/' && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>

              <Link
                to="/about"
                className={`text-sm font-bold transition-all duration-200 relative py-1 ${
                  isActive('/about')
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                <span>About Us</span>
                {isActive('/about') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors py-2 focus:outline-none cursor-pointer ${
                    isActive('/services')
                      ? 'text-amber-600 font-bold'
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-500'
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
                      <div className="rounded-2xl bg-white border border-slate-200 p-3.5 shadow-2xl ring-1 ring-black/5">
                        <div className="p-2 border-b border-slate-100 mb-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                            Core Practice Areas
                          </p>
                        </div>
                        <div className="space-y-1">
                          {servicesData.map((service) => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 group transition-all"
                            >
                              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 group-hover:bg-amber-100 group-hover:scale-105 transition-all shrink-0">
                                {serviceIcons[service.slug] || <Sparkles className="w-5 h-5 text-amber-600" />}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                                  <span>{service.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-600" />
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {service.shortDescription}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 px-2 flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium">Need custom advisory?</span>
                          <button
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              setIsConsultModalOpen(true);
                            }}
                            className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
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
                to="/calculator"
                className={`text-sm font-bold transition-all duration-200 relative py-1 ${
                  isActive('/calculator')
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tax Calculator</span>
                </span>
                {isActive('/calculator') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>

              <Link
                to="/track"
                className={`text-sm font-bold transition-all duration-200 relative py-1 ${
                  isActive('/track')
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Track Status</span>
                </span>
                {isActive('/track') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>

              <Link
                to="/contact"
                className={`text-sm font-bold transition-all duration-200 relative py-1 ${
                  isActive('/contact')
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                <span>Contact</span>
                {isActive('/contact') && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            </div>

            {/* Desktop Right CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isClientAuthenticated ? (
                <Link
                  to="/portal"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <span>Portal ({clientUser?.firstName})</span>
                </Link>
              ) : (
                <Link
                  to="/portal/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 font-bold text-xs transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Client Login</span>
                </Link>
              )}

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
                className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
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
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400 focus:outline-none transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation (Light Mode) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Slide up mobile sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-h-[88vh] bg-white border-t border-slate-200 rounded-t-3xl p-5 sm:p-6 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-4" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-lg bg-white border border-amber-400/50">
                    <img src="/logo.png" alt="ANS Tax Consultancy Logo" width="70" height="28" className="h-7 w-auto object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">ANS Advisory</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Tax & Audit Practice</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
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
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-600" />
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/about')
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-600" />
                </Link>

                {/* Mobile Services Accordion */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Our 4 Core Practice Areas
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180 text-amber-600' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3 space-y-1.5 border-t border-slate-200 pt-2"
                      >
                        {servicesData.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 bg-white border border-slate-100"
                          >
                            <div className="p-1.5 rounded-md bg-amber-50 text-amber-600">
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
                  to="/calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/calculator')
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-600" />
                    <span>Income Tax Calculator</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-600" />
                </Link>

                <Link
                  to="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/track')
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Track Filing Status</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-600" />
                </Link>

                <Link
                  to={isClientAuthenticated ? '/portal' : '/portal/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-amber-700" />
                    <span>{isClientAuthenticated ? `Client Portal (${clientUser?.firstName})` : 'Client Portal Sign In'}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-700" />
                </Link>

                <Link
                  to="/contact"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive('/contact')
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-70 text-amber-600" />
                </Link>
              </div>

              {/* Mobile Footer CTAs */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-sm font-bold shadow-md"
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
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-amber-700 font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`mailto:${firmData.email}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-amber-700 font-bold"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
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
