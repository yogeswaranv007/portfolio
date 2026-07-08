import React from 'react';
import { motion } from 'framer-motion';
import achievementsData from '../../data/achievements.json';
import { Trophy } from 'lucide-react';

export function Timeline() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 text-text">
        <Trophy className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold tracking-tight">Journey & Achievements</h2>
      </div>

      <div className="relative pl-6 md:pl-8 border-l border-borders space-y-12">
        {achievementsData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-accent tracking-widest">{item.year}</span>
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-text/70 mt-1 max-w-2xl leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
