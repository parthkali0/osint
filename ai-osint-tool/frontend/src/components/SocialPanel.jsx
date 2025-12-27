import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaLink, FaQuestionCircle, FaSpinner } from 'react-icons/fa';
import TechFrame from './TechFrame';

const SocialPanel = ({ results }) => {
  if (!results) return null;

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between border-b border-tech-cyan/20 pb-2 mb-4">
        <h3 className="text-lg font-display text-tech-cyan uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-tech-cyan rounded-full animate-pulse-glow"></span>
            Social Footprint
        </h3>
        <span className="text-xs font-mono text-gray-400">{results.length} PLATFORMS SCANNED</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative p-3 border ${item.exists ? 'border-tech-green bg-tech-green/5' : 'border-tech-cyan/20 bg-tech-bg/50'} rounded hover:bg-white/5 transition-colors group`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`font-display text-sm ${item.exists ? 'text-tech-green' : 'text-gray-400'}`}>
                            {item.platform}
                        </span>
                        {item.exists ? (
                            <FaCheckCircle className="text-tech-green text-sm shadow-[0_0_10px_rgba(0,255,157,0.5)]" />
                        ) : item.error ? (
                            <FaQuestionCircle className="text-yellow-500 text-sm" />
                        ) : (
                            <FaTimesCircle className="text-gray-600 text-sm" />
                        )}
                    </div>
                    
                    <div className="text-xs font-mono truncate text-gray-500 group-hover:text-tech-cyan transition-colors">
                        {item.url}
                    </div>

                    {item.exists && (
                        <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                        >
                            <span className="flex items-center gap-2 text-tech-cyan font-bold border border-tech-cyan px-3 py-1 rounded hover:bg-tech-cyan hover:text-black transition-colors">
                                <FaLink /> OPEN PROFILE
                            </span>
                        </a>
                    )}
                </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default SocialPanel;
