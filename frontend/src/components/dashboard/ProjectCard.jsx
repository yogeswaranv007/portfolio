import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 flex flex-col h-full group"
    >
      <div className="flex items-center justify-between mb-4 text-text/70">
        <Folder className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
        <div className="flex gap-4 items-center">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {project.id === 'mospi-survey' && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold self-start">
          <span>🏆</span> National Grand Finalist Project
        </div>
      )}

      <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-sm text-text/70 flex-1 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="mt-auto space-y-6">
        <ul className="flex flex-wrap gap-2 text-xs font-mono text-text/50">
          {project.technologies.slice(0, 4).map(tech => (
            <li key={tech}>{tech}</li>
          ))}
          {project.technologies.length > 4 && <li>+{project.technologies.length - 4} more</li>}
        </ul>
        <a href={`/projects/${project.id}`} className="block w-full text-center py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors rounded-lg font-medium text-sm">
          View Details
        </a>
      </div>
    </motion.div>
  );
}
