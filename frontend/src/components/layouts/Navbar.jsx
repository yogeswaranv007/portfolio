import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code2, FolderGit2, GraduationCap, Trophy, Mail } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

const navLinks = [
  { path: '#home', label: 'Home', icon: Home },
  { path: '#about', label: 'About', icon: User },
  { path: '#skills', label: 'Skills', icon: Code2 },
  { path: '#projects', label: 'Projects', icon: FolderGit2 },
  { path: '#experience-education', label: 'Experience & Education', icon: GraduationCap },
  { path: '#achievements', label: 'Achievements', icon: Trophy },
  { path: '#contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for glass header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key
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
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/' && path.startsWith('#')) {
      navigate('/' + path);
      return;
    }

    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-borders' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-lg font-bold tracking-tight text-text hover:text-primary transition-colors flex items-center gap-2 group"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-mono font-semibold group-hover:bg-primary group-hover:text-white transition-all">
                Y
              </span>
              <span>
                Yogeswaran<span className="text-primary font-mono">.dev</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-cards/80 border border-borders px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
              {navLinks.map((link) => {
                const id = link.path.replace('#', '');
                const isActive = location.pathname === '/' && activeSection === id;

                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-muted hover:text-text hover:bg-background/60'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Controls (Theme Toggle & Mobile Menu Trigger) */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl border border-borders bg-cards hover:border-primary/50 text-text transition-colors flex items-center justify-center"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-4 left-4 glass-card bg-cards shadow-2xl rounded-2xl z-50 p-4 border border-borders lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = link.path.replace('#', '');
                  const isActive = location.pathname === '/' && activeSection === id;

                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-background hover:text-text'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
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
