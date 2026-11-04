import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import data from '../../data/educationExperience.json';

export function ExperienceEducationSection() {
  const { experience, education } = data;

  return (
    <section className="space-y-10 overflow-hidden" id="experience-education">
      {/* Section Header (Slides in from Left) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 text-text transform-gpu"
      >
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Experience &amp; Education</h2>
          <p className="text-xs sm:text-sm text-text-muted">Verified teaching experience and academic credentials</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Left Column: Experience (Slides in from Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 transform-gpu"
        >
          <div className="flex items-center gap-2.5 text-text font-bold text-xl pb-1">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3>Experience</h3>
          </div>

          <div className="space-y-5">
            {experience.map((item, index) => (
              <Tilt3DCard
                key={item.id || index}
                maxTilt={5}
                scale={1.02}
                glare={true}
                className="rounded-2xl"
              >
                <div className="flex flex-col gap-3 p-6 glass-card rounded-2xl group hover:border-primary/50 transition-colors duration-300 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-primary/10 text-primary border border-primary/20 tracking-wide">
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

                  <p className="text-sm md:text-base text-text-muted leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </Tilt3DCard>
            ))}

            {/* Note on formal internships */}
            <div className="p-4 rounded-xl bg-background/60 border border-dashed border-borders/60 text-xs text-text-muted">
              <span className="font-semibold text-text">Note:</span> No formal internships held to date. Actively seeking fresher and intern software development roles.
            </div>
          </div>
        </motion.div>

        {/* Right Column: Education (Slides in from Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 transform-gpu"
        >
          <div className="flex items-center gap-2.5 text-text font-bold text-xl pb-1">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3>Education</h3>
          </div>

          <div className="space-y-5">
            {education.map((item, index) => (
              <Tilt3DCard
                key={item.id || index}
                maxTilt={5}
                scale={1.02}
                glare={true}
                className="rounded-2xl"
              >
                <div className="flex flex-col gap-3 p-6 glass-card rounded-2xl group hover:border-primary/50 transition-colors duration-300 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-primary/10 text-primary border border-primary/20 tracking-wide">
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
                    <div className="pt-2 border-t border-borders/40 mt-1">
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
              </Tilt3DCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
