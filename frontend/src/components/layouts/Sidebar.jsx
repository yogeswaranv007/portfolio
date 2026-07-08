import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Network, 
  Mail 
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Architecture', path: '/architecture', icon: Network },
  { name: 'GitHub', path: '/github', icon: FaGithub },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export function Sidebar({ className = '' }) {
  return (
    <aside className={twMerge("flex flex-col h-full w-64 border-r border-borders bg-background/50 backdrop-blur-xl z-50", className)}>
      <div className="p-6 border-b border-borders/50">
        <h1 className="text-xl font-bold tracking-tight text-text">
          Yogeswaran<span className="text-primary">.dev</span>
        </h1>
        <p className="text-xs text-text/60 mt-1 uppercase tracking-wider font-semibold">Software Engineer</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text/70 hover:text-text hover:bg-cards'
                )
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-borders/50 space-y-4">
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors rounded-lg text-sm font-medium"
        >
          View Resume
        </a>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cards border border-borders/50">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-text/70 font-medium">System Online</span>
        </div>
      </div>
    </aside>
  );
}
