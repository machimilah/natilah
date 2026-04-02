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
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Dna,
    title: "Genomic Sequencing & Folding",
    description: "Protein folding algorithms generate non-deterministic workload spikes. Quasar dynamically shifts compute boundaries instantly, shrinking research cycles from weeks to minutes.",
    color: "from-emerald-400 to-teal-500"
  },
  {
    icon: LineChart,
    title: "High-Frequency Trading",
    description: "Latency is the enemy of alpha. Our hardware-embedded schedulers provide deterministic networking routes, ensuring trades execute with mathematical guarantees of speed.",
    color: "from-[#ffca55] to-[#ffca55]"
  },
  {
    icon: Globe,
    title: "Climate & Physics Simulation",
    description: "Global weather patterns require massive sparse matrix calculations. Distribute multi-petabyte datasets fluidly across geographical boundaries without blocking I/O.",
    color: "from-indigo-400 to-blue-500"
  }
];

const ApplicationsPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Parallax background styling
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

      <div ref={containerRef} className="relative bg-[#FAFAFA] text-slate-800 font-sans min-h-screen pt-32 pb-48 overflow-hidden">
        
        {/* Soft Background Orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="parallax-bg absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-cyan-100/40 to-blue-50/20 blur-[130px] rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
           {/* Header */}
           <div className="reveal-up max-w-4xl mb-24 md:mb-32">
            <p className="text-[#ffca55] font-medium tracking-widest uppercase mb-6 text-sm">Industrial Scale</p>
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-10">
              Compute constraints <br/>are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffca55] to-[#ffca55]">obsolete.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              Natilah's runtime layers unlock true potential for the most data-intensive disciplines on Earth. See how the frontier operates.
            </p>
          </div>

          <div className="app-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="app-card group relative p-12 bg-white rounded-[2rem] border border-slate-200/50 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15)] transition-all duration-500 overflow-hidden hover:-translate-y-2">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${useCase.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                  <useCase.icon size={26} className="text-slate-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-light text-slate-900 mb-6">{useCase.title}</h3>
                <p className="text-lg text-slate-500 font-light leading-relaxed mb-10">
                  {useCase.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-[#ffca55] uppercase tracking-widest transition-colors">
                  Explore Architecture <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-up text-center bg-slate-900 text-white rounded-[3rem] p-16 md:p-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#ffca55]/20 to-[#ffca55]/10 mix-blend-screen" />
             <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at center, rgba(14,165,233,0.2) 0%, transparent 70%)` }} />
             
             <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-5xl font-light mb-8">Deploy your own cluster.</h2>
               <p className="text-xl text-white/60 font-light mb-12">Stop treating infrastructure like rental cars. Build a racecar.</p>
               <Link to="/contact" className="inline-block px-10 py-5 bg-white text-slate-900 font-medium rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
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
