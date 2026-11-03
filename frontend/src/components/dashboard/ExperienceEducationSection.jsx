import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import data from '../../data/educationExperience.json';

export function ExperienceEducationSection() {
  const { experience, education } = data;

  return (
    <section className="space-y-10" id="experience-education">
      <div className="flex items-center gap-3 text-text">
        <GraduationCap className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight">Experience &amp; Education</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
        {/* Experience Timeline Track */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-text font-bold text-xl pb-2 border-b border-borders/50">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3>Experience</h3>
          </div>

          <div className="relative pl-6 md:pl-10 border-l-2 border-borders/50 space-y-10">
            {experience.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                className="relative group"
              >
                {/* Glowing Node on Track */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-background border-4 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 z-10" />

                <div className="flex flex-col gap-2.5 p-6 glass-card rounded-2xl group-hover:-translate-y-1 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 font-mono">
                      <span className="w-8 h-[1px] bg-primary/50 hidden md:block" />
                      {item.period}
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                      {item.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                      {item.role}
                    </h4>
                    <p className="text-sm text-text-muted font-medium mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-text-muted leading-relaxed font-light mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Note on formal internships */}
            <div className="p-4 rounded-xl bg-background/60 border border-dashed border-borders/60 text-xs text-text-muted">
              <span className="font-semibold text-text">Note:</span> No formal internships held to date. Actively seeking fresher and intern software development roles.
            </div>
          </div>
        </div>

        {/* Education Timeline Track */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-text font-bold text-xl pb-2 border-b border-borders/50">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3>Education</h3>
          </div>

          <div className="relative pl-6 md:pl-10 border-l-2 border-borders/50 space-y-10">
            {education.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                className="relative group"
              >
                {/* Glowing Node on Track */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-background border-4 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 z-10" />

                <div className="flex flex-col gap-2.5 p-6 glass-card rounded-2xl group-hover:-translate-y-1 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 font-mono">
                      <span className="w-8 h-[1px] bg-primary/50 hidden md:block" />
                      {item.period}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.score}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                      {item.degree}
                    </h4>
                    <p className="text-sm text-text-muted font-medium mt-0.5">
                      {item.institution}
                    </p>
                  </div>

                  {Array.isArray(item.coursework) && item.coursework.length > 0 && (
                    <div className="pt-2 border-t border-borders/50 mt-1">
                      <p className="text-xs font-mono text-text-muted mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        <span>Key Coursework:</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-background text-text-muted border border-borders/50 hover:border-primary/40 transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
