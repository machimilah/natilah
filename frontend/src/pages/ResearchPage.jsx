import React, { useState, useEffect, useRef } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuantumBackground from '../components/QuantumBackground';
import { researchPageData, scalingData } from '../data/mockData';

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

const ResearchPage = () => {
  return (
    <>
      <PageHero
        heading={researchPageData.heroHeading}
        description={researchPageData.heroDescription}
      />

      {/* Research Papers */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={25} connectDistance={130} speed={0.2} opacity={0.20} colorScheme="cyan" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Publications</p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-16">
              Featured research
            </h2>
          </FadeInSection>

          <div className="space-y-8">
            {researchPageData.papers.map((paper, index) => (
              <FadeInSection key={paper.title} delay={(index + 1) * 150}>
                <article className="group p-8 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-16 flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <FileText size={20} className="text-white/30" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-normal mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {paper.title}
                      </h3>
                      <p className="text-white/40 text-sm font-light mb-3">
                        {paper.authors} • {paper.date}
                      </p>
                      <p className="text-white/50 text-[15px] font-light leading-relaxed mb-4">
                        {paper.abstract}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {paper.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/[0.04] text-white/50 text-xs font-light"
                          >
                            {tag}
                          </span>
                        ))}
                        <a
                          href="#"
                          className="ml-auto inline-flex items-center gap-1.5 text-white/50 text-sm font-light hover:text-emerald-400 transition-colors duration-300"
                        >
                          View paper
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scaling Methodology */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground particleCount={18} connectDistance={100} speed={0.15} opacity={0.18} colorScheme="mixed" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Methodology</p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-6">
              {scalingData.heading}
            </h2>
            <p className="text-white/50 text-base md:text-[17px] font-light leading-relaxed max-w-3xl mb-16">
              {scalingData.description}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scalingData.items.map((item, index) => (
              <FadeInSection key={item.id} delay={(index + 1) * 200}>
                <div className="p-8 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                  <span className="text-emerald-400/60 text-xs font-mono mb-4 block">{item.number}</span>
                  <h3 className="text-white text-xl font-light mb-4">{item.title}</h3>
                  <p className="text-white/45 text-[15px] font-light leading-relaxed">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResearchPage;
