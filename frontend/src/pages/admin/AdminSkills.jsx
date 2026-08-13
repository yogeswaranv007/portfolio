import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Plus, Edit2, Trash2, Code2, Save, X, ArrowUp, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', enabled: true });
  
  // New skill state
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', category: 'Web & Backend', enabled: true });

  const categories = ["Programming Languages", "Web & Backend", "Database", "Tools", "Core Competencies"];

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await portfolioService.getSkills();
      setSkills(data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSkill = async (skillData) => {
    try {
      await portfolioService.saveSkill(skillData);
      toast.success("Skill saved successfully!");
      loadSkills();
      setEditingId(null);
      setIsAdding(false);
      setNewForm({ name: '', category: 'Web & Backend', enabled: true });
    } catch (error) {
      toast.error("Failed to save skill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await portfolioService.deleteSkill(id);
      toast.success("Skill deleted");
      loadSkills();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const handleToggleEnable = async (skill) => {
    const updated = { ...skill, enabled: !skill.enabled };
    try {
      await portfolioService.saveSkill(updated);
      loadSkills();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const moveSkill = async (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === skills.length - 1)
    ) return;
    
    const newSkills = [...skills];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newSkills[index], newSkills[targetIndex]] = [newSkills[targetIndex], newSkills[index]];
    
    setSkills(newSkills);
    
    // Note: Reordering persists by resaving the entire array. 
    // Since our service saves individually, we will directly overwrite localStorage here
    // just for the sake of reordering the array, or we can add a reorder function to the service.
    // For now, we'll overwrite the local storage directly via the service logic.
    try {
      localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
      toast.success("Reordered successfully");
    } catch (e) {
      toast.error("Failed to save order");
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading skills...</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Skills Management</h1>
          <p className="text-text/60 mt-1">Add, edit, categorize, and reorder your technology stack.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" /> Add Skill
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-borders/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-borders/50 bg-background/50">
                <th className="p-4 font-semibold text-text/70 w-16">Order</th>
                <th className="p-4 font-semibold text-text/70">Skill Name</th>
                <th className="p-4 font-semibold text-text/70">Category</th>
                <th className="p-4 font-semibold text-text/70 w-24">Status</th>
                <th className="p-4 font-semibold text-text/70 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Add New Row */}
              <AnimatePresence>
                {isAdding && (
                  <motion.tr 
                    initial={{ opacity: 0, backgroundColor: 'rgba(37,99,235,0.1)' }}
                    animate={{ opacity: 1, backgroundColor: 'rgba(37,99,235,0.05)' }}
                    exit={{ opacity: 0 }}
                    className="border-b border-borders/50"
                  >
                    <td className="p-4">
                      <span className="text-xs text-text/40">New</span>
                    </td>
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={newForm.name}
                        onChange={e => setNewForm({...newForm, name: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                        placeholder="e.g. React.js"
                        autoFocus
                      />
                    </td>
                    <td className="p-4">
                      <select 
                        value={newForm.category}
                        onChange={e => setNewForm({...newForm, category: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-text"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td className="p-4">
                      <button onClick={() => setNewForm({...newForm, enabled: !newForm.enabled})}>
                        {newForm.enabled ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveSkill(newForm)}
                          disabled={!newForm.name.trim()}
                          className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setIsAdding(false)}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-text transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>

              {/* Existing Skills */}
              {skills.map((skill, index) => (
                <tr key={skill.id} className="border-b border-borders/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveSkill(index, 'up')} disabled={index === 0} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveSkill(index, 'down')} disabled={index === skills.length - 1} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                  </td>
                  
                  <td className="p-4 font-medium text-text">
                    {editingId === skill.id ? (
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                      />
                    ) : (
                      skill.name
                    )}
                  </td>
                  
                  <td className="p-4">
                    {editingId === skill.id ? (
                      <select 
                        value={editForm.category}
                        onChange={e => setEditForm({...editForm, category: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-text"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <span className="px-2.5 py-1 bg-background border border-borders/50 rounded-md text-xs text-text/70">
                        {skill.category}
                      </span>
                    )}
                  </td>
                  
                  <td className="p-4">
                    {editingId === skill.id ? (
                      <button onClick={() => setEditForm({...editForm, enabled: !editForm.enabled})}>
                        {editForm.enabled ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    ) : (
                      <button onClick={() => handleToggleEnable(skill)}>
                         {skill.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-text/30" />}
                      </button>
                    )}
                  </td>
                  
                  <td className="p-4 text-right">
                    {editingId === skill.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveSkill(editForm)}
                          disabled={!editForm.name.trim()}
                          className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-text transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingId(skill.id); setEditForm(skill); }}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(skill.id)}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {skills.length === 0 && !isAdding && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text/50">
                    No skills found. Add some!
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
