import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Code2, FolderGit2, Link as LinkIcon, Mail, Settings, LogOut, Menu, X } from 'lucide-react';

const adminLinks = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/profile', label: 'Profile', icon: User },
  { path: '/admin/skills', label: 'Skills', icon: Code2 },
  { path: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/admin/achievements', label: 'Achievements', icon: LinkIcon },
  { path: '/admin/messages', label: 'Messages', icon: Mail },
];

export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Basic development-only authentication check
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass-card border-r border-borders/50 flex flex-col
        transition-transform duration-300 md:translate-x-0 bg-cards/90
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-borders/50">
          <div className="text-lg font-bold text-text flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              Y
            </span>
            Admin Panel
          </div>
          <button className="md:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5 text-text/70" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {adminLinks.map((link) => {
            const isActive = link.exact 
              ? location.pathname === link.path 
              : location.pathname.startsWith(link.path);
              
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                  ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text/70 hover:bg-background hover:text-text'}
                `}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-borders/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full text-left rounded-lg text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 glass border-b border-borders/50 md:hidden">
          <div className="font-bold">Admin Panel</div>
          <button onClick={() => setIsMobileOpen(true)} className="p-2 bg-cards rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
