import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { FolderGit2, Code2, Trophy, Mail, ArrowUpRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    achievements: 0,
    unreadMessages: 0,
    recentProjects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projects, skills, achievements, messages] = await Promise.all([
          portfolioService.getProjects(),
          portfolioService.getSkills(),
          portfolioService.getAchievements(),
          portfolioService.getMessages()
        ]);

        const unreadMsgs = messages.filter(m => !m.read).length;
        // Simple mock of 'recently updated' by taking the last 3 in the array or by some date if available
        const recentProjs = [...projects].slice(0, 3);

        setStats({
          projects: projects.length,
          skills: skills.length,
          achievements: achievements.length,
          unreadMessages: unreadMsgs,
          recentProjects: recentProjs
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderGit2, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    { label: 'Total Skills', value: stats.skills, icon: Code2, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
    { label: 'Achievements', value: stats.achievements, icon: Trophy, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  ];

  if (loading) {
    return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading statistics...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">Dashboard Overview</h1>
        <p className="text-text/60 mt-1">Welcome to the portfolio CMS prototype.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-start justify-between border border-borders/50 hover:border-borders transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-text/60">{stat.label}</p>
              <h3 className="text-3xl font-bold text-text mt-2">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl border border-borders/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-text">
              <Activity className="w-5 h-5 text-primary" /> Recent Projects
            </h2>
          </div>
          <div className="space-y-4">
            {stats.recentProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-borders/50 hover:bg-cards transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <FolderGit2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text">{project.title}</h4>
                    <p className="text-xs text-text/60">{project.technologies.slice(0, 3).join(' • ')}</p>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-background rounded border border-borders text-text/70 flex items-center gap-1">
                  Active <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>
            ))}
            {stats.recentProjects.length === 0 && (
              <p className="text-text/50 text-sm text-center py-4">No projects found.</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl border border-borders/50 p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
            <ArrowUpRight className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text">Ready to Edit?</h3>
          <p className="text-sm text-text/60">
            Use the sidebar navigation to update your profile, add new skills, manage projects, or check messages. All changes are saved instantly to localStorage.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
