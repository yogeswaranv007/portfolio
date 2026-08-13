import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, FolderGit2, CheckCircle2, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await portfolioService.getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      description: '',
      problemSolved: '',
      technologies: [],
      features: [],
      challenges: '',
      lessonsLearned: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      enabled: true,
      architectureData: {
        frontend: { title: 'Frontend', subtitle: 'UI Component', icon: 'FaReact', items: [] },
        backend: { title: 'Backend', subtitle: 'Core API', icon: 'FaNodeJs', items: [] },
        services: []
      }
    };
    
    try {
      await portfolioService.saveProject(newProject);
      navigate(`/admin/projects/${newProject.id}/edit`);
    } catch (error) {
      toast.error("Failed to create new project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await portfolioService.deleteProject(id);
      toast.success("Project deleted");
      loadProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleToggleEnable = async (project) => {
    const updated = { ...project, enabled: project.enabled === false ? true : false };
    try {
      await portfolioService.saveProject(updated);
      loadProjects();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const moveProject = async (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === projects.length - 1)
    ) return;
    
    const newProjects = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
    
    setProjects(newProjects);
    
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
      toast.success("Reordered successfully");
    } catch (e) {
      toast.error("Failed to save order");
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading projects...</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Projects Management</h1>
          <p className="text-text/60 mt-1">Add, edit, reorder, and configure your portfolio projects.</p>
        </div>
        <button 
          onClick={handleAddProject}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-borders/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-borders/50 bg-background/50">
                <th className="p-4 font-semibold text-text/70 w-16">Order</th>
                <th className="p-4 font-semibold text-text/70">Project Title</th>
                <th className="p-4 font-semibold text-text/70">Tech Stack Overview</th>
                <th className="p-4 font-semibold text-text/70 w-24">Featured</th>
                <th className="p-4 font-semibold text-text/70 w-24">Status</th>
                <th className="p-4 font-semibold text-text/70 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id} className="border-b border-borders/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveProject(index, 'down')} disabled={index === projects.length - 1} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                        <FolderGit2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text line-clamp-1">{project.title}</h4>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="px-2 py-0.5 bg-background border border-borders/50 rounded text-xs text-text/70 truncate max-w-[100px]">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-background border border-borders/50 rounded text-xs text-text/70">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    {project.featured ? (
                      <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold rounded">Yes</span>
                    ) : (
                      <span className="text-text/30 text-xs">No</span>
                    )}
                  </td>
                  
                  <td className="p-4">
                    <button onClick={() => handleToggleEnable(project)}>
                        {project.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-text/30" />}
                    </button>
                  </td>
                  
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/admin/projects/${project.id}/edit`}
                        className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text/50">
                    No projects found. Add your first project!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
