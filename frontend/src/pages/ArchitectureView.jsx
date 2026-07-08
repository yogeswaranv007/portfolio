import React from 'react';
import { motion } from 'framer-motion';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import projectsData from '../data/projects.json';
import { Network } from 'lucide-react';

export default function ArchitectureView() {
  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-text flex items-center gap-4"
        >
          <Network className="w-10 h-10 text-primary" />
          System Architectures
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text/70 max-w-2xl leading-relaxed"
        >
          A visual representation of the system designs behind my major projects. I focus on building scalable, maintainable, and highly available architectures.
        </motion.p>
      </div>

      <div className="space-y-16">
        {projectsData.slice(0, 3).map((project, index) => (
          <motion.section 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-text">{project.title}</h2>
            <ArchitectureDiagram type={project.id} />
            <p className="text-text/70 leading-relaxed max-w-4xl">
              {project.architecture}
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
