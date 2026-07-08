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

      {/* Quick Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Major Projects', value: '5+' },
          { label: 'LeetCode Problems', value: '400+' },
          { label: 'Statathon', value: 'Top 25' },
          { label: 'HackSagon', value: 'Finalist' },
          { label: 'Stack', value: 'Java / React' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 flex flex-col justify-center items-center text-center gap-1 hover:border-primary/50 transition-colors"
          >
            <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{stat.value}</span>
            <span className="text-xs text-text/70 uppercase tracking-wider font-semibold">{stat.label}</span>
          </motion.div>
        ))}
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
