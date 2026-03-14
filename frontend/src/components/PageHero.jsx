import React, { useEffect, useState } from 'react';
import QuantumBackground from './QuantumBackground';

const PageHero = ({ heading, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#0f0f10] pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden quantum-grid">
      {/* Canvas particle background */}
      <QuantumBackground
        particleCount={25}
        connectDistance={120}
        speed={0.2}
        opacity={0.12}
        colorScheme="mixed"
      />

      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[400px] opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.5), transparent 70%)',
        }}
      />
      <div
        className="absolute top-20 right-0 w-[400px] h-[300px] opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(217,70,239,0.4), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <h1
          className={`text-4xl md:text-5xl lg:text-[64px] font-light text-white leading-[1.1] tracking-tight mb-6 max-w-3xl transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {heading}
        </h1>
        <p
          className={`text-white/55 text-base md:text-lg font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
