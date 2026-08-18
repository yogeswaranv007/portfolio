import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioService } from '../services/portfolioService';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, Server, Code, Blocks, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export function ProjectDetailView() {
  const { id } = useParams();
  
  // Local-First: Synchronously load matching project from local/cache data
  const [project, setProject] = useState(() => portfolioService.getLocalProjectById(id));
  const [loading, setLoading] = useState(() => !portfolioService.getLocalProjectById(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    // Optional background check for dynamic changes
    portfolioService.getProjectById(id).then((data) => {
      if (isMounted) {
        if (data) setProject(data);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-20 max-w-5xl mx-auto"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants}>
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-text/70 hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>
      </motion.div>

      {/* Hero Banner */}
      <motion.section variants={itemVariants} className="space-y-6 relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        {project.featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-bold tracking-wide uppercase self-start shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <span>🏆</span> Featured Project
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text leading-tight">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-text/70 leading-relaxed font-light max-w-3xl">
          {project.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 pt-6">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-3 bg-cards/80 backdrop-blur-md border border-borders hover:border-primary/50 text-text hover:text-primary font-medium rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" /> View Repository
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" /> Live Demo
            </a>
          )}
        </div>
      </motion.section>

      {/* Grid: Problem & Tech Stack */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-10 border-t border-borders/50">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-text flex items-center gap-2">
            <Blocks className="w-6 h-6 text-primary" /> The Problem
          </h2>
          <div className="text-text/70 leading-relaxed bg-cards/50 backdrop-blur-md p-6 rounded-2xl border border-borders h-full hover:border-primary/30 transition-colors font-light">
            {project.problemSolved}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-text flex items-center gap-2">
            <Code className="w-6 h-6 text-secondary" /> Tech Stack
          </h2>
          <ul className="flex flex-wrap gap-2 p-6 rounded-2xl border border-borders bg-cards/50 backdrop-blur-md h-full content-start hover:border-secondary/30 transition-colors">
            {(project.technologies || []).map((tech, idx) => (
              <motion.li 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                key={tech} 
                className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-text/90 hover:bg-primary hover:text-white transition-colors cursor-default"
              >
                {tech}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* System Architecture */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-text flex items-center gap-3">
            <Server className="w-8 h-8 text-primary" /> System Architecture
          </h2>
          {project.architectureData?.label && (
            <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              {project.architectureData.label}
            </span>
          )}
        </div>
        
        <div className="bg-cards/30 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-borders/50 hover:border-primary/30 transition-all duration-500">
          <ArchitectureDiagram data={project.architectureData} />
        </div>
        
        {project.architectureData?.note && (
          <p className="text-sm text-text/50 text-center italic mt-6 max-w-2xl mx-auto bg-background/50 py-2 px-4 rounded-full border border-borders/50">
            * {project.architectureData.note}
          </p>
        )}
      </motion.section>

      {/* Features */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-text flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary" /> Key Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(project.features || []).map((feature, i) => (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              key={feature} 
              className="group flex items-start gap-4 p-5 glass-card hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-colors">
                <span className="text-primary group-hover:text-white text-sm">✓</span>
              </span>
              <span className="text-text/80 font-light leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Engineering Decisions (Challenges & Lessons) */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="space-y-4 group">
          <h2 className="text-xl font-bold tracking-tight text-text flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" /> Challenges Faced
          </h2>
          <div className="text-text/70 leading-relaxed text-sm p-6 glass-card border-l-4 border-l-yellow-500 h-full group-hover:bg-yellow-500/5 transition-colors font-light">
            {project.challenges}
          </div>
        </div>
        <div className="space-y-4 group">
          <h2 className="text-xl font-bold tracking-tight text-text flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" /> What I Learned
          </h2>
          <div className="text-text/70 leading-relaxed text-sm p-6 glass-card border-l-4 border-l-secondary h-full group-hover:bg-secondary/5 transition-colors font-light">
            {project.lessonsLearned}
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
