import React from 'react';
import TechFrame from './TechFrame';

const ModuleCard = ({ title, data, icon }) => {
  return (
    <TechFrame className="h-full overflow-hidden flex flex-col hover:bg-tech-bg/80 transition-colors">
      <div className="flex items-center justify-between border-b border-tech-cyan/20 pb-2 mb-2">
        <h3 className="text-lg font-display text-tech-cyan uppercase tracking-wider">{title}</h3>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-sm text-gray-300 custom-scrollbar">
         {typeof data === 'string' ? (
             <p>{data}</p>
         ) : Array.isArray(data) ? (
             <ul className="space-y-1">
                 {data.map((item, idx) => (
                     <li key={idx} className="border-l-2 border-tech-cyan/30 pl-2">
                         {JSON.stringify(item)}
                     </li>
                 ))}
             </ul>
         ) : (
             <pre className="whitespace-pre-wrap text-xs">
                 {JSON.stringify(data, null, 2)}
             </pre>
         )}
      </div>
    </TechFrame>
  );
};

export default ModuleCard;
