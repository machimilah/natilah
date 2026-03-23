import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import QuantumBackground from '../components/QuantumBackground';
import { heroData, missionData, scalingData } from '../data/mockData';
import { useNews } from '../hooks/useData';

const HomePage = () => {
  const [bannerVisible] = useState(true);
  const { data: newsData } = useNews();

  return (
    <>
      <Helmet>
        <title>Natilah — Quantum-Inspired GPU Datacenter Scheduling</title>
        <meta name="description" content="Natilah builds Quasar, a quantum-inspired scheduler that achieves 72% win rate against 11 production schedulers. Mean +16.2% makespan reduction, never worse than FIFO." />
        <meta property="og:title" content="Natilah — Quantum-Inspired GPU Scheduling" />
        <meta property="og:description" content="Quasar optimizes GPU datacenters with quantum-inspired algorithms. Benchmarked against 11 production schedulers across 132 matchups." />
        <meta property="og:url" content="https://natilah.com/" />
        <link rel="canonical" href="https://natilah.com/" />
      </Helmet>
      <div className="relative">
        <HeroSection data={heroData} missionData={missionData} bannerVisible={bannerVisible} />
      </div>

      {/* Approach Preview */}
      <section className="relative bg-black py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={12}
          connectDistance={130}
          speed={0.25}
          opacity={0.25}
          colorScheme="white"
        />
        <div className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12">
          <p className="text-white/40 text-base lg:text-lg font-light tracking-widest uppercase mb-8 lg:mb-6">The future of tech</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.2] tracking-tight mb-20 lg:mb-16 max-w-2xl lg:max-w-4xl">
            Quantum ready
          </h2>

          {/* Image and Text Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Display */}
            <div className="relative overflow-hidden">
              <img
                src="/images/quantum-computer.jpg"
                alt="Quantum Disc"
                className="w-full h-[500px] object-cover transition-all duration-500"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-8">
              <h3 className="text-white text-xl lg:text-2xl font-light mb-6">
                {scalingData.items[2].title}
              </h3>
              <p className="text-white/60 text-base lg:text-lg font-light leading-relaxed mb-6">
                {scalingData.items[2].description}
              </p>
              <Link
                to="/technology"
                className="inline-flex items-center gap-2 text-white text-base lg:text-lg font-light group/link"
              >
                Learn more
                <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Preview */}
      <section className="relative bg-black py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden">
        <QuantumBackground
          particleCount={8}
          connectDistance={100}
          speed={0.15}
          opacity={0.25}
          colorScheme="purple"
        />
        <div className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12">
          {/* Header - Centered */}
          <div className="text-center mb-8 lg:mb-12 ml-0 lg:-ml-16">
            <p className="text-white/40 text-xs font-light tracking-[0.2em] uppercase mb-6">MULTI-OBJECTIVE · VS PRODUCTION AVG</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight mb-8">
              Six goal simultaneous optimization
            </h2>
          </div>

          {/* Six Goals Containers - Centered */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-16 lg:mb-20 px-6 md:px-12 ml-0 lg:-ml-16">
            {[
              'Makespan optimization',
              'Job completion speed',
              'Minimize wait time',
              'Fairness & equity',
              'SLA compliance',
              'Priority fidelity'
            ].map((goal) => (
              <div key={goal} className="p-3 lg:p-4 border border-white/[0.1]">
                <p className="text-white text-xs lg:text-sm font-light">{goal}</p>
              </div>
            ))}
          </div>

          {/* Main Layout - Metrics Left, Comparison Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 lg:mx-auto lg:max-w-6xl">
            {/* Left: Metrics (double column) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-10 pr-0 lg:pr-12">
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">Makespan</p>
                <p className="text-white text-3xl lg:text-4xl font-light">33%</p>
                <p className="text-white/60 text-xs lg:text-sm font-light">faster</p>
              </div>
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">Avg job completion</p>
                <p className="text-white text-3xl lg:text-4xl font-light">34%</p>
                <p className="text-white/60 text-xs lg:text-sm font-light">lower</p>
              </div>
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">Wait time</p>
                <p className="text-white text-3xl lg:text-4xl font-light">55%</p>
                <p className="text-white/60 text-xs lg:text-sm font-light">lower</p>
              </div>
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">Fairness</p>
                <p className="text-white text-3xl lg:text-4xl font-light">+1.1%</p>
              </div>
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">SLA violations</p>
                <p className="text-white text-3xl lg:text-4xl font-light">26%</p>
                <p className="text-white/60 text-xs lg:text-sm font-light">fewer</p>
              </div>
              <div className="pb-6 lg:pb-8">
                <p className="text-white/50 text-xs lg:text-sm font-light mb-3">Priority fidelity</p>
                <p className="text-white text-3xl lg:text-4xl font-light">+1.6%</p>
              </div>
            </div>

            {/* Right: Comparison Section */}
            <div className="relative pl-0 lg:pl-12">
              {/* Gradient divider line */}
              <div className="absolute -left-12 lg:-left-24 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
              <p className="text-white/40 text-xs font-light tracking-[0.2em] uppercase mb-8">Outperforms production/research schedulers</p>
              <p className="text-white text-lg lg:text-xl font-light mb-10">Composite 6-dimensional score</p>

              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-12">
                {['Volcano', 'Run:ai', 'K8sBinpack', 'Yunikorn', 'BFD', 'RoundRobin', 'Tiresias', 'Gandiva'].map((scheduler) => (
                  <div key={scheduler} className="py-3">
                    <p className="text-white text-sm lg:text-base font-light">{scheduler}</p>
                  </div>
                ))}
              </div>

              <p className="text-white/40 text-xs font-light">Measured with oracle job durations from published traces</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="relative bg-black py-28 md:py-40 lg:py-48 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground
          particleCount={6}
          connectDistance={110}
          speed={0.2}
          opacity={0.25}
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
                <h3 className="text-white text-lg lg:text-xl font-normal leading-snug mb-6">
                  <Link to="/news">{item.title}</Link>
                </h3>
                <p className="text-white/40 text-base lg:text-lg font-light leading-relaxed mb-6 line-clamp-3">{item.excerpt}</p>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-white text-base lg:text-lg font-light group/link"
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
