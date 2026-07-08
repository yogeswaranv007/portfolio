import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Code2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileData from '../../data/profile.json';
import { Typewriter } from '../ui/Typewriter';

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
          <span>Final-year B.Tech IT Student</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Hello, I'm <br className="hidden md:block" />
          <span className="text-text">{profileData.name}</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl">
            <Typewriter words={profileData.roles} />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-text/70 leading-relaxed max-w-2xl"
        >
          {profileData.about}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <a href="/projects" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors">
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a href={profileData.resumeUrl} className="flex items-center gap-2 px-6 py-3 bg-cards border border-borders hover:bg-borders/50 text-text font-medium rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Resume
          </a>
          <a href="https://github.com/yogeswaranv007" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-cards border border-borders hover:border-primary/50 text-text hover:text-primary font-medium rounded-lg transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-cards border border-borders hover:border-primary/50 text-text hover:text-primary font-medium rounded-lg transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="/contact" className="flex items-center gap-2 px-4 py-3 bg-cards border border-borders hover:border-primary/50 text-text hover:text-primary font-medium rounded-lg transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/3 max-w-[320px] aspect-[4/5] relative group hidden md:block"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl -rotate-6 transition-transform group-hover:-rotate-3" />
        <div className="absolute inset-0 bg-cards border border-borders rounded-2xl flex items-center justify-center overflow-hidden z-10">
          <img 
            src="/yoges wp profile.png" 
            alt="Yogeswaran V" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
