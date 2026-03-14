import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { applicationsPageData, infrastructureData } from '../data/mockData';

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

const ApplicationsPage = () => {
  return (
    <>
      <PageHero
        heading={applicationsPageData.heroHeading}
        description={applicationsPageData.heroDescription}
      />

      {/* Use Cases */}
      <section className="bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Industry solutions</p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-16">
              Transforming industries through intelligent scheduling
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applicationsPageData.useCases.map((useCase, index) => (
              <FadeInSection key={useCase.title} delay={(index + 1) * 150}>
                <div className="group p-8 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1">
                  <h3 className="text-white text-xl font-light mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-white/45 text-[15px] font-light leading-relaxed mb-6">
                    {useCase.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-light text-white">
                      {useCase.metric}
                    </span>
                    <span className="text-white/40 text-sm font-light">
                      {useCase.metricLabel}
                    </span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Global Infrastructure */}
      <section className="bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-6 max-w-3xl">
              {infrastructureData.heading}
            </h2>
            <p className="text-white/50 text-base md:text-[17px] font-light leading-relaxed max-w-3xl mb-16">
              {infrastructureData.description}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructureData.sites.map((site, index) => (
              <FadeInSection key={site.name} delay={(index + 1) * 200}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-lg mb-5">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-white text-lg font-light">{site.name}</p>
                    </div>
                  </div>
                  <p className="text-white/45 text-[15px] font-light leading-relaxed mb-4">
                    {site.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-white text-sm font-light hover:text-emerald-400 transition-colors duration-300 group/link"
                  >
                    Learn more
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationsPage;
