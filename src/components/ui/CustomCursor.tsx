import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Position refs for lerping
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId: number;
    
    // Animate ring with lerp
    const render = () => {
      // Linear interpolation for smooth trailing effect
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-indigo-600 rounded-full pointer-events-none z-[10000] -ml-1.5 -mt-1.5 hidden md:block"
        style={{ willChange: 'transform' }}
      />
      
      {/* Trailing ring */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-indigo-400 rounded-full pointer-events-none z-[9999] -ml-4 -mt-4 hidden md:block opacity-50"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
