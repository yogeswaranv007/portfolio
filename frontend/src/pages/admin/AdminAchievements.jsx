import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Plus, Edit2, Trash2, Save, X, ArrowUp, ArrowDown, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ year: '', title: '', description: '', enabled: true });
  
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ year: new Date().getFullYear().toString(), title: '', description: '', enabled: true });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const data = await portfolioService.getAchievements();
      setAchievements(data);
    } catch (error) {
      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAchievement = async (data) => {
    try {
      await portfolioService.saveAchievement(data);
      toast.success("Achievement saved successfully!");
      loadAchievements();
      setEditingId(null);
      setIsAdding(false);
      setNewForm({ year: new Date().getFullYear().toString(), title: '', description: '', enabled: true });
    } catch (error) {
      toast.error("Failed to save achievement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await portfolioService.deleteAchievement(id);
      toast.success("Achievement deleted");
      loadAchievements();
    } catch (error) {
      toast.error("Failed to delete achievement");
    }
  };

  const handleToggleEnable = async (item) => {
    const updated = { ...item, enabled: item.enabled === false ? true : false };
    try {
      await portfolioService.saveAchievement(updated);
      loadAchievements();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const moveItem = async (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === achievements.length - 1)
    ) return;
    
    const newList = [...achievements];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    
    setAchievements(newList);
    
    try {
      // Save the new order to the backend
      const updatedList = newList.map((item, i) => ({ ...item, displayOrder: i }));
      await Promise.all(updatedList.map(item => portfolioService.saveAchievement(item)));
      toast.success("Reordered successfully");
      loadAchievements(); // Refresh to ensure sync
    } catch (e) {
      toast.error("Failed to save order");
      loadAchievements(); // Revert on failure
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading achievements...</div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Timeline & Achievements</h1>
          <p className="text-text/60 mt-1">Manage your educational and professional milestones.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={async () => {
              if (window.confirm("Are you sure you want to restore original achievements? This will overwrite your current list.")) {
                await portfolioService.resetAchievements();
                loadAchievements();
                toast.success("Achievements restored!");
              }
            }}
            className="px-4 py-2 bg-cards hover:bg-background text-text font-medium rounded-xl border border-borders transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" /> Restore Defaults
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" /> Add Milestone
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-borders/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-borders/50 bg-background/50">
                <th className="p-4 font-semibold text-text/70 w-16">Order</th>
                <th className="p-4 font-semibold text-text/70 w-32">Year</th>
                <th className="p-4 font-semibold text-text/70">Details</th>
                <th className="p-4 font-semibold text-text/70 w-24">Status</th>
                <th className="p-4 font-semibold text-text/70 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              
              <AnimatePresence>
                {isAdding && (
                  <motion.tr 
                    initial={{ opacity: 0, backgroundColor: 'rgba(37,99,235,0.1)' }}
                    animate={{ opacity: 1, backgroundColor: 'rgba(37,99,235,0.05)' }}
                    exit={{ opacity: 0 }}
                    className="border-b border-borders/50"
                  >
                    <td className="p-4 align-top pt-6">
                      <span className="text-xs text-text/40">New</span>
                    </td>
                    <td className="p-4 align-top">
                      <input 
                        type="text" 
                        value={newForm.year}
                        onChange={e => setNewForm({...newForm, year: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                        placeholder="e.g. 2024"
                      />
                    </td>
                    <td className="p-4">
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          value={newForm.title}
                          onChange={e => setNewForm({...newForm, title: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none font-bold"
                          placeholder="Milestone Title"
                          autoFocus
                        />
                        <textarea 
                          value={newForm.description}
                          onChange={e => setNewForm({...newForm, description: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-sm resize-y"
                          placeholder="Description..."
                          rows="2"
                        />
                      </div>
                    </td>
                    <td className="p-4 align-top pt-6">
                      <button onClick={() => setNewForm({...newForm, enabled: !newForm.enabled})}>
                        {newForm.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    </td>
                    <td className="p-4 text-right align-top pt-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveAchievement(newForm)}
                          disabled={!newForm.title.trim()}
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

              {achievements.map((item, index) => (
                <tr key={item.id} className="border-b border-borders/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4 align-top pt-6">
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveItem(index, 'down')} disabled={index === achievements.length - 1} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                  </td>
                  
                  <td className="p-4 align-top pt-6 font-medium text-text">
                    {editingId === item.id ? (
                      <input 
                        type="text" 
                        value={editForm.year}
                        onChange={e => setEditForm({...editForm, year: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                      />
                    ) : (
                      <span className="text-primary font-bold">{item.year}</span>
                    )}
                  </td>
                  
                  <td className="p-4 py-6">
                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          value={editForm.title}
                          onChange={e => setEditForm({...editForm, title: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none font-bold"
                        />
                        <textarea 
                          value={editForm.description}
                          onChange={e => setEditForm({...editForm, description: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-sm resize-y"
                          rows="3"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <h4 className="font-bold text-text flex items-center gap-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-text/70">{item.description}</p>
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4 align-top pt-6">
                    {editingId === item.id ? (
                      <button onClick={() => setEditForm({...editForm, enabled: !editForm.enabled})}>
                        {editForm.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    ) : (
                      <button onClick={() => handleToggleEnable(item)}>
                         {item.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-text/30" />}
                      </button>
                    )}
                  </td>
                  
                  <td className="p-4 text-right align-top pt-6">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveAchievement(editForm)}
                          disabled={!editForm.title.trim()}
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
                          onClick={() => { setEditingId(item.id); setEditForm(item); }}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {achievements.length === 0 && !isAdding && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text/50">
                    No achievements found. Add some!
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
