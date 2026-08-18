import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import profileData from '../../data/profile.json';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-borders/50 mt-10 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text/60">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p>© {year} {profileData.name}. All rights reserved.</p>
          <p className="text-xs text-text/40">Engineered with React + Vite + Tailwind CSS</p>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={`https://github.com/${profileData.github || 'yogeswaranv007'}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a 
            href={profileData.linkedin || 'https://www.linkedin.com'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a 
            href={`mailto:${profileData.email}`} 
            className="hover:text-primary transition-colors p-2"
            aria-label="Email Contact"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
