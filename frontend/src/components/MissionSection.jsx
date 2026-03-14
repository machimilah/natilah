import React, { useEffect, useRef, useState } from 'react';

const MissionSection = ({ data }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#0f0f10] py-28 md:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2
          className={`text-4xl md:text-5xl lg:text-[56px] font-light text-white leading-[1.15] tracking-tight mb-12 max-w-4xl transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {data.heading}
        </h2>

        <div className="max-w-3xl space-y-6">
          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-white/60 text-base md:text-[17px] font-light leading-[1.8] transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
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
