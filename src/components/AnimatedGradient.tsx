import React, { useEffect, useState } from 'react';

interface AnimatedGradientProps {
  config?: {
    preset?: 'Aurora' | 'DeepOcean' | 'PrehistoricForest';
  };
  radius?: string;
}

export default function AnimatedGradient({ config = { preset: 'Aurora' }, radius = '0px' }: AnimatedGradientProps) {
  const [positions, setPositions] = useState({
    blob1: { x: 15, y: 20 },
    blob2: { x: 80, y: 30 },
    blob3: { x: 40, y: 80 },
    blob4: { x: 70, y: 75 }
  });

  // Slowly morphing coordinate paths for the fluid colors
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick += 0.03;
      setPositions({
        blob1: {
          x: 20 + Math.sin(tick) * 15,
          y: 25 + Math.cos(tick * 0.8) * 12
        },
        blob2: {
          x: 75 + Math.cos(tick * 1.1) * 15,
          y: 20 + Math.sin(tick * 0.9) * 12
        },
        blob3: {
          x: 35 + Math.sin(tick * 0.7) * 18,
          y: 70 + Math.cos(tick * 1.2) * 15
        },
        blob4: {
          x: 80 + Math.cos(tick * 0.9) * 12,
          y: 75 + Math.sin(tick * 1.1) * 15
        }
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Set preset gradient palette colors
  let colors = {
    color1: 'rgba(16, 185, 129, 0.35)', // Emerald
    color2: 'rgba(5, 150, 105, 0.25)',  // Forest Green
    color3: 'rgba(59, 130, 246, 0.25)',  // Deep Blue
    color4: 'rgba(255, 209, 102, 0.22)'  // Gold Accent
  };

  if (config.preset === 'DeepOcean') {
    colors = {
      color1: 'rgba(29, 78, 216, 0.3)',
      color2: 'rgba(30, 64, 175, 0.2)',
      color3: 'rgba(147, 51, 234, 0.2)',
      color4: 'rgba(16, 185, 129, 0.15)'
    };
  } else if (config.preset === 'PrehistoricForest') {
    colors = {
      color1: 'rgba(6, 78, 59, 0.4)',
      color2: 'rgba(20, 83, 45, 0.3)',
      color3: 'rgba(234, 179, 8, 0.15)',
      color4: 'rgba(30, 41, 59, 0.4)'
    };
  }

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ borderRadius: radius }}
    >
      {/* Container with premium high-intensity blur backdrop */}
      <div className="absolute inset-0 bg-[#020e0a]/80 backdrop-blur-[120px] transition-all duration-1000" />

      {/* Morphing Aurora Orb 1 */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full mix-blend-screen filter blur-[90px] transition-transform duration-[1000ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.color1} 0%, transparent 75%)`,
          left: `${positions.blob1.x}%`,
          top: `${positions.blob1.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Morphing Aurora Orb 2 */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] transition-transform duration-[1200ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.color2} 0%, transparent 75%)`,
          left: `${positions.blob2.x}%`,
          top: `${positions.blob2.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Morphing Aurora Orb 3 */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[80px] transition-transform duration-[1100ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.color3} 0%, transparent 75%)`,
          left: `${positions.blob3.x}%`,
          top: `${positions.blob3.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Morphing Aurora Orb 4 */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full mix-blend-screen filter blur-[95px] transition-transform duration-[1300ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.color4} 0%, transparent 75%)`,
          left: `${positions.blob4.x}%`,
          top: `${positions.blob4.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Premium Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.018] bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:3px_3px] pointer-events-none" />
    </div>
  );
}
