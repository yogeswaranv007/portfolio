import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Save, ArrowLeft, Plus, X, Server, Layers, Loader2, Code2, CheckCircle2, Cloud, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ArchitectureDiagram } from '../../components/projects/ArchitectureDiagram';

export default function AdminProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Temporary state for adding arrays
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await portfolioService.getProjectById(id);
        if (data) {
          // Ensure architectureData exists to avoid crashes
          if (!data.architectureData) {
            data.architectureData = { label: 'System Architecture', note: '', tiers: [] };
          }
          setProject(data);
        } else {
          toast.error("Project not found");
          navigate('/admin/projects');
        }
      } catch (error) {
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayAdd = (field, value, setter) => {
    if (!value.trim()) return;
    setProject(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    setter('');
  };

  const handleArrayRemove = (field, index) => {
    setProject(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Architecture Editor functions
  const handleArchChange = (field, value) => {
    setProject(prev => ({
      ...prev,
      architectureData: { ...prev.architectureData, [field]: value }
    }));
  };

  const addTier = () => {
    setProject(prev => ({
      ...prev,
      architectureData: {
        ...prev.architectureData,
        tiers: [...prev.architectureData.tiers, { name: 'New Tier', items: [] }]
      }
    }));
  };

  const removeTier = (tierIndex) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers.splice(tierIndex, 1);
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const updateTierName = (tierIndex, name) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].name = name;
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const addArchItem = (tierIndex) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].items.push({ name: 'New Item', role: '', subItems: [] });
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const removeArchItem = (tierIndex, itemIndex) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].items.splice(itemIndex, 1);
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const updateArchItem = (tierIndex, itemIndex, field, value) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].items[itemIndex][field] = value;
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };
  
  const addSubItem = (tierIndex, itemIndex) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      if (!newTiers[tierIndex].items[itemIndex].subItems) {
        newTiers[tierIndex].items[itemIndex].subItems = [];
      }
      newTiers[tierIndex].items[itemIndex].subItems.push('New Sub-item');
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const removeSubItem = (tierIndex, itemIndex, subIndex) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].items[itemIndex].subItems.splice(subIndex, 1);
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const updateSubItem = (tierIndex, itemIndex, subIndex, value) => {
    setProject(prev => {
      const newTiers = [...prev.architectureData.tiers];
      newTiers[tierIndex].items[itemIndex].subItems[subIndex] = value;
      return { ...prev, architectureData: { ...prev.architectureData, tiers: newTiers } };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await portfolioService.saveProject(project);
      toast.success("Project saved successfully!");
      // Optionally navigate back, or stay to keep editing
    } catch (error) {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading project...</div>;
  if (!project) return null;

  return (
    <div className="space-y-8 pb-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="p-2 hover:bg-background rounded-lg text-text/60 hover:text-text transition-colors border border-transparent hover:border-borders">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text">Edit Project</h1>
            <p className="text-text/60 mt-1">Configure project details and system architecture.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center gap-2 disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Basic Information */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border border-borders/50 space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1">Project Title</label>
              <input type="text" name="title" value={project.title || ''} onChange={handleChange} className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none" />
            </div>
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={project.featured || false} onChange={handleChange} className="w-5 h-5 accent-primary rounded bg-background border-borders" />
                <span className="text-sm font-medium text-text">Featured Project 🏆</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="enabled" checked={project.enabled !== false} onChange={handleChange} className="w-5 h-5 accent-primary rounded bg-background border-borders" />
                <span className="text-sm font-medium text-text">Visible to Public 👁️</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">Short Description</label>
            <textarea name="description" value={project.description || ''} onChange={handleChange} rows="2" className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none resize-y" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1">GitHub URL</label>
              <input type="text" name="githubUrl" value={project.githubUrl || ''} onChange={handleChange} className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1">Live Demo URL</label>
              <input type="text" name="liveUrl" value={project.liveUrl || ''} onChange={handleChange} className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none" />
            </div>
          </div>
        </motion.section>

        {/* Deep Dive Information */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl border border-borders/50 space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4">Deep Dive</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">The Problem Solved</label>
            <textarea name="problemSolved" value={project.problemSolved || ''} onChange={handleChange} rows="3" className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none resize-y" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">Challenges Faced</label>
            <textarea name="challenges" value={project.challenges || ''} onChange={handleChange} rows="3" className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none resize-y" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 ml-1">Lessons Learned</label>
            <textarea name="lessonsLearned" value={project.lessonsLearned || ''} onChange={handleChange} rows="3" className="w-full p-3 bg-background border border-borders rounded-xl focus:border-primary focus:outline-none resize-y" />
          </div>
        </motion.section>

        {/* Arrays: Technologies & Features */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl border border-borders/50 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tech Stack */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4 flex items-center gap-2"><Code2 className="w-5 h-5 text-secondary" /> Tech Stack</h2>
            <div className="flex gap-2">
              <input type="text" value={newTech} onChange={e => setNewTech(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('technologies', newTech, setNewTech))} placeholder="Add technology..." className="flex-1 p-2.5 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none" />
              <button type="button" onClick={() => handleArrayAdd('technologies', newTech, setNewTech)} className="p-2.5 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-colors"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 bg-background border border-borders/50 rounded-lg text-sm flex items-center gap-2 group">
                  {tech}
                  <button type="button" onClick={() => handleArrayRemove('technologies', i)} className="text-text/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Key Features</h2>
            <div className="flex gap-2">
              <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('features', newFeature, setNewFeature))} placeholder="Add feature..." className="flex-1 p-2.5 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none" />
              <button type="button" onClick={() => handleArrayAdd('features', newFeature, setNewFeature)} className="p-2.5 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-colors"><Plus className="w-5 h-5" /></button>
            </div>
            <ul className="space-y-2">
              {project.features?.map((feature, i) => (
                <li key={i} className="p-2.5 bg-background border border-borders/50 rounded-lg text-sm flex items-start gap-2 group">
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="flex-1">{feature}</span>
                  <button type="button" onClick={() => handleArrayRemove('features', i)} className="text-text/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Architecture Editor */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl border border-borders/50 space-y-6">
          <div className="flex items-center justify-between border-b border-borders/50 pb-4">
            <h2 className="text-xl font-bold text-text flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> Architecture Diagram Editor</h2>
          </div>

          {/* Frontend */}
          <div className="border border-borders/50 rounded-xl p-4 bg-background/30 space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <Layers className="w-5 h-5 text-text/40" />
               <h3 className="font-bold text-text">Frontend</h3>
            </div>
            <div className="flex gap-2">
              <input type="text" value={project.architectureData?.frontend?.title || ''} onChange={e => handleArchChange('frontend', { ...project.architectureData.frontend, title: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Title (e.g. React)" />
              <input type="text" value={project.architectureData?.frontend?.subtitle || ''} onChange={e => handleArchChange('frontend', { ...project.architectureData.frontend, subtitle: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Subtitle" />
              <input type="text" value={project.architectureData?.frontend?.icon || ''} onChange={e => handleArchChange('frontend', { ...project.architectureData.frontend, icon: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Icon (e.g. FaReact)" />
            </div>
          </div>

          {/* Backend */}
          <div className="border border-primary/20 rounded-xl p-4 bg-primary/5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <Server className="w-5 h-5 text-primary" />
               <h3 className="font-bold text-primary">Core Backend</h3>
            </div>
            <div className="flex gap-2">
              <input type="text" value={project.architectureData?.backend?.title || ''} onChange={e => handleArchChange('backend', { ...project.architectureData.backend, title: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Title (e.g. Spring Boot)" />
              <input type="text" value={project.architectureData?.backend?.subtitle || ''} onChange={e => handleArchChange('backend', { ...project.architectureData.backend, subtitle: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Subtitle" />
              <input type="text" value={project.architectureData?.backend?.icon || ''} onChange={e => handleArchChange('backend', { ...project.architectureData.backend, icon: e.target.value })} className="flex-1 p-2 bg-cards border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Icon" />
            </div>
          </div>

          {/* Services */}
          <div className="border border-borders/50 rounded-xl p-4 bg-background/30 space-y-4">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-text/40" />
                  <h3 className="font-bold text-text">Downstream Services</h3>
               </div>
               <button type="button" onClick={() => setProject(p => ({ ...p, architectureData: { ...p.architectureData, services: [...(p.architectureData.services || []), { title: 'New Service', subtitle: '', icon: '', items: [] }] } }))} className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                 <Plus className="w-3 h-3" /> Add Service
               </button>
            </div>
            
            <div className="space-y-4">
              {project.architectureData?.services?.map((svc, sIdx) => (
                <div key={sIdx} className="bg-cards border border-borders/50 rounded-lg p-3 space-y-3 relative">
                  <button type="button" onClick={() => setProject(p => {
                      const newSvc = [...p.architectureData.services];
                      newSvc.splice(sIdx, 1);
                      return { ...p, architectureData: { ...p.architectureData, services: newSvc } };
                  })} className="absolute top-2 right-2 p-1 text-text/40 hover:text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
                  
                  <div className="flex gap-2 pr-8">
                    <input type="text" value={svc.title} onChange={e => setProject(p => {
                      const newSvc = [...p.architectureData.services];
                      newSvc[sIdx].title = e.target.value;
                      return { ...p, architectureData: { ...p.architectureData, services: newSvc } };
                    })} className="flex-1 p-2 bg-background border border-borders rounded focus:border-primary focus:outline-none text-sm font-bold" placeholder="Title" />
                    <input type="text" value={svc.subtitle || ''} onChange={e => setProject(p => {
                      const newSvc = [...p.architectureData.services];
                      newSvc[sIdx].subtitle = e.target.value;
                      return { ...p, architectureData: { ...p.architectureData, services: newSvc } };
                    })} className="flex-1 p-2 bg-background border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Subtitle" />
                    <input type="text" value={svc.icon || ''} onChange={e => setProject(p => {
                      const newSvc = [...p.architectureData.services];
                      newSvc[sIdx].icon = e.target.value;
                      return { ...p, architectureData: { ...p.architectureData, services: newSvc } };
                    })} className="flex-1 p-2 bg-background border border-borders rounded focus:border-primary focus:outline-none text-sm" placeholder="Icon" />
                  </div>
                </div>
              ))}
              {!project.architectureData?.services?.length && <p className="text-sm text-text/40 p-2">No downstream services added.</p>}
            </div>
          </div>
          
          <div className="pt-8 border-t border-borders/50">
            <h3 className="text-lg font-bold text-text mb-4">Architecture Preview</h3>
            <div className="bg-cards/30 p-8 rounded-2xl border border-borders/50 overflow-hidden">
               {/* Use the public ArchitectureDiagram component to preview */}
               <ArchitectureDiagram data={project.architectureData} />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
