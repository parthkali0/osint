import React from 'react';
import { motion } from 'framer-motion';

const TechFrame = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`relative bg-tech-bg/50 border border-tech-cyan/30 backdrop-blur-sm p-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        {/* Corner Decors */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-tech-cyan" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-tech-cyan" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-tech-cyan" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-tech-cyan" />
        
        {children}
    </motion.div>
  );
};

export default TechFrame;
