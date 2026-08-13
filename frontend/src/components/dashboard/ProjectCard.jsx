import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card p-6 flex flex-col h-full group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] hover:border-primary/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-center justify-between mb-6 text-text/70">
        <Folder className="w-10 h-10 text-primary/70 group-hover:text-primary transition-colors" />
        <div className="flex gap-4 items-center">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-cards rounded-lg hover:text-primary transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-cards rounded-lg hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {project.id === 'mospi-survey' && (
        <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-bold self-start tracking-wide uppercase">
          <span>🏆</span> National Grand Finalist
        </div>
      )}

      <h3 className="relative z-10 text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="relative z-10 text-sm text-text/70 flex-1 leading-relaxed mb-6 font-light">
        {project.description}
      </p>

      <div className="relative z-10 mt-auto space-y-6">
        <ul className="flex flex-wrap gap-2 text-xs font-mono text-primary/80">
          {project.technologies.slice(0, 4).map(tech => (
            <li key={tech} className="px-2 py-1 bg-primary/10 rounded-md border border-primary/10 group-hover:border-primary/30 transition-colors">
              {tech}
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li className="px-2 py-1 text-text/50">+{project.technologies.length - 4} more</li>
          )}
        </ul>
        <a 
          href={`/projects/${project.id}`} 
          className="flex items-center justify-center gap-2 w-full py-3 bg-cards/80 border border-borders group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all rounded-xl font-semibold text-sm"
        >
          View Details <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </a>
      </div>
    </motion.div>
  );
}
