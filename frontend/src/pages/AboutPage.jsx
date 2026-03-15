import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuantumBackground from '../components/QuantumBackground';
import { aboutPageData, missionData } from '../data/mockData';

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
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      <PageHero
        heading={aboutPageData.heroHeading}
        description={aboutPageData.heroDescription}
      />

      {/* Mission */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={8} connectDistance={120} speed={0.15} opacity={0.10} colorScheme="green" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light text-white leading-[1.15] tracking-tight mb-12 max-w-4xl">
              {missionData.heading}
            </h2>
          </FadeInSection>
          <div className="max-w-3xl space-y-6">
            {missionData.paragraphs.map((paragraph, index) => (
              <FadeInSection key={index} delay={(index + 1) * 200}>
                <p
                  className="text-white/60 text-base md:text-[17px] font-light leading-[1.8]"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-medium">$1</strong>'
                    ),
                  }}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground particleCount={6} connectDistance={100} speed={0.2} opacity={0.10} colorScheme="purple" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light text-white leading-[1.15] tracking-tight mb-12 max-w-4xl">
              {aboutPageData.story.heading}
            </h2>
          </FadeInSection>
          <div className="max-w-3xl space-y-6">
            {aboutPageData.story.paragraphs.map((paragraph, index) => (
              <FadeInSection key={index} delay={(index + 1) * 150}>
                <p
                  className="text-white/60 text-base md:text-[17px] font-light leading-[1.8]"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-medium">$1</strong>'
                    ),
                  }}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={8} connectDistance={110} speed={0.18} opacity={0.10} colorScheme="cyan" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Our values</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            {aboutPageData.values.map((value, index) => (
              <FadeInSection key={value.title} delay={(index + 1) * 150}>
                <div className="group">
                  <h3 className="text-white text-xl font-light mb-3">{value.title}</h3>
                  <p className="text-white/45 text-[15px] font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative bg-[#0f0f10] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground particleCount={6} connectDistance={100} speed={0.15} opacity={0.08} colorScheme="mixed" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Leadership</p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-16">
              The team behind Natilah
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutPageData.team.map((member, index) => (
              <FadeInSection key={member.name} delay={(index + 1) * 150}>
                <div className="group">
                  <div className="w-full aspect-square rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-white/[0.12] transition-colors duration-500">
                    <User size={48} className="text-white/15" />
                  </div>
                  <h3 className="text-white text-base font-normal mb-1">{member.name}</h3>
                  <p className="text-emerald-400/70 text-sm font-light mb-2">{member.role}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed">{member.bio}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
