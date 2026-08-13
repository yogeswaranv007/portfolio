import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Database, Cloud, MessageSquare, Cpu, CreditCard, Lock, Users, BookOpen, Calendar, LayoutTemplate 
} from 'lucide-react';
import { FaReact, FaJava, FaPython, FaNodeJs, FaAws, FaDatabase } from 'react-icons/fa';

const iconMap = {
  FaReact: <FaReact className="text-[#61DAFB]" size={24} />,
  FaJava: <FaJava className="text-[#ED8B00]" size={28} />,
  FaPython: <FaPython className="text-[#3776AB]" size={28} />,
  FaNodeJs: <FaNodeJs className="text-[#339933]" size={28} />,
  FaAws: <FaAws className="text-[#FF9900]" size={24} />,
  FaDatabase: <FaDatabase className="text-[#47A248]" size={24} />,
  Database: <Database className="text-[#4479A1]" size={24} />,
  Cloud: <Cloud className="text-[#0078D4]" size={24} />,
  MessageSquare: <MessageSquare className="text-[#F22F46]" size={24} />,
  Cpu: <Cpu className="text-[#F87171]" size={24} />,
  CpuOrange: <Cpu className="text-[#F7931E]" size={24} />,
  CreditCard: <CreditCard className="text-[#00457C]" size={24} />,
  Lock: <Lock className="text-gray-400" size={24} />,
  Users: <Users className="text-[#F59E0B]" size={24} />,
  BookOpen: <BookOpen className="text-[#10B981]" size={24} />,
  Calendar: <Calendar className="text-[#8B5CF6]" size={24} />,
  Server: <Server className="text-gray-400" size={24} />
};

const ArchCard = ({ title, subtitle, icon, items, isPrimary }) => {
  const renderedIcon = iconMap[icon] || <Server className="text-gray-400" size={24} />;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`flex flex-col p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-lg
        ${isPrimary 
          ? 'bg-primary/10 border-primary/30 hover:border-primary/50 hover:shadow-primary/20 min-w-[280px]' 
          : 'bg-background/60 border-borders/60 hover:border-borders hover:shadow-white/5 min-w-[220px]'}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-2.5 rounded-xl ${isPrimary ? 'bg-primary/20' : 'bg-cards border border-borders/50 flex items-center justify-center min-w-[46px]'}`}>
          {renderedIcon}
        </div>
        <div>
          <h3 className={`font-bold tracking-tight ${isPrimary ? 'text-lg text-primary' : 'text-base text-text'}`}>{title}</h3>
          <p className="text-xs text-text/60 font-medium">{subtitle}</p>
        </div>
      </div>
      
      {items && items.length > 0 && (
        <div className="mt-3 flex flex-col gap-1.5 border-t border-borders/50 pt-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-text/80">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPrimary ? 'bg-primary/60' : 'bg-text/40'}`} />
              {item}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const VerticalConnector = () => (
  <motion.div 
    initial={{ opacity: 0, height: 0 }}
    whileInView={{ opacity: 1, height: 32 }}
    viewport={{ once: true }}
    className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10 relative my-2 mx-auto"
  >
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-primary/40 rotate-45" />
  </motion.div>
);

export function ArchitectureDiagram({ data }) {
  if (!data) return null;
  
  return (
    <div className="py-8 flex flex-col items-center justify-center w-full overflow-hidden">
      
      {/* Tier 1: Frontend */}
      {data.frontend && (
        <div className="relative z-10 flex justify-center">
          <ArchCard {...data.frontend} isPrimary={false} />
        </div>
      )}
      
      {(data.frontend && data.backend) && <VerticalConnector />}
      
      {/* Tier 2: Primary Backend */}
      {data.backend && (
        <div className="relative z-10 flex justify-center">
          <ArchCard {...data.backend} isPrimary={true} />
        </div>
      )}
      
      {data.services && data.services.length > 0 && (
        <>
          <VerticalConnector />
          
          {/* Tier 3: Downstream Services */}
          <div className="relative z-10 w-full max-w-4xl mt-2">
            {/* Horizontal Connector Line for multiple children (Desktop) */}
            {data.services.length > 1 && (
              <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary/10" 
                   style={{ width: `calc(100% - ${100 / data.services.length}%)` }} />
            )}
            
            <div className={`flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 lg:gap-8 pt-4 md:pt-6 relative flex-wrap`}>
              {data.services.map((service, index) => (
                <div key={index} className="flex flex-col items-center relative w-full md:w-auto">
                  {/* Vertical connector from the horizontal line down to the card (Desktop) */}
                  {data.services.length > 1 && (
                    <div className="hidden md:block absolute -top-6 left-1/2 w-[2px] h-6 bg-primary/10">
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b-2 border-r-2 border-primary/20 rotate-45" />
                    </div>
                  )}
                  {/* Vertical connector between stacked cards (Mobile) */}
                  {index > 0 && (
                    <div className="md:hidden w-[2px] h-8 bg-borders/50 relative my-2">
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b-2 border-r-2 border-borders/50 rotate-45" />
                    </div>
                  )}
                  
                  <ArchCard {...service} isPrimary={false} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
