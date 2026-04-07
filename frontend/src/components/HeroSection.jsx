import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ChartArea, ChartPie, ChartPieIcon, Clock1, Layers, Play } from 'lucide-react';
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
      className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black pt-24 md:pt-26 pb-20 md:pb-40"
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

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto w-full">

          {/* Main Copy */}
          <div className="flex flex-col items-center text-center pt-24 md:pt-36 max-w-4xl mx-auto">
            
            <style>{`
              @keyframes shimmerMetal {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>

            {/* Real CSS 3D Body Representation */}
            <div className="relative perspective-[1200px] mb-12 flex justify-center" style={{ WebkitPerspective: "1200px" }}>
              <div
                className="relative hero-elem"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(0deg) rotateY(0deg)"
                }}
              >
                {/* Front Face (Mid-Dark Animated Silver Reflective Panel) */}
                <h1
                  className="relative z-50 text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter mix-blend-normal"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    transform: "translateZ(0px)",
                    backgroundImage: "linear-gradient(110deg, #94a3b8 0%, #cbd5e1 25%, #475569 50%, #94a3b8 75%, #f1f5f9 100%)",
                    backgroundSize: "200% auto",
                    animation: "shimmerMetal 6s ease-in-out infinite",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "none"
                  }}
                >
                  Quasar
                </h1>

                {/* 3D Extrusion Layers (body) */}
                {[...Array(40)].map((_, i) => (
                  <h1
                    key={`extrusion-${i}`}
                    className="absolute top-0 left-0 w-full text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      transform: `translateZ(-${i + 1}px)`,
                      color: i % 3 === 0 ? "#94a3b8" : (i % 2 === 0 ? "#475569" : "#334155"), // Mid-tone grooved metallic accent
                      textShadow: i === 39 ? "0px 30px 40px rgba(0,0,0,0.5)" : "none", // Root shadow
                    }}
                  >
                    Quasar
                  </h1>
                ))}
              </div>
            </div>

            <p className="hero-elem text-lg md:text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mb-6 md:mb-8 mx-auto -mt-6">
              The ultimate scheduler.
            </p>

            <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/products/quasar"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full overflow-hidden hover:bg-white/5 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(255,255,255,0.1)] transition-all duration-500 text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Know More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Downward Scroll Indicator Arrow */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <div>
          <ArrowDown className="text-white w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
