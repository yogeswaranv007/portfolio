import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/dashboard/Hero';
import { TechRadar } from '../components/dashboard/TechRadar';
import { Timeline } from '../components/dashboard/Timeline';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { ProjectsListView } from './ProjectsListView';
import ContactView from './ContactView';

import { portfolioService } from '../services/portfolioService';
import { User, GraduationCap, Code, Rocket, Link as LinkIcon } from 'lucide-react';

export function DashboardView() {
  // Local-First: Immediate synchronous fallback hydration
  const [profilesData, setProfilesData] = useState(() => {
    const local = portfolioService.getLocalCodingProfiles();
    return (local || []).filter(p => p.enabled !== false);
  });

  useEffect(() => {
    let isMounted = true;
    portfolioService.getCodingProfiles().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setProfilesData(data.filter(p => p.enabled !== false));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-24 pb-20">
      <div id="home">
        <Hero />
      </div>

      {/* About Section */}
      <section className="space-y-6 pt-10" id="about">
        <div className="flex items-center gap-3 text-text">
          <User className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl border-t-4 border-t-primary group hover:-translate-y-1 transition-transform"
          >
            <GraduationCap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold text-text mb-2">Education</h3>
            <p className="text-text/70 font-light">B.Tech in Information Technology. Final-year student with a strong academic foundation.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl border-t-4 border-t-secondary group hover:-translate-y-1 transition-transform"
          >
            <Code className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-bold text-text mb-2">Focus</h3>
            <p className="text-text/70 font-light">Software Engineering & Full Stack Development. Translating ideas into robust code.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl border-t-4 border-t-accent group hover:-translate-y-1 transition-transform"
          >
            <Rocket className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-bold text-text mb-2">Interests</h3>
            <p className="text-text/70 font-light">Backend Architecture, Cloud Systems, and AI-powered Application Development.</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Major Projects', value: '5+' },
          { label: 'LeetCode Problems', value: '400+' },
          { label: 'Statathon', value: 'Top 25' },
          { label: 'HackSagon', value: 'Finalist' },
          { label: 'Stack', value: 'Java / React' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
            className="glass-card p-6 flex flex-col justify-center items-center text-center gap-2 rounded-2xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
          >
            <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text to-text/40">{stat.value}</span>
            <span className="text-xs text-primary uppercase tracking-widest font-bold">{stat.label}</span>
          </motion.div>
        ))}
      </section>

      <div className="pt-10" id="skills">
        <TechRadar />
      </div>

      <div className="pt-10" id="projects">
        <ProjectsListView />
      </div>

      <div className="pt-10" id="achievements">
        <Timeline />
      </div>

      {/* Coding Profiles */}
      {profilesData.length > 0 && (
        <section className="space-y-8" id="coding-profiles">
          <div className="flex items-center gap-3 text-text">
            <LinkIcon className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold tracking-tight">Coding Profiles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profilesData.map((profile, idx) => (
              <ProfileCard key={profile.id || profile.platform} profile={profile} index={idx} />
            ))}
          </div>
        </section>
      )}

      <div className="pt-10" id="contact">
        <ContactView />
      </div>
    </div>
  );
}
