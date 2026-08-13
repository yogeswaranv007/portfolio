import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank, SiGeeksforgeeks } from 'react-icons/si';

const iconMap = {
  github: FaGithub,
  leetcode: SiLeetcode,
  hackerrank: SiHackerrank,
  geeksforgeeks: SiGeeksforgeeks,
  code: Code2,
  terminal: Terminal
};

export function ProfileCard({ profile, index }) {
  const isImageUrl = profile.icon && (profile.icon.startsWith('http://') || profile.icon.startsWith('https://') || profile.icon.startsWith('data:'));
  const Icon = !isImageUrl ? (iconMap[profile.icon?.toLowerCase()] || Code2) : null;
  
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className="glass-card p-5 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)] hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="p-3 rounded-xl bg-background border border-borders/50 group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex items-center justify-center min-w-[48px] min-h-[48px]">
          {isImageUrl ? (
            <img src={profile.icon} alt={profile.platform} className="w-6 h-6 object-contain group-hover:brightness-200 transition-all" />
          ) : (
            <Icon className="w-6 h-6 text-text group-hover:text-white transition-colors" />
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">{profile.platform}</h4>
          {profile.username && <p className="text-xs text-text/50 mt-1 font-medium tracking-wide">{profile.username}</p>}
        </div>
      </div>

      <div className="flex items-center text-xs font-bold text-text/50 group-hover:text-primary transition-colors relative z-10 mt-2">
        View Profile <span className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
      </div>
    </motion.a>
  );
}
