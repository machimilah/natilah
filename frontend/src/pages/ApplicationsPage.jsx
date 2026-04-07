import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Brain, Dna, ArrowRight, LineChart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const useCases = [
  {
    icon: Brain,
    title: "Large Language Model Training",
    description: "Training trillion-parameter models requires keeping thousands of GPUs synchronous. Natilah eliminates micro-stalls, ensuring near continuous 100% FLOP utilization during epochs.",
    color: "from-slate-300 to-slate-500"
  },
  {
    icon: Dna,
    title: "Genomic Sequencing & Folding",
    description: "Protein folding algorithms generate non-deterministic workload spikes. Quasar dynamically shifts compute boundaries instantly, shrinking research cycles from weeks to minutes.",
    color: "from-slate-200 to-slate-400"
  },
  {
    icon: LineChart,
    title: "High-Frequency Trading",
    description: "Latency is the enemy of alpha. Our hardware-embedded schedulers provide deterministic networking routes, ensuring trades execute with mathematical guarantees of speed.",
    color: "from-white to-slate-300"
  },
  {
    icon: Globe,
    title: "Climate & Physics Simulation",
    description: "Global weather patterns require massive sparse matrix calculations. Distribute multi-petabyte datasets fluidly across geographical boundaries without blocking I/O.",
    color: "from-slate-300 to-slate-500"
  }
];

const ApplicationsPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to('.parallax-bg', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Applications | Natilah Compute</title>
        <meta name="description" content="Discover how Natilah accelerates the world's most demanding workloads across AI, genomics, and simulation." />
      </Helmet>

      <div ref={containerRef} className="relative bg-black text-slate-200 font-sans min-h-screen pt-32 pb-48 overflow-hidden">

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="parallax-bg absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-slate-700/20 to-slate-800/10 blur-[130px] rounded-full" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="reveal-up max-w-4xl mb-24 md:mb-32">
            <p className="text-slate-400 font-medium tracking-widest uppercase mb-6 text-sm">Industrial Scale</p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mb-10">
              Compute constraints <br />are <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">obsolete.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
              Natilah's runtime layers unlock true potential for the most data-intensive disciplines on Earth. See how the frontier operates.
            </p>
          </div>

          <div className="app-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="app-card group relative p-12 bg-white/[0.03] rounded-[2rem] border border-white/[0.06] shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] transition-all duration-500 overflow-hidden">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${useCase.color} rounded-full blur-[80px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700`} />
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 border border-white/[0.06]">
                  <useCase.icon size={26} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-light text-white mb-6">{useCase.title}</h3>
                <p className="text-lg text-slate-400 font-light leading-relaxed mb-10">
                  {useCase.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">
                  Explore Architecture <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-up text-center bg-black text-white rounded-[3rem] p-16 md:p-24 relative overflow-hidden border border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] mix-blend-screen" />
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)` }} />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light mb-8">Deploy your own cluster.</h2>
              <p className="text-xl text-white/50 font-light mb-12">Stop treating infrastructure like rental cars. Build a racecar.</p>
              <Link to="/contact" className="inline-block px-10 py-5 bg-white text-slate-900 font-medium rounded-full text-lg transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ApplicationsPage;
