import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { portfolioService } from '../services/portfolioService';
import { FolderGit2 } from 'lucide-react';

const CATEGORIES = ['All', 'Java / Spring Boot', 'AI / ML', 'Cloud', 'Full Stack'];

const getProjectCategories = (project) => {
  const cats = ['All'];
  const techString = project.technologies.join(' ').toLowerCase();
  
  if (techString.includes('java') || techString.includes('spring boot')) cats.push('Java / Spring Boot');
  if (techString.includes('ai') || techString.includes('ml') || techString.includes('python') || techString.includes('fastapi') || techString.includes('groq')) cats.push('AI / ML');
  if (techString.includes('aws') || techString.includes('azure') || techString.includes('cloud')) cats.push('Cloud');
  if (techString.includes('react') && (techString.includes('node') || techString.includes('java') || techString.includes('python'))) cats.push('Full Stack');
  
  return cats;
};

export function ProjectsListView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await portfolioService.getProjects();
      // Only show visible projects in the public view
      setProjectsData(data.filter(p => p.visible !== false));
    };
    loadData();
  }, []);

  const filteredProjects = projectsData.filter(p => getProjectCategories(p).includes(activeFilter));

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-6">
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
          className="text-lg text-text/70 max-w-2xl font-light"
        >
          A collection of full-stack applications, microservices, and AI integrations I've built to solve real-world problems.
        </motion.p>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 pt-4"
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : 'bg-cards/50 border border-borders text-text/70 hover:text-text hover:border-primary/50 backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
