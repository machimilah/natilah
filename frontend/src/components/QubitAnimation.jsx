import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const QubitAnimation = () => {
  const containerRef = useRef(null);
  const arrowRef = useRef(null);

  useGSAP(() => {
    const randomizeSpin = () => {
      gsap.to(arrowRef.current, {
        rotationX: `+=${gsap.utils.random(90, 360)}`,
        rotationY: `+=${gsap.utils.random(90, 360)}`,
        rotationZ: `+=${gsap.utils.random(-90, 90)}`,
        duration: gsap.utils.random(2.5, 5),
        ease: 'power1.inOut',
        onComplete: randomizeSpin,
        transformOrigin: '50% 50%',
      });
    };
    
    randomizeSpin();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-64 h-64 mx-auto flex items-center justify-center translate-z-0" style={{ perspective: '800px' }}>
      {/* Outer translucent sphere */}
      <div className="absolute inset-0 rounded-full border-2 border-[#ffca55]/30 bg-gradient-to-br from-[#ffca55]/20 to-blue-500/20 shadow-[inset_0_0_30px_rgba(255,202,85,0.15)]" />
      
      {/* Inner grid lines for 3D realism */}
      <div className="absolute inset-2 rounded-full border border-blue-500/30 animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }} />
      <div className="absolute inset-2 rounded-full border border-[#ffca55]/30 animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateY(75deg)' }} />
      <div className="absolute inset-2 rounded-full border border-blue-500/30 animate-[spin_8s_linear_infinite]" style={{ transform: 'rotateZ(45deg) rotateX(45deg)' }} />

      {/* The Qubit State Arrow */}
      <div ref={arrowRef} className="absolute w-2 h-40 flex items-start justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {/* Thick Shaft - intersecting planes for 3D thickness */}
        <div className="absolute top-4 w-2 h-36 bg-gradient-to-b from-[#ffca55] to-blue-500 rounded-full" style={{ transform: 'translateZ(0px)' }} />
        <div className="absolute top-4 w-2 h-36 bg-gradient-to-b from-[#ffca55] to-blue-500 rounded-full" style={{ transform: 'rotateY(90deg) translateZ(0px)' }} />
        
        {/* Arrow Head - constructed from 4 intersected CSS borders to closely approximate a 3D cone */}
        <div className="absolute top-[-6px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#ffca55]" style={{ transform: 'translateZ(0px)' }} />
        <div className="absolute top-[-6px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#ffca55]" style={{ transform: 'rotateY(45deg) translateZ(0px)' }} />
        <div className="absolute top-[-6px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#ffca55]" style={{ transform: 'rotateY(90deg) translateZ(0px)' }} />
        <div className="absolute top-[-6px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#ffca55]" style={{ transform: 'rotateY(135deg) translateZ(0px)' }} />
      </div>

      {/* Origin Dot */}
      <div className="absolute w-3 h-3 bg-gradient-to-br from-[#ffca55] to-blue-500 rounded-full shadow-[0_0_20px_rgba(255,202,85,0.9)] z-10" />
    </div>
  );
};

export default QubitAnimation;
