import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ProjectVisualPreview } from '../projects/ProjectVisualPreview';
import { Tilt3DCard } from '../ui/Tilt3DCard';

export function ProjectCard({ project }) {
  const hasLiveLink = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasCodeLink = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
  const codeLabel = project.githubLabel || (project.id === 'mospi-survey' ? 'Team repository' : 'Source Code');

  return (
    <Tilt3DCard
      maxTilt={4}
      scale={1.01}
      glare={true}
      className="h-full rounded-2xl group"
    >
      <article className="h-full p-6 sm:p-7 rounded-2xl bg-cards border border-borders group-hover:border-primary/50 transition-colors duration-300 shadow-sm flex flex-col justify-between space-y-5">
        {/* 1. Header Row: Title, Badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {project.type && (
                <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {project.type}
                </span>
              )}
              {project.period && (
                <span className="text-xs font-mono text-text-muted">
                  {project.period}
                </span>
              )}
            </div>

            {project.id === 'mospi-survey' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" /> Top 25 Finalist
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text group-hover:text-primary transition-colors">
            <Link to={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* 2. Visual Centerpiece: Interactive App Preview & Architecture Diagram */}
        <div className="pt-1">
          <ProjectVisualPreview project={project} />
        </div>

        {/* 3. Compact Key Highlights */}
        <div className="space-y-4 pt-2">
          {project.myRole && (
            <div className="text-xs text-text bg-background/80 p-3 rounded-xl border border-borders/80">
              <span className="font-semibold text-primary font-mono uppercase tracking-wide mr-1.5">
                My Part:
              </span>
              <span className="text-text-muted font-normal">
                {project.myRole}
              </span>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono rounded bg-background text-text-muted border border-borders/70"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-background text-text-muted/60 border border-borders/40">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-borders/60">
            <div className="flex flex-wrap items-center gap-2">
              {hasLiveLink && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-all shadow-sm hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {hasCodeLink && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-background hover:bg-cards border border-borders hover:border-primary/50 text-text text-xs font-medium transition-colors"
                  title={codeLabel}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>{codeLabel}</span>
                </a>
              )}
            </div>

            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors font-mono"
            >
              <span>Specs &rarr;</span>
            </Link>
          </div>
        </div>
      </article>
    </Tilt3DCard>
  );
}
