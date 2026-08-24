import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  Building2,
  Calendar
} from 'lucide-react';
import { SectionHeading } from '../components/shared/SectionHeading';
import { Button } from '../components/shared/Button';
import { SEO } from '../components/shared/SEO';
import firmData from '../data/firm.json';
import servicesData from '../data/services.json';

import { leadsApi } from '../api/leads.api';

const contactFaqs = [
  {
    q: 'How fast will an ANS partner respond to an inquiry?',
    a: 'All digital inquiries are reviewed by our senior partners within 2 to 4 business hours. For urgent audit or tax notice emergencies, we recommend calling our direct phone line.',
  },
  {
    q: 'Do you execute a Non-Disclosure Agreement (NDA) before reviewing documents?',
    a: 'Yes, unconditionally. We execute mutual NDAs prior to accessing your financial statements, ledgers, or business records.',
  },
  {
    q: 'Can ANS handle multi-state operations across India?',
    a: 'Absolutely. We manage multi-state GST registrations, centralized TDS, state-specific labor laws, and multi-location branch audits throughout India.',
  },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: servicesData[0]?.slug || 'accounting',
    turnover: 'Under ₹5 Cr',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact ANS Tax Consultancy',
    'url': 'https://anstaxconsultancy.com/contact',
    'mainEntity': {
      '@type': 'AccountingService',
      'name': 'ANS Tax Consultancy',
      'telephone': '+91-7041512939',
      'email': 'info@anstaxconsultancy.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '8/131, Khichri Pur, East Delhi',
        'addressLocality': 'East Delhi',
        'addressRegion': 'Delhi',
        'postalCode': '110091',
        'addressCountry': 'IN'
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await leadsApi.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceInterest: formData.service,
        businessType: formData.company ? `${formData.company} (${formData.turnover})` : formData.turnover,
        message: formData.message,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <SEO
        title="Contact ANS Tax Consultancy | Book a Consultation in India & Dubai"
        description="Contact ANS Tax Consultancy for corporate tax, GST filing, statutory audit, bookkeeping, and Virtual CFO advisory. Call +91-7041512939 or request an appointment."
        keywords="Contact ANS Tax Consultancy, Tax Consultant Phone, Tax Advisor Office Delhi, Tax Services Dubai, Book Financial Consultation"
        canonicalPath="/contact"
        schema={contactSchema}
      />
      
      {/* 1. Hero */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-16 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>Direct Partner Connect</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Schedule a Confidential <span className="gold-gradient-text">Financial Consultation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Reach out to our senior chartered accountants and advisors. We are ready to assist with your accounting, audit, tax compliance, or strategic financing needs.
          </motion.p>
        </div>
      </section>

      {/* 2. Contact Cards & Form Grid */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Contact Details & Office info (5 cols) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Headquarters &amp; Direct Lines
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Connect directly with our corporate office or schedule an in-person meeting with our partners.
                </p>
              </div>

              {/* Direct Phone */}
              <a
                href={`tel:${firmData.phone}`}
                className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group block shadow-sm"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Direct Hotline / WhatsApp</p>
                  <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors mt-0.5">
                    {firmData.phone}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">Available Mon–Sat: 9:30 AM – 6:30 PM</p>
                </div>
              </a>

              {/* Direct Email */}
              <a
                href={`mailto:${firmData.email}`}
                className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group block shadow-sm"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Direct Inquiries & Briefs</p>
                  <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors mt-0.5 break-all">
                    {firmData.email}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">2-Hour First Response Time</p>
                </div>
              </a>

              {/* Office Address */}
              <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Corporate Office Address</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5 leading-relaxed">
                    {firmData.address}
                  </p>
                  <p className="text-[11px] text-amber-800 font-semibold mt-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {firmData.workingHours}
                  </p>
                </div>
              </div>

              {/* Confidentiality Commitment */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Enterprise Data Protection</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  All correspondence, tax filings, and company metrics submitted through this portal are guarded under strict non-disclosure compliance.
                </p>
              </div>
            </div>

            {/* Right: Comprehensive Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 md:p-10 shadow-xl">
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 sm:py-12"
                  >
                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200">
                      <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <span className="text-amber-700 font-bold">{formData.name}</span>. A designated senior partner has been assigned to your request and will contact you shortly.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full sm:w-auto"
                    >
                      Submit Another Query
                    </Button>
                  </motion.div>
                ) : (
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1.5">
                      Send a Detailed Inquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-6 sm:mb-8">
                      Fill out the form below to receive a custom engagement proposal or schedule a discussion.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                      {/* Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Name <span className="text-amber-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rajesh Mehta"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Company / Entity Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Acme Tech Solutions"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Phone Number <span className="text-amber-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Work Email Address <span className="text-amber-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="rajesh@acme.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Service line & Annual turnover */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Service of Primary Interest <span className="text-amber-600">*</span>
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          >
                            {servicesData.map((s) => (
                              <option key={s.slug} value={s.slug} className="text-slate-900">
                                {s.title}
                              </option>
                            ))}
                            <option value="all-in-one" className="text-slate-900">
                              Comprehensive Multi-Service Engagement
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Approximate Annual Turnover
                          </label>
                          <select
                            value={formData.turnover}
                            onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                          >
                            <option value="Under ₹1 Cr">Under ₹1 Cr</option>
                            <option value="₹1 Cr – ₹10 Cr">₹1 Cr – ₹10 Cr</option>
                            <option value="₹10 Cr – ₹50 Cr">₹10 Cr – ₹50 Cr</option>
                            <option value="₹50 Cr – ₹200 Cr">₹50 Cr – ₹200 Cr</option>
                            <option value="Above ₹200 Cr">Above ₹200 Cr</option>
                            <option value="Individual / HNI">Individual / HNI</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Requirement Summary / Key Priorities
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Please share details such as specific audit requirements, tax notice dates, or advisory objectives..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Processing Submission...</span>
                        ) : (
                          <>
                            <span>Submit Consultation Request</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. General FAQs Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 mb-3 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Engagement FAQs</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {contactFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <h4 className="text-sm sm:text-base font-bold text-amber-800">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
