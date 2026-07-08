import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 flex flex-col h-full group"
    >
      <div className="flex items-center justify-between mb-6 text-text/70">
        <Folder className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
        <div className="flex gap-4 items-center">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-sm text-text/70 flex-1 leading-relaxed mb-6">
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-2 text-xs font-mono text-text/50">
        {project.technologies.slice(0, 4).map(tech => (
          <li key={tech}>{tech}</li>
        ))}
        {project.technologies.length > 4 && <li>+{project.technologies.length - 4} more</li>}
      </ul>
    </motion.div>
  );
}
