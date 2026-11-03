import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-borders mt-20 py-10 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-bold text-text font-mono">
              Yogeswaran V
            </p>
            <p className="text-xs text-text-muted">
              Final-year B.Tech IT Student &bull; Java, Spring Boot, React &bull; AI Integrations
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yogeswaranv007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-text transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/yogeswaranv"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/Yogeswaran_v/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-[#FFA116] transition-colors"
              aria-label="LeetCode Profile"
            >
              <SiLeetcode className="w-4 h-4" />
            </a>
            <a
              href="https://codeforces.com/profile/yogeswaranv"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-[#1F8ACB] transition-colors"
              aria-label="Codeforces Profile"
            >
              <SiCodeforces className="w-4 h-4" />
            </a>
            <a
              href="https://www.codechef.com/users/yogeswaran_v"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-primary transition-colors"
              aria-label="CodeChef Profile"
            >
              <SiCodechef className="w-4 h-4" />
            </a>
            <a
              href="mailto:yogeswaranv599@gmail.com"
              className="p-2 rounded-lg border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-primary transition-colors"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-4 border-t border-borders/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <p>&copy; {currentYear} Yogeswaran V. All rights reserved.</p>
          <p className="text-[11px] text-text-muted/80">Textures: NASA/SVS, Solar System Scope (CC BY 4.0)</p>
          <p className="font-mono">Designed &amp; Delivered with React, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
