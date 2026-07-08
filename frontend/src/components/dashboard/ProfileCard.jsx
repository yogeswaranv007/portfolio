import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 flex items-center gap-4 hover:border-primary/50 transition-colors group"
    >
      <div className="p-3 rounded-lg bg-background border border-borders group-hover:bg-primary/10 transition-colors">
        <Icon className="w-6 h-6 text-text group-hover:text-primary transition-colors" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-text">{profile.platform}</h4>
        <p className="text-xs text-text/50 mt-0.5">{profile.username}</p>
      </div>
    </motion.a>
  );
}
