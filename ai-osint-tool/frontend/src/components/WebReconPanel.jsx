import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGlobe, FaSearch } from 'react-icons/fa';
import TechFrame from './TechFrame';

const WebReconPanel = ({ results }) => {
  if (!results) return null;

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between border-b border-tech-cyan/20 pb-2 mb-4">
        <h3 className="text-lg font-display text-tech-cyan uppercase tracking-wider flex items-center gap-2">
            <FaGlobe className="animate-spin-slow text-tech-cyan" />
            Web Reconnaissance
        </h3>
        <span className="text-xs font-mono text-gray-400">{results.length} INTEL POINTS</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 p-1">
          {results.length === 0 ? (
             <div className="text-gray-500 font-mono text-sm text-center py-10 opacity-50">
                [ NO PUBLIC INTELLIGENCE FOUND ]
             </div>
          ) : (
              results.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-tech-cyan bg-tech-bg/40 p-3 hover:bg-tech-cyan/5 transition-colors group relative overflow-hidden"
                >
                    <div className="flex justify-between items-start w-full">
                         <h4 className="text-tech-cyan font-bold font-display text-sm truncate pr-8 w-full">
                             {item.title}
                         </h4>
                         <a href={item.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-tech-cyan transition-colors">
                             <FaExternalLinkAlt size={12} />
                         </a>
                    </div>
                    
                    <div className="text-xs text-tech-green/70 mb-1 font-mono uppercase tracking-wider">
                         {item.domain || "UNKNOWN SOURCE"}
                    </div>
                    
                    <p className="text-gray-400 text-xs font-mono leading-relaxed line-clamp-2">
                        {item.snippet}
                    </p>
                    
                    {/* Scan line decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-tech-cyan/0 via-tech-cyan/30 to-tech-cyan/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              ))
          )}
      </div>
    </div>
  );
};

export default WebReconPanel;
