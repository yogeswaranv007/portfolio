import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { ImageCropper } from '../../components/admin/ImageCropper';
import { Save, User, Briefcase, FileText, Camera, Code, Mail, Link as LinkIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Image crop state
  const [imageToCrop, setImageToCrop] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await portfolioService.getProfile();
        setProfile(data);
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e) => {
    const value = e.target.value;
    const rolesArray = value.split(',').map(role => role.trim());
    setProfile(prev => ({ ...prev, roles: rolesArray }));
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = (croppedImageBase64) => {
    setProfile(prev => ({ ...prev, imageBase64: croppedImageBase64 }));
    setImageToCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await portfolioService.updateProfile(profile);
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading profile...</div>;
  }

  // Use the cropped image if available, otherwise use the original default
  const displayImage = profile.imageBase64 || '/yoges_profile.jpeg';

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">Profile Editor</h1>
        <p className="text-text/60 mt-1">Manage your personal information, roles, and profile image.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Picture Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl border border-borders/50 flex flex-col items-center text-center space-y-4 lg:col-span-1 h-fit"
          >
            <div className="relative group w-40 h-40">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/30 relative bg-background">
                <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Change Photo</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <div>
              <h3 className="font-bold text-text">{profile.name}</h3>
              <p className="text-sm text-text/60">{profile.roles?.[0] || 'Role not set'}</p>
            </div>
            <p className="text-xs text-text/40 italic">Click the image to upload a new profile picture. It will be saved as Base64 in localStorage.</p>
          </motion.div>

          {/* Basic Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl border border-borders/50 lg:col-span-2 space-y-6"
          >
            <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input 
                    type="text" 
                    name="name"
                    value={profile.name || ''}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">Location</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input 
                    type="text" 
                    name="location"
                    value={profile.location || ''}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1 flex justify-between">
                <span>Roles (Comma separated)</span>
                <span className="text-xs text-text/40 font-normal">Used in Typewriter effect</span>
              </label>
              <input 
                type="text" 
                value={Array.isArray(profile.roles) ? profile.roles.join(', ') : (profile.roles || '')}
                onChange={handleRolesChange}
                className="w-full p-3.5 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                placeholder="e.g. Software Engineer, Full Stack Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text/90 ml-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-text/40" /> About Me
              </label>
              <textarea 
                name="about"
                value={profile.about || ''}
                onChange={handleChange}
                rows="5" 
                className="w-full p-4 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all resize-y"
              />
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl border border-borders/50 lg:col-span-3 space-y-6"
          >
            <h2 className="text-xl font-bold text-text border-b border-borders/50 pb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-secondary" /> Social Links & Contact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input 
                    type="email" 
                    name="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 font-bold">#</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">GitHub Username</label>
                <div className="relative">
                  <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input 
                    type="text" 
                    name="github"
                    value={profile.github || 'yogeswaranv007'}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 ml-1">LinkedIn Profile</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input 
                    type="text" 
                    name="linkedin"
                    value={profile.linkedin || ''}
                    onChange={handleChange}
                    className="w-full p-3.5 pl-12 rounded-xl bg-background border border-borders focus:border-primary text-text focus:outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="group px-8 py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            Save Profile
          </button>
        </div>
      </form>

      {/* Image Cropper Modal */}
      <AnimatePresence>
        {imageToCrop && (
          <ImageCropper 
            imageSrc={imageToCrop} 
            onCropComplete={handleCropComplete} 
            onCancel={() => {
              setImageToCrop(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
