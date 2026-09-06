import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, ArrowLeft } from 'lucide-react';
import { PageType, ModalType } from '../types';
import { FooterSection } from './FooterSection';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (modal: ModalType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Rebrand & Web Sprint',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-24 sm:pt-32">
      <div className="w-full max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-16">
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="text-[13px] sm:text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[13px] sm:text-[14px] font-medium text-[var(--text-primary)]">
            Contact & Consultation
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-headline font-bold text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-4">
            Let's build something iconic.
          </h1>
          <p className="text-[var(--text-muted)] text-[16px] sm:text-[18px] leading-relaxed">
            Fill out the consultation form below and our team will contact you shortly.
          </p>
        </div>

        {/* Query Form Container */}
        <div className="bg-[var(--surface-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-12 shadow-2xl relative">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-headline font-bold text-[28px]">Message Received!</h3>
              <p className="text-[var(--text-muted)] text-[16px] max-w-md mx-auto leading-relaxed">
                Our team will contact you shortly. We typically review inquiries and respond within 2 hours during business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', service: 'Full Rebrand & Web Sprint', message: '' });
                }}
                className="mt-6 px-8 py-3.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] font-semibold text-[14px] cursor-pointer hover:bg-[var(--surface-card)]"
              >
                Send another inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[15px] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[15px] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                  Service Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[15px] focus:outline-none focus:border-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <option value="Full Rebrand & Web Sprint">Full Rebrand & Web Sprint</option>
                  <option value="Growth Retainer">Growth Retainer</option>
                  <option value="Custom Enterprise Partnership">Custom Enterprise Partnership</option>
                  <option value="Other Inquiry">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                  Project Details & Goals
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your company, current bottlenecks, and target launch timeline..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[15px] focus:outline-none focus:border-[var(--text-primary)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[16px] cursor-pointer shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending inquiry...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <FooterSection onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </div>
  );
};
