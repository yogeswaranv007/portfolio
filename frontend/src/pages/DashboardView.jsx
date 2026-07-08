import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/dashboard/Hero';
import { TechRadar } from '../components/dashboard/TechRadar';
import { Timeline } from '../components/dashboard/Timeline';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { ProfileCard } from '../components/dashboard/ProfileCard';

import projectsData from '../data/projects.json';
import profilesData from '../data/codingProfiles.json';
import profileData from '../data/profile.json';

import { Terminal, FolderGit2, Link as LinkIcon } from 'lucide-react';

export function DashboardView() {
  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <div className="space-y-20 pb-20">
      <Hero />

      {/* Quick Stats & Current Focus */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 flex flex-col gap-4 lg:col-span-1"
        >
          <div className="flex items-center gap-3 text-primary">
            <Terminal className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Now Building</h2>
          </div>
          <ul className="space-y-3 text-sm text-text/80 mt-2">
            {profileData.currentFocus.map((focus, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary/50 mt-0.5">▹</span>
                {focus}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* GitHub Stats Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col gap-4 lg:col-span-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 hidden md:block w-1/3" />
          <div className="flex items-center justify-between z-20">
            <div className="flex items-center gap-3 text-text">
              <FolderGit2 className="w-6 h-6 text-secondary" />
              <h2 className="text-lg font-semibold">Live GitHub Activity</h2>
            </div>
            <span className="text-xs font-mono px-2 py-1 bg-background/50 rounded text-text/50 border border-borders/50">Fetching from API...</span>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-borders/50 rounded-lg bg-background/30 z-20 min-h-[120px]">
            <p className="text-text/40 text-sm font-medium">Backend Integration Pending (Phase 5)</p>
          </div>
        </motion.div>
      </section>

      <TechRadar />

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-text">
            <FolderGit2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Featured Architecture</h2>
          </div>
          <a href="/projects" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      <Timeline />

      {/* Coding Profiles */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-text">
          <LinkIcon className="w-6 h-6 text-secondary" />
          <h2 className="text-2xl font-bold tracking-tight">Coding Profiles</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profilesData.map((profile, idx) => (
            <ProfileCard key={profile.platform} profile={profile} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
