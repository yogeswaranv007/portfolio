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
import { Tilt3DCard } from '../components/ui/Tilt3DCard';
import { Link as LinkIcon, Sparkles } from 'lucide-react';

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
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* 2. Quick Statistics (Floating 3D Interactive Glass Cards, Slides in from Left) */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 transform-gpu"
        aria-label="Key Highlights"
      >
        {[
          { label: 'Major Projects', value: '4' },
          { label: 'LeetCode Solved', value: '450+' },
          { label: 'Statathon 2025', value: 'Top 25' },
          { label: 'HackSagon', value: 'Finalist' },
          { label: 'Core Stack', value: 'Java / React' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full transform-gpu"
          >
            <Tilt3DCard
              maxTilt={8}
              scale={1.04}
              glare={true}
              className="h-full rounded-2xl"
            >
              <div className="glass-card p-5 sm:p-6 h-full flex flex-col justify-center items-center text-center gap-2 rounded-2xl hover:border-primary/50 hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text to-text/40 font-mono">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-primary uppercase tracking-widest font-bold">
                  {stat.label}
                </span>
              </div>
            </Tilt3DCard>
          </motion.div>
        ))}
      </motion.section>

      {/* 3. About Section (Slides in from Left) */}
      <div id="about">
        <AboutSection />
      </div>

      {/* 4. Skills Section (Slides in from Right) */}
      <div id="skills">
        <TechRadar />
      </div>

      {/* 5. Projects Section (Alternating Left/Right Cascades) */}
      <div id="projects">
        <ProjectsListView />
      </div>

      {/* 6. Experience & Education Timeline (Split Left & Right Columns) */}
      <div id="experience-education">
        <ExperienceEducationSection />
      </div>

      {/* 7. Key Achievements Timeline (Slides in from Right) */}
      <div id="achievements">
        <Timeline />
      </div>

      {/* 8. Coding Profiles (Slides in from Left with Staggered 3D Cards) */}
      {profilesData.length > 0 && (
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 transform-gpu"
          id="coding-profiles"
        >
          <div className="flex items-center gap-3 text-text">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Coding Profiles</h2>
              <p className="text-xs sm:text-sm text-text-muted">Verified competitive programming and developer accounts</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profilesData.map((profile, idx) => (
              <motion.div
                key={profile.id || profile.platform}
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="transform-gpu"
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 9. Contact (Split Columns with 3D Tilt) */}
      <div id="contact">
        <ContactView />
      </div>
    </div>
  );
}
