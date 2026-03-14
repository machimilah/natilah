import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuantumBackground from '../components/QuantumBackground';
import { newsData } from '../data/mockData';

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

const NewsPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      <PageHero
        heading="News"
        description="The latest updates from Natilah on partnerships, technology, and the future of datacenter scheduling."
      />

      {/* News Listing */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={20} connectDistance={120} speed={0.18} opacity={0.10} colorScheme="mixed" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {newsData.map((item, index) => (
              <FadeInSection key={item.id} delay={(index + 1) * 100}>
                <article
                  className={`border-t border-white/[0.06] py-10 group cursor-pointer ${
                    index === newsData.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
                    {/* Date */}
                    <div className="lg:w-40 flex-shrink-0">
                      <p className="text-white/30 text-sm font-light">{item.date}</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-white text-lg md:text-xl font-light mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                        {item.title}
                      </h3>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-white/50 text-[15px] font-light leading-relaxed mb-6">
                          {item.fullContent}
                        </p>
                      </div>

                      {expandedId !== item.id && (
                        <p className="text-white/40 text-[15px] font-light leading-relaxed mb-4">
                          {item.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-2 text-white text-sm font-light group-hover:text-emerald-400 transition-colors duration-300">
                        {expandedId === item.id ? 'Show less' : 'Read More'}
                        <ArrowRight
                          size={14}
                          className={`transition-transform duration-300 ${
                            expandedId === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </span>
                    </div>

                    {/* Date (right side on desktop) */}
                    <div className="hidden lg:block lg:w-32 flex-shrink-0 text-right">
                      <p className="text-white/30 text-sm font-light">{item.date}</p>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
