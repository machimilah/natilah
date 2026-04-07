import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChartArea, ChartPie, ChartPieIcon, Clock1, Layers, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP((context, contextSafe) => {
    const tl = gsap.timeline();

    // Parallax background elements
    gsap.to('.hero-bg-video', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black pt-24 md:pt-32 pb-20 md:pb-40"
    >
      {/* Ambient background styling */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Soft, blended video background for motion */}
        <video
          className="hero-bg-video absolute top-0 left-0 w-full h-[120%] object-cover mix-blend-screen opacity-60"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/Quasar2.mp4"
        />

        {/* Sophisticated gradient blurs */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-r from-slate-700/30 to-slate-800/20 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[20%] w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-l from-slate-600/20 to-transparent rounded-full blur-[140px]" />

        {/* Thin architectural grid */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto w-full">

          {/* Main Copy */}
          <div className="flex flex-col items-start text-left pt-10 max-w-4xl">
            <p className="hero-elem text-lg md:text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl border-l-2 border-white/20 pl-6 mb-8 md:mb-12">
              Natilah builds software to optimize compute across AI and emerging quantum systems
            </p>

            <div className="hero-elem flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium rounded-full overflow-hidden shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_-5px_rgba(255,255,255,0.15)] transition-all duration-500 text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
