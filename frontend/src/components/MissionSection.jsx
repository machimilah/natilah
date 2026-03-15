import React from 'react';
import QuantumBackground from './QuantumBackground';

const MissionSection = ({ data }) => {
  return (
    <section
      id="about"
      className="relative bg-[#0f0f10] py-28 md:py-40 overflow-hidden quantum-grid"
    >
      <QuantumBackground
        particleCount={8}
        connectDistance={140}
        speed={0.15}
        opacity={0.10}
        colorScheme="mixed"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2
          className="text-4xl md:text-5xl lg:text-[56px] font-light text-white leading-[1.15] tracking-tight mb-12 max-w-4xl"
        >
          {data.heading}
        </h2>

        <div className="max-w-3xl space-y-6">
          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-white/60 text-base md:text-[17px] font-light leading-[1.8]"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-white font-medium">$1</strong>'
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
