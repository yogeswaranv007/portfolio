import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Code2, Mail, FileText, Database } from 'lucide-react';
import { FaGithub, FaLinkedin, FaJava, FaReact, FaAws, FaNodeJs, FaPython } from 'react-icons/fa';
import { portfolioService } from '../../services/portfolioService';
import { Typewriter } from '../ui/Typewriter';
import { resumeService } from '../../services/resumeService';

const FloatingBadge = ({ icon: Icon, delay, className }) => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ repeat: Infinity, duration: 5, delay, ease: "easeInOut" }}
    className={`absolute z-20 flex items-center justify-center w-12 h-12 rounded-xl glass-card border border-borders/50 shadow-xl ${className}`}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

export function Hero() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await portfolioService.getProfile();
      setProfileData(data);
    };
    loadProfile();
  }, []);

  if (!profileData) return null;

  return (
    <section className="flex flex-col md:flex-row items-center gap-10 py-16 relative">
      <div className="flex-1 space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide"
        >
          <Code2 className="w-4 h-4" />
          <span>Final-year B.Tech IT Student</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
        >
          Hello, I'm <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text to-text/60">
            {profileData.name}
          </span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-primary mt-2 block h-10">
            <Typewriter words={profileData.roles} />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-text/60 leading-relaxed max-w-2xl font-light"
        >
          {profileData.about}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <a href="#projects" className="group flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
            View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center gap-2">
            <a 
              href={resumeService.getResumeMetadata().path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-cards/50 backdrop-blur-md border border-borders/50 hover:bg-borders/50 text-text font-medium rounded-xl transition-all hover:border-primary/50"
            >
              <FileText className="w-4 h-4" /> Resume
            </a>
            <a 
              href={resumeService.getResumeMetadata().path}
              download={resumeService.getResumeMetadata().name}
              className="flex items-center justify-center px-4 py-3.5 bg-cards/50 backdrop-blur-md border border-borders/50 hover:bg-borders/50 text-text font-medium rounded-xl transition-all hover:border-primary/50"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
          <a href="https://github.com/yogeswaranv007" target="_blank" rel="noreferrer" className="flex items-center justify-center p-3.5 bg-cards/50 backdrop-blur-md border border-borders/50 hover:border-primary/50 text-text hover:text-primary font-medium rounded-xl transition-all hover:-translate-y-1">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-center p-3.5 bg-cards/50 backdrop-blur-md border border-borders/50 hover:border-primary/50 text-text hover:text-primary font-medium rounded-xl transition-all hover:-translate-y-1">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full md:w-5/12 max-w-[400px] aspect-square relative hidden md:block"
      >
        {/* Decorative elements */}
        <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 to-secondary/10 rounded-full blur-3xl -z-10" />
        
        {/* Floating Badges */}
        <FloatingBadge icon={FaJava} delay={0} className="text-[#ED8B00] top-10 left-4" />
        <FloatingBadge icon={FaReact} delay={1} className="text-[#61DAFB] top-20 right-4" />
        <FloatingBadge icon={FaNodeJs} delay={2.5} className="text-[#339933] bottom-32 -left-4" />
        <FloatingBadge icon={FaAws} delay={1.5} className="text-[#FF9900] bottom-16 right-10" />

        {/* Main Image Container */}
        <div className="absolute inset-8 rounded-full border border-borders/50 p-2 bg-background/50 backdrop-blur-sm z-10 overflow-visible">
           <div className="w-full h-full rounded-full overflow-hidden border border-borders/50 relative group">
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
             <img 
               src={profileData.imageBase64 || "/yoges_profile.jpeg"} 
               alt={profileData.name || "Yogeswaran V"} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
           </div>
        </div>
      </motion.div>
    </section>
  );
}
