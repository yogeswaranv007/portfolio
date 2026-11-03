import React, { useState, useEffect } from 'react';
import { FolderGit2 } from 'lucide-react';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { portfolioService } from '../services/portfolioService';

const CATEGORIES = ['All', 'Java / Spring Boot', 'AI Integrations', 'Full Stack'];

const matchesCategory = (project, category) => {
  if (category === 'All') return true;
  const tech = (project.technologies || []).join(' ').toLowerCase();
  if (category === 'Java / Spring Boot') {
    return tech.includes('java') || tech.includes('spring boot');
  }
  if (category === 'AI Integrations') {
    return tech.includes('ai') || tech.includes('groq') || tech.includes('rag') || tech.includes('fastapi') || tech.includes('bhashini');
  }
  if (category === 'Full Stack') {
    return tech.includes('react') && (tech.includes('node') || tech.includes('express') || tech.includes('spring'));
  }
  return true;
};

export function ProjectsListView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projectsData, setProjectsData] = useState(() => {
    const local = portfolioService.getLocalProjects();
    return (local || []).filter((p) => p.visible !== false);
  });

  useEffect(() => {
    let isMounted = true;
    portfolioService.getProjects().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setProjectsData(data.filter((p) => p.visible !== false));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const filteredProjects = projectsData.filter((p) => matchesCategory(p, activeFilter));

  return (
    <section className="space-y-8" id="projects">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Featured Projects
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Production platforms, micro-services, and hackathon prototypes
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-cards p-1 rounded-xl border border-borders self-start sm:self-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                activeFilter === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-background'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
