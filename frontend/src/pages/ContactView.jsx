import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, ExternalLink, Copy, Check, Clock } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';
import toast from 'react-hot-toast';
import { portfolioService } from '../services/portfolioService';

const RATE_LIMIT_SECONDS = 30;

export default function ContactView() {
  const [profileData, setProfileData] = useState(() => portfolioService.getLocalProfile());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | null
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    portfolioService.getProfile().then((data) => {
      if (isMounted && data) setProfileData(data);
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const recipientEmail = profileData.email || 'yogeswaranv599@gmail.com';

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Rate-limiting check
    const lastSubmitTime = localStorage.getItem('last_contact_submission');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < RATE_LIMIT_SECONDS * 1000) {
      const waitTime = Math.ceil((RATE_LIMIT_SECONDS * 1000 - (now - parseInt(lastSubmitTime, 10))) / 1000);
      toast.error(`Please wait ${waitTime}s before sending another message.`, { icon: '⏳' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await portfolioService.sendMessage(formData);
      localStorage.setItem('last_contact_submission', String(Date.now()));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully! I will reply shortly.');
    } catch {
      // Backend unavailable / sleeping / error -> trigger explicit fallback
      setSubmitStatus('fallback');
      toast.error('Direct server transmission unavailable. Please use the direct email link below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hello Yogeswaran,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
  )}`;

  return (
    <section className="space-y-10" id="contact">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Open to fresher &amp; intern roles at product and startup companies, and freelance opportunities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                Direct Email
              </span>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="p-1.5 rounded-lg border border-borders hover:border-primary/50 text-text-muted hover:text-text text-xs flex items-center gap-1 transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${recipientEmail}`}
              className="text-base sm:text-lg font-bold text-text hover:text-primary transition-colors block break-all font-mono"
            >
              {recipientEmail}
            </a>

            <p className="text-xs text-text-muted leading-relaxed">
              Feel free to reach out regarding engineering roles, technical collaboration, or inquiries.
            </p>
          </div>

          {/* Location & Status Card */}
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-text font-semibold text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Location: {profileData.location || 'Tamil Nadu, India'}</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Open to: fresher and intern roles in software development and AI at product and startup companies. Also available for freelance work.
            </p>
          </div>

          {/* Professional Profiles */}
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-3 shadow-sm">
            <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider block">
              Professional Profiles
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://github.com/yogeswaranv007"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background border border-borders hover:border-primary/50 text-text flex items-center gap-2 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yogeswaranv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background border border-borders hover:border-primary/50 text-text flex items-center gap-2 transition-colors"
              >
                <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/u/Yogeswaran_v/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background border border-borders hover:border-primary/50 text-text flex items-center gap-2 transition-colors"
              >
                <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                <span>LeetCode</span>
              </a>
              <a
                href="https://codeforces.com/profile/yogeswaranv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background border border-borders hover:border-primary/50 text-text flex items-center gap-2 transition-colors"
              >
                <SiCodeforces className="w-4 h-4 text-[#1F8ACB]" />
                <span>Codeforces</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-cards border border-borders shadow-sm space-y-5"
          >
            <h3 className="text-lg font-bold text-text">
              Send a Direct Message
            </h3>

            {/* Success Banner */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Message delivered successfully!</p>
                  <p className="text-xs text-text-muted mt-0.5">Thank you for getting in touch. I will respond to your email as soon as possible.</p>
                </div>
              </div>
            )}

            {/* Fallback Banner (when backend is unreachable) */}
            {submitStatus === 'fallback' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Server response timed out</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      The automated email service is currently unavailable. Please click below to send via your local email client instead.
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email Client</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-text">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Smith"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-borders'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-mono mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-text">
                Your Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. alex@company.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-borders'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-mono mt-1">{errors.email}</p>
              )}
            </div>

            {/* Subject Input */}
            <div className="space-y-1">
              <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-text">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Opportunity / Software Engineering Role"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-borders text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-1">
              <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-text">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about the role, project, or question..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors resize-none ${
                  errors.message ? 'border-red-500' : 'border-borders'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 font-mono mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Rate limited (30s)
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-60 text-white text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
