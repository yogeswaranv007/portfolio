import React from 'react';
import { motion } from 'framer-motion';

export function ArchitectureDiagram({ type }) {
  let nodes = [];
  
  if (type === 'mospi-survey') {
    nodes = [
      { label: 'React SPA', sub: 'Frontend UI' },
      { label: 'Spring Boot', sub: 'API Gateway' },
      { label: 'FastAPI AI Engine', sub: 'Python Microservices' },
      { label: 'PostgreSQL', sub: 'Database' }
    ];
  } else if (type === 'battery-vehicle') {
    nodes = [
      { label: 'React SPA', sub: 'Frontend UI' },
      { label: 'Node.js / Express', sub: 'REST API' },
      { label: 'MySQL', sub: 'Database' }
    ];
  } else if (type === 'cloud-tracker') {
    nodes = [
      { label: 'React SPA', sub: 'Dashboard' },
      { label: 'Spring Boot', sub: 'Backend Services' },
      { label: 'Cloud APIs', sub: 'AWS / GCP SDKs' },
      { label: 'MySQL', sub: 'Database' }
    ];
  } else {
    nodes = [
      { label: 'Frontend UI', sub: 'React' },
      { label: 'Backend API', sub: 'Spring Boot / Node.js' },
      { label: 'Database', sub: 'MySQL' }
    ];
  }

  return (
    <div className="p-8 glass-card flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 overflow-x-auto">
      {nodes.map((node, index) => (
        <React.Fragment key={index}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex flex-col items-center justify-center min-w-[140px] p-4 rounded-xl border border-borders bg-background/50 relative z-10 hover:border-primary/50 transition-colors"
          >
            <span className="font-semibold text-text text-sm md:text-base text-center">{node.label}</span>
            <span className="text-xs text-text/50 text-center mt-1">{node.sub}</span>
          </motion.div>
          
          {index < nodes.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 'auto' }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.1 }}
              className="hidden md:flex items-center justify-center h-[2px] w-12 bg-borders relative"
            >
              <div className="absolute right-0 w-2 h-2 border-t-2 border-r-2 border-borders rotate-45 transform translate-x-1" />
            </motion.div>
          )}
          {index < nodes.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: 'auto' }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.1 }}
              className="md:hidden flex items-center justify-center w-[2px] h-8 bg-borders relative"
            >
              <div className="absolute bottom-0 w-2 h-2 border-b-2 border-r-2 border-borders rotate-45 transform translate-y-1" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
