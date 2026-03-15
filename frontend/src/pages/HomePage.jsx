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
      <div className="relative">
        <HeroSection data={heroData} bannerVisible={bannerVisible} />
        <div className="relative -mt-0 z-20">
          <MissionSection data={missionData} />
        </div>
      </div>

      {/* Approach Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={12}
          connectDistance={130}
          speed={0.25}
          opacity={0.12}
          colorScheme="green"
        />
        <div className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12">
          <p className="text-white/40 text-base lg:text-lg font-light tracking-widest uppercase mb-8 lg:mb-12">Our approach</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.2] tracking-tight mb-20 lg:mb-28 max-w-2xl lg:max-w-4xl">
            Four pillars of intelligent scheduling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {approachData.map((item, index) => (
              <Link
                to="/technology"
                key={item.id}
                className="group p-8 lg:p-10 rounded-xl border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-white/20 text-sm lg:text-base font-mono mb-6 lg:mb-8 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-white text-xl lg:text-2xl font-light mb-4 lg:mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-base lg:text-lg font-light leading-relaxed mb-6 lg:mb-8">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white/60 text-base lg:text-lg font-light group-hover:text-emerald-400 transition-colors duration-300">
                  Learn more
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground
          particleCount={8}
          connectDistance={100}
          speed={0.15}
          opacity={0.10}
          colorScheme="purple"
        />
        <div className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.2] tracking-tight mb-8 lg:mb-12 max-w-3xl lg:max-w-5xl">
            {infrastructureData.heading}
          </h2>
          <p className="text-white/50 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl lg:max-w-4xl mb-20 lg:mb-28">
            {infrastructureData.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {infrastructureData.sites.map((site) => (
              <Link to="/applications" key={site.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4 lg:mb-6">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-[300px] md:h-[380px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <p className="text-white/70 text-base lg:text-lg font-light mb-3">{site.name}</p>
                <span className="inline-flex items-center gap-2 text-white text-base lg:text-lg font-light group-hover:text-emerald-400 transition-colors duration-300">
                  {site.linkText}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="relative bg-[#0f0f10] py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={6}
          connectDistance={110}
          speed={0.2}
          opacity={0.10}
          colorScheme="cyan"
        />
        <div className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-20 lg:mb-28">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.2] tracking-tight">
              Latest news
            </h2>
            <Link
              to="/news"
              className="hidden md:inline-flex items-center gap-2 text-white/60 text-base lg:text-lg font-light hover:text-white transition-colors duration-300 group"
            >
              View all news
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {newsData.map((item) => (
              <article key={item.id} className="group">
                <p className="text-white/30 text-sm lg:text-base font-light mb-6">{item.date}</p>
                <h3 className="text-white text-lg lg:text-xl font-normal leading-snug mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                  <Link to="/news">{item.title}</Link>
                </h3>
                <p className="text-white/40 text-base lg:text-lg font-light leading-relaxed mb-6 line-clamp-3">{item.excerpt}</p>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-white text-base lg:text-lg font-light hover:text-emerald-400 transition-colors duration-300 group/link"
                >
                  Read More
                  <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/news"
            className="md:hidden inline-flex items-center gap-2 text-white/60 text-base font-light hover:text-white transition-colors duration-300 group mt-12"
          >
            View all news
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
