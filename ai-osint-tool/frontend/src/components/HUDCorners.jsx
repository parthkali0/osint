import React from 'react';

const HUDCorners = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-4">
        {/* Top Left */}
        <svg className="absolute top-4 left-4 w-24 h-24 text-tech-cyan opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 0 20 V 0 H 20" />
            <path d="M 0 40 V 100" strokeOpacity="0.3" />
            <path d="M 40 0 H 100" strokeOpacity="0.3" />
        </svg>

        {/* Top Right */}
        <svg className="absolute top-4 right-4 w-24 h-24 text-tech-cyan opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 100 20 V 0 H 80" />
            <path d="M 100 40 V 100" strokeOpacity="0.3" />
            <path d="M 60 0 H 0" strokeOpacity="0.3" />
        </svg>

        {/* Bottom Left */}
        <svg className="absolute bottom-4 left-4 w-24 h-24 text-tech-cyan opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 0 80 V 100 H 20" />
            <path d="M 0 60 V 0" strokeOpacity="0.3" />
            <path d="M 40 100 H 100" strokeOpacity="0.3" />
        </svg>

        {/* Bottom Right */}
        <svg className="absolute bottom-4 right-4 w-24 h-24 text-tech-cyan opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 100 80 V 100 H 80" />
            <path d="M 100 60 V 0" strokeOpacity="0.3" />
            <path d="M 60 100 H 0" strokeOpacity="0.3" />
        </svg>
    </div>
  );
};

export default HUDCorners;
