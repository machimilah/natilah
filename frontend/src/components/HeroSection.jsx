import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChartArea, ChartPie, ChartPieIcon, Clock1, Layers, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const containerRef = useRef(null);

  // Memoize block layout so it doesn't change on re-renders
  const blocks = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const rand = Math.random();
      let colorClass = 'bg-slate-200/50';
      if (rand > 0.85) colorClass = 'bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.5)]';
      else if (rand > 0.75) colorClass = 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]';
      else if (rand > 0.6) colorClass = 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]';
      else if (rand > 0.4) colorClass = 'bg-slate-300/80';
      return colorClass;
    });
  }, []);

  useGSAP((context, contextSafe) => {
    const tl = gsap.timeline();
    
    // Matrix scrambling animation
    tl.fromTo('.tetris-block:not(.floating-card)', 
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        ease: 'none',
        stagger: {
          amount: 1.5,
          from: 'random',
          grid: [10, 10]
        }
      }
    );

    // Ambient processing flicker on deep node colors
    gsap.to('.tetris-block.bg-blue-600, .tetris-block.bg-indigo-500', {
      opacity: 0.4,
      duration: 0.2,
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.1,
        from: 'random'
      },
      ease: 'stepped'
    });

    // Production Chain / Scheduling Optimization Logic
    const blocks = gsap.utils.toArray('.tetris-block');
    let isActive = true;

    // 1) Continuous Feed: Unassigned jobs constantly streaming in from the left
    const runConstantFeed = contextSafe(() => {
      if (!isActive) return;
      
      const numJobs = gsap.utils.random(5, 12, 1);
      const shuffled = gsap.utils.shuffle([...blocks]);
      // Exclude blocks that might be in the middle of being dispatched
      const selected = shuffled.slice(0, numJobs);

      gsap.fromTo(selected, {
        x: '-=100',
        scaleX: 1.5,
        opacity: 0
      }, {
        x: 0,
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(selected, { clearProps: 'transform' });
          gsap.delayedCall(gsap.utils.random(0.3, 0.8), runConstantFeed);
        }
      });
    });

    // 2) Optimization & Dispatch: Select a few, optimize (green), and eject to the right
    const runProductionDispatch = contextSafe(() => {
      if (!isActive) return;
      
      const numJobs = gsap.utils.random(3, 6, 1);
      const shuffled = gsap.utils.shuffle([...blocks]);
      const selected = shuffled.slice(0, numJobs);

      const dispatchTl = gsap.timeline({
        onComplete: () => {
          // Clear most props but explicitly set opacity to 0 so they remain "empty" in the grid until next feed cycle
          gsap.set(selected, { clearProps: 'all' });
          gsap.set(selected, { opacity: 0 });
          gsap.delayedCall(gsap.utils.random(1.5, 2.5), runProductionDispatch);
        }
      });

      // Target acquired: illuminate green to show "Optimized" (stays green)
      dispatchTl.to(selected, {
        backgroundColor: '#10b981', // green-500
        boxShadow: '0 0 15px rgba(16, 185, 129, 0.7)',
        opacity: 1,
        duration: 0.1,
        stagger: 0.05
      })
      // Pulse size only so they don't revert color before swiping
      .to(selected, {
        scale: 1.15,
        duration: 0.15,
        yoyo: true,
        repeat: 3,
        stagger: 0.05,
        ease: 'power1.inOut'
      }, "<")
      // Take them apart/Dispatch: swipe fast to the right and disappear
      .to(selected, {
        x: '+=150',
        scaleX: 1.5,
        scaleY: 0.8,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in'
      });
    });

    // Begin production lines after initial load
    gsap.delayedCall(2, () => {
      runConstantFeed();
      runProductionDispatch();
    });

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

    return () => {
      isActive = false; // cleanup loop
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#FAFAFA] pt-24 md:pt-32 pb-20 md:pb-40"
    >
      {/* Ambient background styling */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Soft, blended video background for motion */}
        <video 
          className="hero-bg-video absolute top-0 left-0 w-full h-[120%] object-cover mix-blend-overlay opacity-[0.35]"
          autoPlay 
          muted 
          loop 
          playsInline
          src="/videos/atom.mp4"
        />

        {/* Sophisticated gradient blurs */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-r from-blue-100 to-indigo-50/40 rounded-full blur-[100px] mix-blend-darken" />
        <div className="absolute top-[20%] -right-[20%] w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-l from-cyan-50/60 to-transparent rounded-full blur-[140px] mix-blend-darken" />

        {/* Thin architectural grid */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{
               backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFAFA]/70 to-[#FAFAFA] z-0" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <div className="flex flex-col items-start text-left pt-10">
            
            
            <h1 className="hero-elem text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-light text-slate-900 leading-[1.05] tracking-tight mb-6 md:mb-8">
              Engineering <br />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ffca55] via-indigo-500 to-[#ffca55] animate-gradient-move">the future of compute</span>
            </h1>
            <p className="hero-elem text-lg md:text-xl lg:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl border-l-2 border-blue-600/30 pl-6 mb-8 md:mb-12">
              Natilah builds software to optimize compute across AI and emerging quantum systems
            </p>

             <div className="hero-elem flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-medium rounded-full overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_20px_40px_-5px_rgba(15,23,42,0.3)] transition-all duration-500 hover:-translate-y-1 text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* <button
                 className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur border border-slate-200/80 text-slate-800 font-medium rounded-full hover:bg-white hover:border-slate-300 transition-all duration-300 text-lg gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Play size={10} className="text-[#ffca55] ml-0.5" />
                </div>
                Watch Keynote
              </button> */}
            </div>
          </div>

          {/* Right: Tetris Matrix */}
          <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0 aspect-square">
             {/* Matrix Grid Container */}
             <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 md:gap-3 p-6 bg-white/40 backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]">
                {blocks.map((colorClass, i) => (
                  <div 
                    key={i} 
                    className={`tetris-block w-full h-full rounded-sm md:rounded-md ${colorClass}`}
                  />
                ))}
             </div>
             
             {/* Decorative overlay elements */}
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 blur-2xl rounded-full pointer-events-none" />
             <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-400/20 blur-3xl rounded-full pointer-events-none" />
             
             {/* Floating UI metric */}
             <div className="floating-card absolute -left-6 md:-left-12 top-[15%] bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-4 shadow-xl text-sm font-medium text-slate-700 hidden sm:block">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                   <Clock1 size={22} className="text-green-500" />
                 </div>
                 <div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Custer wait time</div>
                   <div className="text-lg font-semibold text-slate-900 leading-tight">-78%</div>
                 </div>
               </div>
             </div>

             {/* Floating Metric 2 */}
             <div className="floating-card absolute -right-4 md:-right-8 bottom-[15%] bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-4 shadow-xl text-sm font-medium text-slate-700 hidden sm:block">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                   <Layers size={18} className="text-[#ffca55]" />
                 </div>
                 <div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Compute density</div>
                   <div className="text-lg font-semibold text-[#ffca55] leading-tight">14.2%</div>
                 </div>
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
