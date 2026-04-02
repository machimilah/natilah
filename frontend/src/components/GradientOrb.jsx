import React from 'react';

const GradientOrb = ({ color1 = '#a855f7', color2 = '#6b21a8', size = '500px', top = '50%', left = '50%', opacity = 0.5, blur = '100px' }) => {
  return (
    <div
      className="absolute rounded-full pointer-events-none -z-10"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        opacity: opacity,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
        filter: `blur(${blur})`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default GradientOrb;
