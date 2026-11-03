import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from '../common/Footer';
import { motion, useScroll } from 'framer-motion';

export function PublicLayout() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen relative z-10 flex flex-col font-sans text-text overflow-x-hidden transition-colors duration-300">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col pt-24">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex-1 flex flex-col">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}
