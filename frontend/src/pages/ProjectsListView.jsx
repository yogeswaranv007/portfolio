import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import projectsData from '../data/projects.json';
import { FolderGit2 } from 'lucide-react';

export function ProjectsListView() {
  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-text flex items-center gap-4"
        >
          <FolderGit2 className="w-10 h-10 text-primary" />
          Engineering Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text/70 max-w-2xl"
        >
          A collection of full-stack applications, microservices, and AI integrations I've built to solve real-world problems.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
