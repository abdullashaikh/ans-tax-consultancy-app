import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  ArrowUp,
  CheckCircle2
} from 'lucide-react';
import firmData from '../../data/firm.json';
import servicesData from '../../data/services.json';

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#091124] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="p-1.5 rounded-xl bg-white border border-amber-400/50 shadow-sm">
                <img
                  src="/logo.png"
                  alt="ANS Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">ANS</span>
                <span className="block text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                  Tax Consultancy
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {firmData.tagline}. We deliver strategic financial insight, rigorous audit assurance, and proactive tax compliance to help ambitious enterprises thrive.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={firmData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#121f3d] border border-white/15 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-400/50 hover:bg-[#1a2c55] transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href={firmData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#121f3d] border border-white/15 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-400/50 hover:bg-[#1a2c55] transition-all"
                aria-label="Twitter / X"
              >
                <TwitterIcon />
              </a>
              <a
                href={firmData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#121f3d] border border-white/15 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-400/50 hover:bg-[#1a2c55] transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={firmData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#121f3d] border border-white/15 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-400/50 hover:bg-[#1a2c55] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>

            {/* Certifications strip */}
            <div className="pt-2 flex flex-wrap gap-2">
              {firmData.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] bg-[#121f3d] text-slate-200 border border-white/15 font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/" className="text-slate-200 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-200 hover:text-amber-400 transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-200 hover:text-amber-400 transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <a href="/#process" className="text-slate-200 hover:text-amber-400 transition-colors">
                  How We Work
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-slate-200 hover:text-amber-400 transition-colors">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Core Practice Areas
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover:bg-amber-400 transition-colors"></span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${firmData.phone}`}
                className="flex items-start gap-2.5 hover:text-amber-400 transition-colors group text-slate-200 font-semibold"
              >
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>{firmData.phone}</span>
              </a>
              <a
                href={`mailto:${firmData.email}`}
                className="flex items-start gap-2.5 hover:text-amber-400 transition-colors group text-slate-200"
              >
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="break-all">{firmData.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">{firmData.address}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-xs">{firmData.workingHours}</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs text-slate-200 font-semibold mb-2">
                Subscribe to Tax & Regulatory Updates
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#142347] border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>
            © {new Date().getFullYear()} {firmData.name}. All rights reserved. Professional Services & Tax Advisory.
          </p>

          <div className="flex items-center gap-6">
            <span>Confidentiality Guaranteed</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors focus:outline-none font-semibold cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
