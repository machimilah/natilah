import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Binary, Cpu, Network, Zap, Shield, GitMerge, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroSection from '../components/HeroSection';
import QubitAnimation from '../components/QubitAnimation';
import { useNews } from '../hooks/useData';

gsap.registerPlugin(ScrollTrigger, useGSAP);


const HomePage = () => {
  const containerRef = useRef(null);
  const { data: newsData, loading: newsLoading } = useNews();

  useGSAP(() => {
    // Subtly parallaxing background shapes
    gsap.to('.parallax-shape', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // Metric counter animation
    const metrics = gsap.utils.toArray('.metric-counter');
    metrics.forEach(metric => {
      const target = parseFloat(metric.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;

      gsap.to(metric, {
        innerHTML: target,
        duration: 3,
        ease: 'power4.out',
        snap: { innerHTML: isFloat ? 0.1 : 1 },
        scrollTrigger: {
          trigger: metric,
          start: 'top 85%',
        },
        onUpdate: function () {
          metric.innerHTML = Number(this.targets()[0].innerHTML).toFixed(isFloat ? 1 : 0);
        }
      });
    });

    // Continuous abstract rotation
    gsap.to('.spin-slow', {
      rotation: 360,
      duration: 50,
      repeat: -1,
      ease: 'linear'
    });

    // Subtle image zoom on scroll
    gsap.to('.vision-image', {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: '.vision-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Natilah</title>
        <meta name="description" content="Next-generation computational scheduling and orchestration for extreme-scale clusters." />
      </Helmet>

      <div ref={containerRef} className="relative bg-black text-slate-200 font-sans selection:bg-white/10 selection:text-white overflow-hidden">

        {/* Ambient global shapes */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="parallax-shape absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-slate-700/20 to-slate-800/10 blur-[100px]" />
          <div className="parallax-shape absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-slate-600/15 to-slate-700/10 blur-[120px]" />
        </div>

        {/* 1. Hero Section */}
        <HeroSection data={{ heading: '', description: '', ctaLink: '', ctaText: '' }} bannerVisible={true} />

        {/* 3. Platform & Technology Section */}
        <section className="relative z-10 py-16 md:py-24 px-6 md:px-12 bg-black border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-0 items-center">
              <div className="reveal-up max-w-4xl">

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-8">
                  The future of<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white bg-[length:200%_auto] animate-gradient-move">Computation</span>
                </h2>
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                  We believe the future of computation is Quantum.
                </p>
                <div className="mt-10">
                  <Link
                    to="/products/"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-lg font-medium transition-all duration-500 shadow-xl text-white bg-black border border-white/[0.1] hover:bg-gray-300 hover:text-black shadow-black/20 hover:shadow-white/10 group"
                  >
                    Products
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="reveal-up w-full flex justify-center lg:justify-end">
                <QubitAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Separator to match the width of the vision image container */}
        <div className="w-full bg-black relative z-10 pt-16 md:pt-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="w-full h-px bg-white/[0.15]"></div>
          </div>
        </div>

        {/* 6. Vision / Storytelling */}
        <section className="vision-section relative z-10 py-24 md:py-32 bg-black border-b border-white/[0.06] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-24 reveal-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* Left Column: Title */}
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight">
                  Designing the nervous system for AI.
                </h2>
              </div>

              {/* Right Column: Description */}
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-6 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                  <p>
                    Natilah plans to be the software and foundation company for the advancement of computation.
                  </p>
                  <p>
                    Both in classical and quantum computing, we are building the software that will orchestrate the next generation of hardware, enabling researchers and enterprises to push the boundaries of what's possible with AI and scientific discovery.
                  </p>
                </div>
                <div className="mt-12 lg:mt-16">
                  <Link to="/about" className="inline-flex items-center gap-3 text-white font-medium hover:text-slate-300 transition-colors group">
                    Learn about our mission
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contained Image */}
          <div className="max-w-[1024px] mx-auto px-6 md:px-12 mt-12">
            <div className="w-full relative shadow-2xl bg-black reveal-up overflow-hidden aspect-[2.35/1]">
              <img
                src="/images/brianpenny-ai-generated-8533600.jpg"
                alt="Nervous System of AI"
                className="vision-image w-full h-full object-cover"
              />
            </div>
          </div>
        </section>


        {/* 7. Final CTA */}
        <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 bg-black text-center">
          <div className="max-w-[1000px] mx-auto reveal-up">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] mb-10">
              Got any <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white bg-[length:200%_auto] animate-gradient-move">Questions?</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-4 lg:py-5 rounded-xl text-lg font-medium transition-all duration-500 shadow-xl text-white bg-black border border-white/[0.1] hover:bg-gray-300 hover:text-black shadow-black/20 hover:shadow-white/10 flex items-center justify-center gap-2 group"
              >
                Contact <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7.5 News Section */}
        <section className="relative z-10 py-24 md:py-32 bg-black border-b border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 md:mb-24 reveal-up">
            <h2 className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight mb-10 text-center">Latest News</h2>
            {newsLoading ? (
              <div className="flex justify-center items-center h-32 text-slate-500">
                <span className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {newsData && newsData.slice(0,2).map(news => (
                  <div key={news.id} className="bg-black rounded-2xl p-8 flex flex-col h-full">
                    <div className="mb-3 text-xs text-slate-400 uppercase tracking-widest">{news.date}</div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{news.title}</h3>
                    <p className="text-slate-300 font-light mb-6">{news.excerpt}</p>
                    <Link to={news.linkUrl || `/news/${news.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-300 transition-colors group">
                      Read more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
