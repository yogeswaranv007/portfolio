import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import { 
  Trophy, 
  GraduationCap, 
  Code2, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Award
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Code2,
  Trophy,
  Rocket,
  Sparkles,
  Award
};

export function Timeline() {
  const [achievementsData, setAchievementsData] = useState(() => portfolioService.getLocalAchievements());
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    let isMounted = true;
    portfolioService.getAchievements().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setAchievementsData(data);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const years = ['All', ...new Set(achievementsData.map(item => item.year))];
  const displayedItems = selectedYear === 'All' 
    ? achievementsData 
    : achievementsData.filter(item => item.year === selectedYear);

  return (
    <section className="space-y-10 overflow-hidden" id="achievements">
      {/* Header and Year Pills (Slides in from Right) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transform-gpu"
      >
        <div className="flex items-center gap-3 text-text">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Journey &amp; Achievements (2023 - 2026)
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Chronological milestones from academic start to national hackathon finals and production software
            </p>
          </div>
        </div>

        {/* Interactive Year Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-cards p-1.5 rounded-xl border border-borders self-start sm:self-auto shadow-sm">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedYear === year
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-background'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Clean Interactive Milestone Cards Grid (No vertical lines or detached margins) */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;
            const slideFromLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.year + (item.title || index)}
                layout
                initial={{ opacity: 0, x: slideFromLeft ? -35 : 35, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="transform-gpu"
              >
                {/* 3D Tilt Milestone Card */}
                <Tilt3DCard
                  maxTilt={4}
                  scale={1.01}
                  glare={true}
                  className="rounded-2xl"
                >
                  <div className="flex flex-col gap-4 p-6 sm:p-7 glass-card rounded-2xl group hover:border-primary/50 transition-colors duration-300 shadow-sm relative overflow-hidden">
                    {/* Header Row: Integrated Icon + Year Badge + Special Outcome Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-bold text-primary font-mono tracking-wider">
                          {item.year}
                        </span>
                      </div>

                      {item.badge && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{item.badge}</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Category Subtitle */}
                    <div className="relative z-10 space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.category && (
                        <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
                          {item.category}
                        </p>
                      )}
                    </div>

                    {/* Description Narrative */}
                    <p className="text-sm md:text-base text-text-muted leading-relaxed font-light relative z-10">
                      {item.description}
                    </p>

                    {/* Specific Key Highlights */}
                    {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                      <div className="space-y-2 pt-2 relative z-10 border-t border-borders/40">
                        <span className="text-xs font-semibold font-mono text-text uppercase tracking-wider block">
                          Milestones &amp; Outcomes:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-text-muted">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies / Competencies Chips */}
                    {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 relative z-10">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-background text-text-muted border border-borders/60 group-hover:border-primary/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
