import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Plus, Edit2, Trash2, Save, X, ArrowUp, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCodingProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ platform: '', username: '', url: '', icon: 'code', enabled: true });
  
  // New profile state
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ platform: '', username: '', url: '', icon: 'code', enabled: true });

  const icons = ["github", "code", "terminal"];

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await portfolioService.getCodingProfiles();
      setProfiles(data);
    } catch (error) {
      toast.error("Failed to load coding profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      await portfolioService.saveCodingProfile(profileData);
      toast.success("Profile saved successfully!");
      loadProfiles();
      setEditingId(null);
      setIsAdding(false);
      setNewForm({ platform: '', username: '', url: '', icon: 'code', enabled: true });
    } catch (error) {
      toast.error("Failed to save profile");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await portfolioService.deleteCodingProfile(id);
      toast.success("Profile deleted");
      loadProfiles();
    } catch (error) {
      toast.error("Failed to delete profile");
    }
  };

  const handleToggleEnable = async (profile) => {
    const updated = { ...profile, enabled: !profile.enabled };
    try {
      await portfolioService.saveCodingProfile(updated);
      loadProfiles();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const moveProfile = async (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === profiles.length - 1)
    ) return;
    
    const newProfiles = [...profiles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newProfiles[index], newProfiles[targetIndex]] = [newProfiles[targetIndex], newProfiles[index]];
    
    setProfiles(newProfiles);
    
    try {
      const updatedList = newProfiles.map((item, i) => ({ ...item, displayOrder: i }));
      await Promise.all(updatedList.map(item => portfolioService.saveCodingProfile(item)));
      toast.success("Reordered successfully");
      loadProfiles(); 
    } catch (e) {
      toast.error("Failed to save order");
      loadProfiles(); 
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading profiles...</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Coding Profiles</h1>
          <p className="text-text/60 mt-1">Manage your programming platform links and profiles.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" /> Add Profile
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-borders/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-borders/50 bg-background/50">
                <th className="p-4 font-semibold text-text/70 w-16">Order</th>
                <th className="p-4 font-semibold text-text/70">Platform</th>
                <th className="p-4 font-semibold text-text/70">Details</th>
                <th className="p-4 font-semibold text-text/70 w-32">Icon</th>
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
                        value={newForm.platform}
                        onChange={e => setNewForm({...newForm, platform: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none font-bold"
                        placeholder="e.g. LeetCode"
                        autoFocus
                      />
                    </td>
                    <td className="p-4">
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          value={newForm.username}
                          onChange={e => setNewForm({...newForm, username: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                          placeholder="Username"
                        />
                        <input 
                          type="url" 
                          value={newForm.url}
                          onChange={e => setNewForm({...newForm, url: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-sm text-primary"
                          placeholder="https://..."
                        />
                      </div>
                    </td>
                    <td className="p-4 align-top pt-6">
                      <select 
                        value={newForm.icon}
                        onChange={e => setNewForm({...newForm, icon: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-text"
                      >
                        {icons.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td className="p-4 align-top pt-6">
                      <button onClick={() => setNewForm({...newForm, enabled: !newForm.enabled})}>
                        {newForm.enabled ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    </td>
                    <td className="p-4 text-right align-top pt-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveProfile(newForm)}
                          disabled={!newForm.platform.trim() || !newForm.url.trim()}
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

              {profiles.map((profile, index) => (
                <tr key={profile.id} className="border-b border-borders/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4 align-top pt-6">
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveProfile(index, 'up')} disabled={index === 0} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveProfile(index, 'down')} disabled={index === profiles.length - 1} className="text-text/40 hover:text-primary disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                  </td>
                  
                  <td className="p-4 align-top pt-6 font-medium text-text">
                    {editingId === profile.id ? (
                      <input 
                        type="text" 
                        value={editForm.platform}
                        onChange={e => setEditForm({...editForm, platform: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none font-bold"
                      />
                    ) : (
                      <span className="font-bold">{profile.platform}</span>
                    )}
                  </td>
                  
                  <td className="p-4 py-6">
                    {editingId === profile.id ? (
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          value={editForm.username}
                          onChange={e => setEditForm({...editForm, username: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none"
                          placeholder="Username"
                        />
                        <input 
                          type="url" 
                          value={editForm.url}
                          onChange={e => setEditForm({...editForm, url: e.target.value})}
                          className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-sm text-primary"
                          placeholder="URL"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm text-text/70">{profile.username}</p>
                        <a href={profile.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate block max-w-xs">{profile.url}</a>
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4 align-top pt-6">
                    {editingId === profile.id ? (
                      <select 
                        value={editForm.icon}
                        onChange={e => setEditForm({...editForm, icon: e.target.value})}
                        className="w-full p-2 bg-background border border-borders rounded-lg focus:border-primary focus:outline-none text-text"
                      >
                        {icons.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <span className="px-2.5 py-1 bg-background border border-borders/50 rounded-md text-xs text-text/70 capitalize">
                        {profile.icon}
                      </span>
                    )}
                  </td>
                  
                  <td className="p-4 align-top pt-6">
                    {editingId === profile.id ? (
                      <button onClick={() => setEditForm({...editForm, enabled: !editForm.enabled})}>
                        {editForm.enabled ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    ) : (
                      <button onClick={() => handleToggleEnable(profile)}>
                         {profile.enabled !== false ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-text/30" />}
                      </button>
                    )}
                  </td>
                  
                  <td className="p-4 text-right align-top pt-6">
                    {editingId === profile.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveProfile(editForm)}
                          disabled={!editForm.platform.trim() || !editForm.url.trim()}
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
                          onClick={() => { setEditingId(profile.id); setEditForm(profile); }}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(profile.id)}
                          className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {profiles.length === 0 && !isAdding && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text/50">
                    No coding profiles found. Add some!
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
