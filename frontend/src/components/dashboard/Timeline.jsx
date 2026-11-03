import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { 
  Trophy, 
  GraduationCap, 
  Code2, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Calendar,
  ChevronRight
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
    <section className="space-y-10" id="achievements">
      {/* Header and Year Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
      </div>

      {/* Vertical Interactive Glowing Timeline Track */}
      <div className="relative pl-7 md:pl-12 border-l-2 border-borders/60 space-y-12">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <motion.div
                key={item.year + (item.title || index)}
                layout
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 220, damping: 22 }}
                className="relative group"
              >
                {/* Interactive Glowing Node on Timeline Track with Year Icon */}
                <div className="absolute -left-[43px] md:-left-[63px] top-1.5 w-9 h-9 rounded-full bg-cards border-2 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(37,99,235,0.7)] group-hover:scale-110 flex items-center justify-center text-primary transition-all duration-300 z-10">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Timeline Card */}
                <div className="flex flex-col gap-4 p-6 sm:p-7 glass-card rounded-2xl border border-borders group-hover:-translate-y-1 group-hover:border-primary/50 transition-all duration-300 shadow-sm relative overflow-hidden">
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                  {/* Header Row: Year Badge + Special Outcome Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 font-mono">
                      <span className="w-8 h-[1.5px] bg-primary/60 hidden sm:block" />
                      <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                        {item.year}
                      </span>
                    </span>

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
                    <div className="space-y-2 pt-2 relative z-10 border-t border-borders/50">
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
