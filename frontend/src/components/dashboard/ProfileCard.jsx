import React from 'react';
import { ExternalLink, Code2, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';

const iconMap = {
  github: FaGithub,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  code: Code2,
  terminal: Terminal,
};

export function ProfileCard({ profile }) {
  const platformLower = (profile.platform || '').toLowerCase();
  const Icon =
    iconMap[platformLower] ||
    iconMap[profile.icon?.toLowerCase()] ||
    Code2;

  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-5 rounded-2xl bg-cards border border-borders hover:border-primary/40 transition-all duration-200 shadow-sm flex items-center justify-between group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-background border border-borders group-hover:border-primary/40 text-primary transition-colors flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
            {profile.platform}
          </h4>
          <p className="text-xs font-mono text-text-muted mt-0.5">
            {profile.metrics || profile.username}
          </p>
        </div>
      </div>

      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
    </a>
  );
}
