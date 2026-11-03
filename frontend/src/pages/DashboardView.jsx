import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/dashboard/Hero';
import { AboutSection } from '../components/dashboard/AboutSection';
import { TechRadar } from '../components/dashboard/TechRadar';
import { ProjectsListView } from './ProjectsListView';
import { ExperienceEducationSection } from '../components/dashboard/ExperienceEducationSection';
import { Timeline } from '../components/dashboard/Timeline';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import ContactView from './ContactView';
import { portfolioService } from '../services/portfolioService';
import { Link as LinkIcon } from 'lucide-react';

export function DashboardView() {
  const [profilesData, setProfilesData] = useState(() => {
    const local = portfolioService.getLocalCodingProfiles();
    return (local || []).filter((p) => p.enabled !== false);
  });

  useEffect(() => {
    let isMounted = true;
    portfolioService.getCodingProfiles().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setProfilesData(data.filter((p) => p.enabled !== false));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero */}
      <div id="home">
        <Hero />
      </div>

      {/* 2. Quick Statistics (Floating Glass Cards) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" aria-label="Key Highlights">
        {[
          { label: 'Major Projects', value: '4' },
          { label: 'LeetCode Solved', value: '450+' },
          { label: 'Statathon 2025', value: 'Top 25' },
          { label: 'HackSagon', value: 'Finalist' },
          { label: 'Core Stack', value: 'Java / React' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
            className="glass-card p-6 flex flex-col justify-center items-center text-center gap-2 rounded-2xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
          >
            <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text to-text/40 font-mono">
              {stat.value}
            </span>
            <span className="text-xs text-primary uppercase tracking-widest font-bold">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </section>

      {/* 3. About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* 4. Skills Section */}
      <div id="skills">
        <TechRadar />
      </div>

      {/* 5. Projects Section */}
      <div id="projects">
        <ProjectsListView />
      </div>

      {/* 6. Experience & Education Timeline */}
      <div id="experience-education">
        <ExperienceEducationSection />
      </div>

      {/* 7. Key Achievements Timeline */}
      <div id="achievements">
        <Timeline />
      </div>

      {/* 8. Coding Profiles */}
      {profilesData.length > 0 && (
        <section className="space-y-8" id="coding-profiles">
          <div className="flex items-center gap-3 text-text">
            <LinkIcon className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Coding Profiles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profilesData.map((profile, idx) => (
              <ProfileCard key={profile.id || profile.platform} profile={profile} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* 9. Contact */}
      <div id="contact">
        <ContactView />
      </div>
    </div>
  );
}
