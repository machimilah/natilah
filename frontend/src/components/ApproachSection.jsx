import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ApproachSection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="bg-black py-28 md:py-36 border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p
          className={`text-white/40 text-sm font-light tracking-widest uppercase mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Our approach
        </p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Content Area */}
          <div className="flex-1 min-h-[280px] relative">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <h3 className="text-4xl md:text-5xl lg:text-[52px] font-light text-white leading-tight tracking-tight mb-6">
                  {item.title}
                </h3>
                <p className="text-white/55 text-base md:text-[17px] font-light leading-relaxed max-w-lg mb-8">
                  {item.description}
                </p>
                <a
                  href={item.linkUrl}
                  className="inline-flex items-center gap-2 text-white text-sm font-light hover:text-gray-300 transition-colors duration-300 group"
                >
                  {item.linkText}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Right Navigation */}
          <div className="lg:w-48 flex flex-row lg:flex-col justify-between lg:justify-start">
            <div className="flex flex-row lg:flex-col gap-4">
              {data.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left flex items-center gap-3 py-2 transition-all duration-500 group ${
                    index === activeIndex
                      ? 'opacity-100'
                      : 'opacity-30 hover:opacity-60'
                  }`}
                >
                  <span className="text-white/50 text-xs font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-sm font-light transition-colors duration-300 ${
                      index === activeIndex ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-4 mt-16">
          <span className="text-white/30 text-xs font-light mr-4">Slider Principal</span>
          <button
            onClick={handlePrev}
            className="w-10 h-10  border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10  border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
            aria-label="Next slide"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
