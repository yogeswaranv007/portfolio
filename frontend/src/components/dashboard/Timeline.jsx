import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Trophy } from 'lucide-react';

export function Timeline() {
  const [achievementsData, setAchievementsData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await portfolioService.getAchievements();
      setAchievementsData(data);
    };
    loadData();
  }, []);

  return (
    <section className="space-y-10" id="achievements">
      <div className="flex items-center gap-3 text-text">
        <Trophy className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-bold tracking-tight">Journey & Achievements</h2>
      </div>

      <div className="relative pl-6 md:pl-10 border-l-2 border-borders/50 space-y-12">
        {achievementsData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            className="relative group"
          >
            {/* Timeline Dot (Glowing Node) */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-background border-4 border-accent/50 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 z-10" />
            
            <div className="flex flex-col gap-2 p-6 glass-card rounded-2xl group-hover:-translate-y-1 group-hover:border-accent/40 transition-all duration-300">
              <span className="text-xs font-bold text-accent tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent/50 hidden md:block" />
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-sm md:text-base text-text/70 mt-1 max-w-2xl leading-relaxed font-light">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
