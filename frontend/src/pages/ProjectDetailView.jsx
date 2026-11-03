import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import { ProjectVisualPreview } from '../components/projects/ProjectVisualPreview';
import { ArrowLeft, ExternalLink, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectDetailView() {
  const { id } = useParams();
  const [project, setProject] = useState(() => portfolioService.getLocalProjectById(id));
  const [loading, setLoading] = useState(() => !portfolioService.getLocalProjectById(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

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
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  const hasLiveLink = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasCodeLink = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
  const codeLabel = project.githubLabel || (project.id === 'mospi-survey' ? 'Team repository' : 'Source Code');

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8 px-4">
      {/* Back to Projects */}
      <div>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Header Banner */}
      <header className="space-y-4 border-b border-borders pb-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.type && (
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              {project.type}
            </span>
          )}
          {project.period && (
            <span className="text-xs font-mono text-text-muted">
              {project.period}
            </span>
          )}
          {project.id === 'mospi-survey' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" /> Top 25 Finalist (Statathon 2025)
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {hasLiveLink && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-sm"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {hasCodeLink && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cards hover:bg-cards-hover border border-borders hover:border-primary/50 text-text text-sm font-medium transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>{codeLabel}</span>
            </a>
          )}
        </div>
      </header>

      {/* Visual Showcase (App Mockup & Architecture Diagram) */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Interactive System Showcase
        </h2>
        <ProjectVisualPreview project={project} />
      </section>

      {/* Main Content Sections */}
      <div className="space-y-8">
        {/* Role & Contributions */}
        {project.myRole && (
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-2">
            <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              My Role &amp; Contributions
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {project.myRole}
            </p>
          </div>
        )}

        {/* Problem Statement */}
        {project.problemSolved && (
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-2">
            <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-muted">
              Problem Solved
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {project.problemSolved}
            </p>
          </div>
        )}

        {/* Technologies Stack */}
        <div className="p-6 rounded-2xl bg-cards border border-borders space-y-3">
          <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-muted">
            Technologies &amp; Architecture
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-background text-text border border-borders"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Delivered Features */}
        {Array.isArray(project.features) && project.features.length > 0 && (
          <div className="p-6 rounded-2xl bg-cards border border-borders space-y-4">
            <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-muted">
              Key Features &amp; Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Challenges & Takeaways */}
        {(project.challenges || project.lessonsLearned) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges && (
              <div className="p-6 rounded-2xl bg-cards border border-borders space-y-2">
                <h3 className="text-xs font-semibold font-mono uppercase tracking-wider text-text-muted">
                  Engineering Challenges
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}
            {project.lessonsLearned && (
              <div className="p-6 rounded-2xl bg-cards border border-borders space-y-2">
                <h3 className="text-xs font-semibold font-mono uppercase tracking-wider text-text-muted">
                  Takeaways &amp; Growth
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
