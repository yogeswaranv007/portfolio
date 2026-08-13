import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const iconMap = {
  github: FaGithub,
  code: Code2,
  terminal: Terminal
};

export function ProfileCard({ profile, index }) {
  const Icon = iconMap[profile.icon] || Code2;
  
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className="glass-card p-5 flex items-center justify-between gap-4 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)] hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="p-3 rounded-xl bg-background border border-borders/50 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          <Icon className="w-6 h-6 text-text group-hover:text-white transition-colors" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">{profile.platform}</h4>
          <p className="text-xs text-text/50 mt-1 font-medium tracking-wide">{profile.username}</p>
        </div>
      </div>

      <ExternalLink className="w-4 h-4 text-text/30 group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 relative z-10" />
    </motion.a>
  );
}
