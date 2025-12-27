import React from 'react';

const StatusIndicator = ({ status }) => {
  const getStatusColor = (s) => {
    switch(s) {
      case 'IDLE': return 'bg-tech-cyan';
      case 'SCANNING': return 'bg-yellow-400';
      case 'COMPLETE': return 'bg-tech-green';
      case 'ERROR': return 'bg-tech-red';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
       <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} animate-pulse-glow`}></span>
       <span className="text-xs tracking-widest font-mono text-tech-cyan/80">{status}</span>
    </div>
  );
};

export default StatusIndicator;
