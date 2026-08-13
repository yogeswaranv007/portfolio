import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code2, FolderGit2, Link as LinkIcon, Mail } from 'lucide-react';

const navLinks = [
  { path: '#home', label: 'Home', icon: Home },
  { path: '#about', label: 'About', icon: User },
  { path: '#skills', label: 'Skills', icon: Code2 },
  { path: '#projects', label: 'Projects', icon: FolderGit2 },
  { path: '#achievements', label: 'Achievements', icon: LinkIcon },
  { path: '#contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection for glass header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Track active section using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('div[id], section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If we're not on the home page and trying to go to a section, navigate to home first
    if (location.pathname !== '/' && path.startsWith('#')) {
      navigate('/' + path);
      return;
    }

    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Optional: Update URL hash without jumping
        window.history.pushState(null, '', path);
      }
    } else {
      navigate(path);
    }
  };

  // If there's a hash on load/navigate, scroll to it
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-2 md:py-4' : 'py-4 md:py-6'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="glass-card rounded-2xl flex items-center justify-between px-6 py-3 bg-cards/80 shadow-xl border-borders/50 backdrop-blur-xl">
            <button 
              onClick={(e) => handleNavClick(e, '#home')} 
              className="text-xl font-bold tracking-tight text-text hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                Y
              </span>
              Yogeswaran<span className="text-primary">.dev</span>
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-text/70 hover:text-primary bg-background/50 rounded-xl transition-colors border border-borders/50 hover:border-primary/50 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Overlay (Desktop + Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed top-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-80 glass-card bg-cards shadow-2xl rounded-2xl z-50 overflow-hidden border-borders/50"
            >
              <nav className="flex flex-col p-2">
                {navLinks.map((link) => {
                  const id = link.path.replace('#', '');
                  const isActive = location.pathname === '/' && activeSection === id;
                  
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`
                        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive ? 'bg-primary/10 text-primary' : 'text-text/70 hover:bg-background/80 hover:text-text'}
                      `}
                    >
                      <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
