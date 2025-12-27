import React, { useRef, useEffect } from 'react';

const DataStream = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const columns = canvas.width / 20;
      const drops = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
      
      const draw = () => {
        ctx.fillStyle = 'rgba(10, 14, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f3';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(0x30A0 + Math.random() * 96);
          ctx.fillText(text, i * 20, drops[i] * 20);
          
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };
      
      const interval = setInterval(draw, 33);
      
      const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
          clearInterval(interval);
          window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0" 
      />
    );
};

export default DataStream;
