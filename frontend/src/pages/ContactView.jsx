import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileData from '../data/profile.json';

export default function ContactView() {
  return (
    <div className="space-y-12 pb-20 max-w-4xl">
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
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Name</label>
            <input type="text" className="w-full p-3 rounded-lg bg-background border border-borders text-text focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Email</label>
            <input type="email" className="w-full p-3 rounded-lg bg-background border border-borders text-text focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90">Message</label>
            <textarea rows="4" className="w-full p-3 rounded-lg bg-background border border-borders text-text focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Hello Yogeswaran..."></textarea>
          </div>
          <button type="button" className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}
