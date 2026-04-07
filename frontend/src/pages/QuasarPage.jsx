import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { Activity, Cpu, Network, Zap, Shield, GitMerge } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BinaryTicker from '../components/BinaryTicker';
import TetrisMatrix from '../components/TetrisMatrix';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QuasarPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    window.scrollTo(0, 0);

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
        onUpdate: function() {
           metric.innerHTML = Number(this.targets()[0].innerHTML).toFixed(isFloat ? 1 : 0);
        }
      });
    });
  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Quasar | Natilah Products</title>
        <meta name="description" content="Quasar - Redefining the boundaries of scale." />
      </Helmet>

      <div ref={containerRef} className="pt-24 min-h-screen bg-black text-slate-200 font-sans selection:bg-white/10 selection:text-white">
        
        {/* 4. Metrics / Impact */}
        <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 bg-black">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="reveal-up">
                <h1 className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight mb-8">
                  Redefining the <br />boundaries of scale.
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-12" />
                <div className="grid grid-cols-2 gap-12">
                  <div className="reveal-up">
                    <div className="text-5xl md:text-6xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="99.9">0</span>
                      <span className="text-slate-300 text-4xl">%</span>
                    </div>
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Uptime Guarantee</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '100ms' }}>
                    <div className="text-5xl md:text-6xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="3.4">0</span>
                      <span className="text-slate-400 text-4xl">x</span>
                    </div>
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Faster Job Completion</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '200ms' }}>
                    <div className="text-5xl md:text-6xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="72">0</span>
                      <span className="text-slate-400 text-4xl">%</span>
                    </div>
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Win Rate vs Scheds</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '300ms' }}>
                    <div className="text-5xl md:text-6xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="150.000">150.000</span>
                      <span className="text-slate-300 text-4xl">+</span>
                    </div>
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Active Nodes Tested</p>
                  </div>
                </div>
              </div>
              
              <div className="relative reveal-up h-full hidden lg:flex items-center justify-center">
                <div className="w-full aspect-square max-w-lg rounded-full bg-white/[0.02] border border-white/[0.06] shadow-[0_0_80px_rgba(255,255,255,0.03)] relative flex items-center justify-center p-8 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                  
                  {/* Abstract diagram */}
                  <div className="w-full h-full relative">
                    {/* Decorative Rings */}
                    <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_50s_linear_infinite] border-dashed" />
                    <div className="absolute inset-12 border border-white/[0.06] rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                    <div className="absolute inset-24 border border-slate-400/15 rounded-full animate-[spin_25s_linear_infinite]" />
                    
                    {/* Full Orbits for Balls */}
                    <div className="absolute inset-4 rounded-full animate-[spin_30s_linear_infinite]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                    </div>
                    <div className="absolute inset-12 rounded-full animate-[spin_45s_linear_infinite_reverse]">
                      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-300 rounded-full shadow-[0_0_15px_rgba(203,213,225,0.6)]" />
                    </div>
                    <div className="absolute inset-24 rounded-full animate-[spin_35s_linear_infinite]">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full shadow-[0_0_10px_rgba(148,163,184,0.6)]" />
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-white to-slate-400 rounded-full blur-[20px] opacity-15 group-hover:opacity-30 transition-opacity duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center border border-white/[0.1]">
                      <BinaryTicker />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="relative z-10 py-24 px-6 md:px-12 bg-white/[0.02] backdrop-blur-3xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Multi-Dimensional Spatial Packing", desc: "Replaces traditional lineare task queues with geometric routing, analyzing the entire datacenter like a game of Tetris to elimiate hardware fragmentation and stranded GPUs." },
                { icon: Cpu, title: "Maximized Physicall Density", desc: "Extracts significantly more copmute power from your exaact existing hardware." },
                { icon: Network, title: "Accelerated Pipeline Execution", desc: "Clears datacenter congesion natively, drastically reducing researcher wait times and accelerating model time-to-market without requiring additional server purchases." },
                { icon: Activity, title: "Hyper-Scalable Architecture", desc: "Built from the ground on advanced mathematical evaluations that scale to manage the world's most massive AI superclusters." },
                { icon: Shield, title: "Continuous Rolling Optimization", desc: "Captures global datacenter view, constantly perfecting the cluster state without ever interrumpting or pausing active, live workloads." },
                { icon: GitMerge, title: "Fluid Scalability", desc: "Designed with an autonomous, mathematically rigorous fallback system to guarantee absolute scheduling continuity and flawless execution even under extreme datacenter volatility. " }
              ].map((item, i) => (
                <div key={i} className="stagger-card group p-10 bg-white/[0.03] rounded-3xl border border-white/[0.06] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-8 border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:border-white/10 transition-colors duration-500">
                    <item.icon size={22} className="text-slate-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Matrix Optimization Visualization Section */}
        <section className="relative z-10 py-32 px-6 md:px-12 bg-black overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Live Optimization Engine</h2>
              <p className="text-slate-400 max-w-2xl text-lg font-light">
                Visualize how Quasar analyzes and packs workloads in real-time, eliminating stranded capacity across the entire supercluster.
              </p>
            </div>
            <div className="flex justify-center">
              <TetrisMatrix />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuasarPage;