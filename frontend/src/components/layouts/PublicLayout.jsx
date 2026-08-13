import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from '../common/Footer';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

export function PublicLayout() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Global Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 origin-left"
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Floating Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col min-h-screen pt-24">
        <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-20">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
