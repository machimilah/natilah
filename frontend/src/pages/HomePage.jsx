import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import QuantumBackground from '../components/QuantumBackground';
import { heroData, missionData, approachData, infrastructureData, newsData } from '../data/mockData';

const HomePage = () => {
  const [bannerVisible] = useState(true);

  return (
    <>
      <HeroSection data={heroData} bannerVisible={bannerVisible} />
      <MissionSection data={missionData} />

      {/* Approach Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-36 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={30}
          connectDistance={130}
          speed={0.25}
          opacity={0.07}
          colorScheme="green"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-white/40 text-sm font-light tracking-widest uppercase mb-6">Our approach</p>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-16 max-w-2xl">
            Four pillars of intelligent scheduling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachData.map((item, index) => (
              <Link
                to="/technology"
                key={item.id}
                className="group p-6 rounded-xl border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-white/20 text-xs font-mono mb-4 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-white text-lg font-light mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-white/60 text-sm font-light group-hover:text-emerald-400 transition-colors duration-300">
                  Learn more
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-36 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground
          particleCount={20}
          connectDistance={100}
          speed={0.15}
          opacity={0.05}
          colorScheme="purple"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-6 max-w-3xl">
            {infrastructureData.heading}
          </h2>
          <p className="text-white/50 text-base md:text-[17px] font-light leading-relaxed max-w-3xl mb-16">
            {infrastructureData.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infrastructureData.sites.map((site) => (
              <Link to="/applications" key={site.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <p className="text-white/70 text-sm font-light mb-2">{site.name}</p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-light group-hover:text-emerald-400 transition-colors duration-300">
                  {site.linkText}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-36 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={15}
          connectDistance={110}
          speed={0.2}
          opacity={0.05}
          colorScheme="cyan"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight">
              Latest news
            </h2>
            <Link
              to="/news"
              className="hidden md:inline-flex items-center gap-2 text-white/60 text-sm font-light hover:text-white transition-colors duration-300 group"
            >
              View all news
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsData.map((item) => (
              <article key={item.id} className="group">
                <p className="text-white/30 text-xs font-light mb-4">{item.date}</p>
                <h3 className="text-white text-[15px] font-normal leading-snug mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  <Link to="/news">{item.title}</Link>
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-white text-sm font-light hover:text-emerald-400 transition-colors duration-300 group/link"
                >
                  Read More
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/news"
            className="md:hidden inline-flex items-center gap-2 text-white/60 text-sm font-light hover:text-white transition-colors duration-300 group mt-10"
          >
            View all news
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
