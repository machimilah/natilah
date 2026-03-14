import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const InfrastructureSection = ({ data }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="bg-[#0f0f10] py-28 md:py-36 border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2
          className={`text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-6 max-w-3xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {data.heading}
        </h2>
        <p
          className={`text-white/50 text-base md:text-[17px] font-light leading-relaxed max-w-3xl mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {data.description}
        </p>

        {/* Image Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.sites.map((site, index) => (
            <div
              key={site.name}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <p className="text-white/70 text-sm font-light mb-2">
                {site.name}
              </p>
              <a
                href={site.linkUrl}
                className="inline-flex items-center gap-2 text-white text-sm font-light hover:text-emerald-400 transition-colors duration-300 group/link"
              >
                {site.linkText}
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform duration-300"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
