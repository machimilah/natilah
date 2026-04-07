import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Binary, Cpu, Network, Zap, Shield, GitMerge } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroSection from '../components/HeroSection';
import QubitAnimation from '../components/QubitAnimation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HomePage = () => {
  const containerRef = useRef(null);

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
                  Natilah's technology uses quantum-inspired algorithms and common quantum language to orchestrate classical hardware at unprecedented scales, unlocking new frontiers of performance.
                </p>
                <div className="mt-10">
                  <Link
                    to="/products/quasar"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-all duration-300 group shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                  >
                    Discover Quasar
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

        {/* 6. Vision / Storytelling */}
        <section className="vision-section relative z-10 py-32 md:py-48 bg-black border-y border-white/[0.06] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-24 reveal-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* Left Column: Title */}
              <div>
                <p className="text-slate-400 font-medium tracking-widest uppercase mb-6 md:mb-8 text-sm">Quantum Thinking</p>
                <h2 className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight">
                  Designing the nervous system for AI.
                </h2>
              </div>
              
              {/* Right Column: Description */}
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-6 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                  <p>
                    At the frontier of computing, the bottleneck is no longer just FLOPs. It's the orchestration, the physical distance between memory and processors, and the statistical likelihood of idle queues.
                  </p>
                  <p>
                    We are completely rethinking the stack by moving intelligence closer to the metal. Natilah enables hardware-fluid deployments ensuring the world's most brilliant minds never have to wait on infrastructure.
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
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="w-full relative shadow-2xl bg-black reveal-up rounded-[2.5rem] overflow-hidden aspect-video">
              <img
                src="/images/datacenterai.jpg"
                alt="AI Data Center"
                className="vision-image w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 bg-black text-center">
          <div className="max-w-[1000px] mx-auto reveal-up">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] mb-10">
              Build on the <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white bg-[length:200%_auto] animate-gradient-move">cutting edge.</span>
            </h2>
            <p className="text-xl text-slate-300 font-light mb-14 max-w-2xl mx-auto leading-relaxed">
              Step into a new era of performance. Join the researchers, enterprise scaling teams, and visionaries optimizing with Natilah.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-4 lg:py-5 bg-white hover:bg-slate-200 text-slate-900 font-medium rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 text-lg flex items-center justify-center gap-2 group"
              >
                Request Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/docs"
                className="w-full sm:w-auto px-10 py-4 lg:py-5 bg-transparent border border-slate-700 text-white font-medium rounded-full hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 text-lg flex items-center justify-center"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
