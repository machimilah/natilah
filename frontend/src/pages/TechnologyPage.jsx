import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuantumBackground from '../components/QuantumBackground';
import { approachData, scalingData } from '../data/mockData';

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TechnologyPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? approachData.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === approachData.length - 1 ? 0 : prev + 1));

  return (
    <>
      <PageHero
        heading="Technology"
        description="Our technology stack is built from the ground up to solve the most complex scheduling challenges at datacenter scale."
      />

      {/* Approach Slider */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={30} connectDistance={140} speed={0.25} opacity={0.07} colorScheme="green" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-16">Our approach</p>
          </FadeInSection>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Content */}
            <div className="flex-1 min-h-[320px] relative">
              {approachData.map((item, index) => (
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
                  <p className="text-white/55 text-base md:text-[17px] font-light leading-relaxed max-w-lg mb-4">
                    {item.description}
                  </p>
                  <p className="text-white/40 text-sm font-light leading-relaxed max-w-lg mb-8">
                    {item.longDescription}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Navigation */}
            <div className="lg:w-52 flex flex-row lg:flex-col gap-4">
              {approachData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left flex items-center gap-3 py-2 transition-all duration-500 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                  }`}
                >
                  <span className="text-white/50 text-xs font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm font-light transition-colors duration-300 ${
                    index === activeIndex ? 'text-white' : 'text-white/60'
                  }`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center gap-4 mt-16">
            <span className="text-white/30 text-xs font-light mr-4">Slider Principal</span>
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Scaling Section */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground particleCount={20} connectDistance={120} speed={0.2} opacity={0.05} colorScheme="purple" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-5/12">
              <FadeInSection>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-6">
                  {scalingData.heading}
                </h2>
                <p className="text-white/50 text-base md:text-[17px] font-light leading-relaxed">
                  {scalingData.description}
                </p>
              </FadeInSection>
            </div>

            <div className="lg:w-7/12">
              {scalingData.items.map((item, index) => (
                <FadeInSection key={item.id} delay={(index + 1) * 150}>
                  <div
                    className={`border-t border-white/[0.08] ${
                      index === scalingData.items.length - 1 ? 'border-b border-white/[0.08]' : ''
                    }`}
                  >
                    <button
                      onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                      className="w-full flex items-center justify-between py-6 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-white/30 text-xs font-mono">{item.number}</span>
                        <span className="text-white text-lg md:text-xl font-light group-hover:text-emerald-400 transition-colors duration-300">
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-white/40 transition-transform duration-500 ${
                          openAccordion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        openAccordion === index ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-white/45 text-[15px] font-light leading-relaxed pl-10">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechnologyPage;
