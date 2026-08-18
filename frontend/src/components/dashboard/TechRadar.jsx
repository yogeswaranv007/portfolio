import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Layers } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const groupSkills = (data) => {
  if (!Array.isArray(data)) return {};
  return data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    if (skill.enabled !== false) {
      acc[skill.category].push(skill.name);
    }
    return acc;
  }, {});
};

export function TechRadar() {
  // Local-First: Immediate synchronous fallback hydration
  const [skillsData, setSkillsData] = useState(() => groupSkills(portfolioService.getLocalSkills()));

  useEffect(() => {
    let isMounted = true;
    portfolioService.getSkills().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setSkillsData(groupSkills(data));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="space-y-8" id="skills">
      <div className="flex items-center gap-3 text-text">
        <Layers className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight">Technology Ecosystem</h2>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(skillsData).map(([category, skills]) => (
          <motion.div 
            key={category}
            variants={itemVariants}
            className="group glass-card p-6 flex flex-col gap-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)] hover:border-primary/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="relative z-10 text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors animate-pulse" />
              {category}
            </h3>
            
            <div className="relative z-10 flex flex-wrap gap-2.5">
              {skills.map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 bg-background border border-borders/50 rounded-lg text-sm font-medium text-text/80 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
