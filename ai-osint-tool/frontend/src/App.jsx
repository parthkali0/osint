import React from 'react';
import OSINTTool from './components/OSINTTool';
import HUDCorners from './components/HUDCorners';
import DataStream from './components/DataStream';

function App() {
  return (
    <div className="relative min-h-screen bg-tech-bg text-tech-cyan font-mono overflow-hidden">
      <div className="crt-overlay"></div>
      <HUDCorners />
      <DataStream />
      <OSINTTool />
    </div>
  );
}

export default App;
