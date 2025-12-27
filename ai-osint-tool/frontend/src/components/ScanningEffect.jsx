import React from 'react';

const ScanningEffect = ({ active }) => {
  if (!active) return null;
  
  return (
    <div className="scan-line"></div>
  );
};

export default ScanningEffect;
