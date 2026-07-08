import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import { Layers } from 'lucide-react';

export function TechRadar() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 text-text">
        <Layers className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Tech Radar</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(skillsData).map(([category, skills], index) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-text/50 uppercase tracking-wider">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 bg-background/50 border border-borders/50 rounded-md text-sm font-medium text-text/90 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
