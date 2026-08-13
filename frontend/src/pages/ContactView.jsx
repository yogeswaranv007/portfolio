import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Loader2, ArrowRight, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { portfolioService } from '../services/portfolioService';

export default function ContactView() {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      const data = await portfolioService.getProfile();
      setProfileData(data);
    };
    loadProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await portfolioService.sendMessage(formData);
      toast.success('Thank you! Your message has been received successfully. (Locally saved)', {
        duration: 5000,
        position: 'bottom-center',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profileData) return null;

  return (
    <div className="space-y-12 pb-4 max-w-5xl mx-auto">
      <div className="space-y-4 text-center md:text-left relative">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-text flex flex-col md:flex-row items-center gap-4"
        >
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          Let's build something.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text/70 max-w-2xl leading-relaxed mx-auto md:mx-0 font-light"
        >
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <a href={`mailto:${profileData.email}`} className="group flex items-center gap-6 p-6 glass-card rounded-2xl hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-4 bg-background border border-borders/50 rounded-xl group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors relative z-10">
              <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative z-10 flex-1">
              <p className="text-sm font-bold text-text/50 uppercase tracking-widest mb-1">Email</p>
              <p className="text-text font-medium group-hover:text-primary transition-colors">{profileData.email}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-text/30 group-hover:text-primary group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all relative z-10" />
          </a>
          
          <a href={`tel:${profileData.phone}`} className="group flex items-center gap-6 p-6 glass-card rounded-2xl hover:-translate-y-1 hover:border-green-500/50 hover:shadow-[0_10px_20px_rgba(34,197,94,0.1)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-4 bg-background border border-borders/50 rounded-xl group-hover:bg-green-500/10 group-hover:border-green-500/50 transition-colors relative z-10">
              <Phone className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative z-10 flex-1">
              <p className="text-sm font-bold text-text/50 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-text font-medium group-hover:text-green-500 transition-colors">{profileData.phone || 'Not provided'}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-text/30 group-hover:text-green-500 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all relative z-10" />
          </a>
          
          <div className="group flex items-center gap-6 p-6 glass-card rounded-2xl border-borders/50 relative overflow-hidden">
            <div className="p-4 bg-background border border-borders/50 rounded-xl relative z-10">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-text/50 uppercase tracking-widest mb-1">Location</p>
              <p className="text-text font-medium">{profileData.location}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <a href={`https://github.com/${profileData.github || 'yogeswaranv007'}`} target="_blank" rel="noreferrer" className="flex-1 group flex flex-col items-center justify-center gap-3 p-6 glass-card rounded-2xl hover:-translate-y-1 hover:border-text/50 hover:bg-text/5 transition-all duration-300">
              <FaGithub className="w-8 h-8 text-text/70 group-hover:text-text group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-text/70 group-hover:text-text transition-colors">GitHub</span>
            </a>
            <a href={profileData.linkedin || '#'} target="_blank" rel="noreferrer" className="flex-1 group flex flex-col items-center justify-center gap-3 p-6 glass-card rounded-2xl hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <FaLinkedin className="w-8 h-8 text-text/70 group-hover:text-primary group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-text/70 group-hover:text-primary transition-colors">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass-card p-6 md:p-8 space-y-6 rounded-3xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1">Name <span className="text-primary">*</span></label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full p-4 rounded-xl bg-background border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-borders focus:border-primary'} text-text focus:outline-none transition-all focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]`} 
                placeholder="John Doe" 
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1">Email <span className="text-primary">*</span></label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full p-4 rounded-xl bg-background border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-borders focus:border-primary'} text-text focus:outline-none transition-all focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]`} 
                placeholder="john@example.com" 
              />
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full p-4 rounded-xl bg-background border ${errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-borders focus:border-primary'} text-text focus:outline-none transition-all focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]`} 
              placeholder="Job Opportunity" 
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1 ml-1">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">Message <span className="text-primary">*</span></label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              rows="5" 
              className={`w-full p-4 rounded-xl bg-background border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-borders focus:border-primary'} text-text focus:outline-none transition-all resize-none focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]`} 
              placeholder="Hello Yogeswaran..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1 ml-1">{errors.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2 mt-4 hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
