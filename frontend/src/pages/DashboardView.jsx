import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function DashboardView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-text">Dashboard</h1>
        <p className="text-text/70 mt-2">Welcome to my engineering portfolio.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-primary">
            <Terminal className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Now Building</h2>
          </div>
          <ul className="space-y-2 text-sm text-text/80">
            <li>• Spring Boot Microservices</li>
            <li>• Docker & Redis</li>
            <li>• System Design Architecture</li>
            <li>• AWS Cloud Practitioner</li>
          </ul>
        </div>
        {/* We'll add more cards here later */}
      </section>
    </motion.div>
  );
}
