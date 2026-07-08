import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Code2 } from 'lucide-react';
import profileData from '../../data/profile.json';

export function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10 py-12">
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
        >
          <Code2 className="w-4 h-4" />
          <span>Available for hire</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Hello, I'm <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {profileData.name}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-text/70 leading-relaxed max-w-2xl"
        >
          {profileData.about}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a href="/projects" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors">
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a href={profileData.resumeUrl} className="flex items-center gap-2 px-6 py-3 bg-cards border border-borders hover:bg-borders/50 text-text font-medium rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Resume
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/3 aspect-square relative group hidden md:block"
      >
        {/* Placeholder for professional image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl -rotate-6 transition-transform group-hover:-rotate-3" />
        <div className="absolute inset-0 bg-cards border border-borders rounded-2xl flex items-center justify-center overflow-hidden">
          <span className="text-text/50 font-medium tracking-widest uppercase">Image Placeholder</span>
        </div>
      </motion.div>
    </section>
  );
}
