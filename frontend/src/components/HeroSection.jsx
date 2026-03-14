import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HERO_VIDEO = 'https://customer-assets.emergentagent.com/job_cbd6418e-105e-483f-8bd8-8bc1b126ea81/artifacts/cwe5wtg1_vecteezy_futuristic-data-center-server-room-corridor-walkthrough_72949348.mp4';

const HeroSection = ({ data, bannerVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(6,78,59,0.4) 40%, rgba(15,23,42,0.5) 70%, rgba(16,185,129,0.2) 100%)',
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pb-20"
        style={{ paddingTop: bannerVisible ? '160px' : '120px' }}
      >
        <div className="max-w-3xl">
          <h1
            className={`text-5xl md:text-6xl lg:text-[72px] font-light text-white leading-[1.1] tracking-tight mb-8 transition-all duration-1000 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {data.heading}
          </h1>
          <p
            className={`text-white/85 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10 transition-all duration-1000 delay-200 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {data.description}
          </p>
          <Link
            to={data.ctaLink}
            className={`inline-flex items-center gap-2 px-8 py-3.5 border border-white/80 rounded-full text-white text-sm font-light tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-500 group ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {data.ctaText}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade to dark */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f10] to-transparent" />
    </section>
  );
};

export default HeroSection;
