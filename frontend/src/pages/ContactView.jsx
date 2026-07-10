import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import profileData from '../data/profile.json';
import { submitContactForm } from '../services/contactService';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
    // Clear error for the field when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success('Thank you! Your message has been received successfully. A confirmation email has been sent.', {
        duration: 5000,
        position: 'bottom-center',
      });
      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.details) {
        // Backend validation errors
        setErrors(error.response.data.details);
        toast.error('Please fix the errors in the form.');
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-4xl">
      <Toaster />
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-text flex items-center gap-4"
        >
          <Mail className="w-10 h-10 text-primary" />
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text/70 max-w-2xl leading-relaxed"
        >
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 p-4 glass-card">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text/70 uppercase tracking-wider">Email</p>
              <a href={`mailto:${profileData.email}`} className="text-text hover:text-primary transition-colors">{profileData.email}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 glass-card">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text/70 uppercase tracking-wider">Location</p>
              <p className="text-text">{profileData.location}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="https://github.com/yogeswaranv007" target="_blank" rel="noreferrer" className="p-4 glass-card hover:border-primary/50 text-text hover:text-primary transition-colors flex-1 flex justify-center">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="p-4 glass-card hover:border-primary/50 text-text hover:text-primary transition-colors flex-1 flex justify-center">
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 md:p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full p-3 rounded-lg bg-background border ${errors.name ? 'border-red-500' : 'border-borders'} text-text focus:outline-none focus:border-primary transition-colors`} 
              placeholder="John Doe" 
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full p-3 rounded-lg bg-background border ${errors.email ? 'border-red-500' : 'border-borders'} text-text focus:outline-none focus:border-primary transition-colors`} 
              placeholder="john@example.com" 
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full p-3 rounded-lg bg-background border ${errors.subject ? 'border-red-500' : 'border-borders'} text-text focus:outline-none focus:border-primary transition-colors`} 
              placeholder="Job Opportunity" 
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Message <span className="text-red-500">*</span></label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              rows="4" 
              className={`w-full p-3 rounded-lg bg-background border ${errors.message ? 'border-red-500' : 'border-borders'} text-text focus:outline-none focus:border-primary transition-colors resize-none`} 
              placeholder="Hello Yogeswaran..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
