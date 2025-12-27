import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaGlobe, FaNetworkWired, FaServer, FaUserSecret, FaBug } from 'react-icons/fa';
import TechFrame from './TechFrame';
import ModuleCard from './ModuleCard';
import SocialPanel from './SocialPanel';
import WebReconPanel from './WebReconPanel';
import StatusIndicator from './StatusIndicator';
import ScanningEffect from './ScanningEffect';
import { containerVariants, itemVariants } from '../animations/techAnimations';

const OSINTTool = () => {
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState('IDLE');
  const [results, setResults] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!target) return;
    
    setStatus('SCANNING');
    setResults(null);
    
    try {
        const response = await fetch('http://127.0.0.1:5000/api/scan', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ target })
        });
        
        const data = await response.json();
        if (response.ok) {
            setResults(data);
            setStatus('COMPLETE');
        } else {
            console.error(data);
            setStatus('ERROR');
        }
    } catch (err) {
        console.error(err);
        setStatus('ERROR');
    }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto p-4 flex flex-col h-screen">
      <ScanningEffect active={status === 'SCANNING'} />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-6 border-b border-tech-cyan/30 pb-4"
      >
        <div>
            <h1 className="text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-cyan to-tech-green animate-pulse-glow">
                CYBER.OSINT v2.0
            </h1>
            <p className="text-xs text-tech-cyan/60 tracking-widest mt-1">ADVANCED INTELLIGENCE GATHERING HUD</p>
        </div>
        <StatusIndicator status={status} />
      </motion.header>

      {/* Input Section */}
      <motion.form 
        onSubmit={handleScan}
        className="mb-8 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        <TechFrame className="flex-1 flex items-center p-2">
            <input 
                type="text" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="ENTER TARGET [DOMAIN / IP / USERNAME]" 
                className="w-full bg-transparent border-none outline-none text-xl font-mono text-tech-cyan placeholder-tech-cyan/30 ml-2"
            />
        </TechFrame>
        <button 
            type="submit" 
            disabled={status === 'SCANNING'}
            className="px-8 bg-tech-cyan/10 border border-tech-cyan text-tech-cyan font-bold hover:bg-tech-cyan hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {status === 'SCANNING' ? 'SCANNING...' : 'INITIATE SCAN'}
        </button>
      </motion.form>

      {/* Results Grid */}
      {results && (
          <motion.div 
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4 custom-scrollbar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              {/* AI Analysis */}
              <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-1 min-h-[300px]">
                 <ModuleCard 
                    title="AI Analysis" 
                    icon={<FaUserSecret />}
                    data={{
                        Risk: results.analysis.risk_level,
                        Score: results.analysis.risk_score,
                        Insights: results.analysis.insights
                    }}
                 />
              </motion.div>

              {/* Web Recon (New Panel) */}
              <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1 min-h-[300px]">
                  <TechFrame className="h-full">
                       <WebReconPanel results={results.modules.web_search} />
                  </TechFrame>
              </motion.div>

              {/* Domain Info / IP */}
               <motion.div variants={itemVariants} className="min-h-[300px]">
                  <ModuleCard 
                    title="Target Recon" 
                    icon={<FaServer />}
                    data={results.modules.domain || results.modules.ip_geo}
                  />
              </motion.div>

              {/* Social Footprint (New Panel) */}
              {results.modules.social && (
                  <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3 min-h-[300px]">
                        <TechFrame className="h-full">
                            <SocialPanel results={results.modules.social} />
                        </TechFrame>
                  </motion.div>
              )}

              {/* Ports */}
             {results.modules.ports && (
                  <motion.div variants={itemVariants}>
                      <ModuleCard 
                        title="Open Ports" 
                        icon={<FaNetworkWired />}
                        data={results.modules.ports}
                      />
                  </motion.div>
              )}
              
               {/* Emails */}
             {results.modules.emails && results.modules.emails.length > 0 && (
                  <motion.div variants={itemVariants}>
                      <ModuleCard 
                        title="Email Discovery" 
                        icon={<FaBug />}
                        data={results.modules.emails}
                      />
                  </motion.div>
              )}

          </motion.div>
      )}
    </div>
  );
};

export default OSINTTool;
