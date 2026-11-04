import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Code2, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import profileData from '../../data/profile.json';

export function AboutSection() {
  const cards = [
    {
      title: 'Education',
      icon: GraduationCap,
      description: 'B.Tech in Information Technology at Bannari Amman Institute of Technology (2023 - 2027), CGPA 8.34.',
      borderColor: 'border-t-primary',
    },
    {
      title: 'Engineering Focus',
      icon: Code2,
      description: 'Backend & full-stack product engineering. Delivers secure, API-driven architectures in Java and Spring Boot with React.',
      borderColor: 'border-t-primary/80',
    },
    {
      title: 'AI Integrations',
      icon: Sparkles,
      description: 'Integrates practical AI capabilities such as RAG workflows, embeddings, semantic search, and Groq LLMs with fallback resilience.',
      borderColor: 'border-t-primary/60',
    },
  ];

  return (
    <section className="space-y-8 pt-4 overflow-hidden" id="about">
      {/* Section Header (Slides in from Left) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 text-text transform-gpu"
      >
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About Me</h2>
          <p className="text-xs sm:text-sm text-text-muted">Background, product philosophy, and engineering priorities</p>
        </div>
      </motion.div>

      {/* Narrative Lead (Slides in from Left) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-6 sm:p-8 rounded-2xl border border-borders space-y-4 shadow-sm transform-gpu"
      >
        <p className="text-base sm:text-lg text-text leading-relaxed font-normal">
          {profileData.summary}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background border border-borders text-text font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{profileData.location || 'Tamil Nadu, India'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background border border-borders text-text font-medium">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>Available for Fresher, Intern &amp; Product Roles</span>
          </span>
        </div>
      </motion.div>

      {/* 3 Interactive 3D Pillar Cards (Staggered Slide-in) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: -30 + idx * 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full transform-gpu"
          >
            <Tilt3DCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className={`h-full glass-card p-6 rounded-2xl border-t-4 ${card.borderColor} flex flex-col justify-between group shadow-sm`}
            >
              <div>
                <card.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-text-muted font-light leading-relaxed text-sm">
                  {card.description}
                </p>
              </div>
            </Tilt3DCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
