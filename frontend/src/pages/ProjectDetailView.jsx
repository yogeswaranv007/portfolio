import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectDetailView() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-text/70 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </motion.div>

      {/* Hero Banner */}
      <section className="space-y-6">
        {project.featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold self-start">
            <span>🏆</span> Featured Project
          </div>
        )}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-text"
        >
          {project.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text/70 leading-relaxed"
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cards border border-borders hover:border-primary/50 text-text hover:text-primary font-medium rounded-lg transition-colors">
              <FaGithub className="w-5 h-5" /> View Repository
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors">
              <ExternalLink className="w-5 h-5" /> Live Demo
            </a>
          )}
        </motion.div>
      </section>

      {/* Architecture & Engineering Diagram */}
      <section className="space-y-6 pt-8 border-t border-borders">
        <h2 className="text-2xl font-bold tracking-tight text-text">System Architecture</h2>
        <ArchitectureDiagram type={project.id} />
        <p className="text-sm text-text/60 mt-4 leading-relaxed">
          {project.architecture}
        </p>
      </section>

      {/* Grid: Problem & Tech Stack */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-text">Problem Statement</h2>
          <p className="text-text/70 leading-relaxed bg-background/50 p-6 rounded-xl border border-borders h-full">
            {project.problemSolved}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-text">Tech Stack</h2>
          <ul className="flex flex-wrap gap-2 p-6 rounded-xl border border-borders bg-background/50 h-full content-start">
            {project.technologies.map(tech => (
              <li key={tech} className="px-3 py-1.5 bg-cards border border-borders/50 rounded-md text-sm font-medium text-text/90">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-text flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary" /> Key Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features.map(feature => (
            <li key={feature} className="flex items-start gap-3 p-4 glass-card">
              <span className="text-primary mt-1">▹</span>
              <span className="text-text/80">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Engineering Decisions (Challenges & Lessons) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" /> Challenges Faced
          </h2>
          <p className="text-text/70 leading-relaxed text-sm p-5 glass-card border-l-2 border-l-yellow-500 h-full">
            {project.challenges}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" /> What I Learned
          </h2>
          <p className="text-text/70 leading-relaxed text-sm p-5 glass-card border-l-2 border-l-secondary h-full">
            {project.lessonsLearned}
          </p>
        </div>
      </section>

    </div>
  );
}
