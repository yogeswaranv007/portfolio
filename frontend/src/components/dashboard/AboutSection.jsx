import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Code2, Sparkles, MapPin, Briefcase } from 'lucide-react';
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
    <section className="space-y-8 pt-4" id="about">
      {/* Section Header */}
      <div className="flex items-center gap-3 text-text">
        <User className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
      </div>

      {/* Narrative Lead */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 sm:p-8 rounded-2xl border border-borders space-y-4"
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
            <span>Available for Fresher, Intern &amp; Freelance Roles</span>
          </span>
        </div>
      </motion.div>

      {/* 3 Top-Bordered Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card p-6 rounded-2xl border-t-4 ${card.borderColor} group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
