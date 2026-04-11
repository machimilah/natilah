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
        onUpdate: function () {
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

      <div ref={containerRef} className="min-h-screen bg-black text-slate-200 font-sans selection:bg-white/10 selection:text-white">

        {/* 4. Metrics / Impact */}
        <section className="relative z-10 py-20 px-6 md:px-12 bg-black">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="reveal-up">
                <h1 className="text-2xl md:text-3xl font-light text-white leading-[1.2] tracking-tight mb-8">
                  Redefining the <br />boundaries of scale.
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-12" />
                <div className="grid grid-cols-2 gap-12">
                  <div className="reveal-up">
                    <div className="text-3xl md:text-4xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="-99.4">0</span>
                      <span className="text-slate-300 text-2xl ml-1">%</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">Mean Wait</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '100ms' }}>
                    <div className="text-3xl md:text-4xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="-99.8">0</span>
                      <span className="text-slate-400 text-2xl ml-1">%</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">P99 Wait</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '200ms' }}>
                    <div className="text-3xl md:text-4xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="metric-counter" data-target="-10.8">0</span>
                      <span className="text-slate-400 text-2xl ml-1">%</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">Energy Reduction</p>
                  </div>
                  <div className="reveal-up" style={{ transitionDelay: '300ms' }}>
                    <div className="text-3xl md:text-4xl font-light text-white mb-2 flex items-baseline tracking-tighter">
                      <span className="font-thin">Quantum</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">QPU Ready</p>
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

        {/* Performance Benchmarks */}
        <section className="relative z-10 py-32 px-6 md:px-12 bg-black border-y border-white/[0.05]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16 reveal-up">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Performance Benchmarks <span className="block text-sm text-slate-400 mt-4 tracking-widest font-montserrat uppercase">Quasar vs Classical Schedulers</span></h2>
            </div>

            {/* Grid of 6 Scatter Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12 w-full">
              {[
                {
                  title: "Makespan",
                  xLabel: "Makespan (Hours) - Lower is better",
                  data: [
                    { label: "Quasar", x: "8%", y: "85%", isHighlight: true, value: "77.1h" },
                    { label: "Kubernetes", x: "32%", y: "65%", value: "77.9h" },
                    { label: "Kueue", x: "38%", y: "45%", value: "78.0h" },
                    { label: "Google DWS", x: "47%", y: "25%", value: "78.2h" },
                    { label: "SLURM/Ray", x: "53%", y: "75%", value: "78.3h" },
                    { label: "IBM LSF/KAI", x: "60%", y: "55%", value: "78.4h" },
                    { label: "Run:ai", x: "72%", y: "35%", value: "78.8h" },
                    { label: "HTCondor", x: "85%", y: "15%", value: "79.0h" },
                  ]
                },
                {
                  title: "Throughput",
                  xLabel: "Throughput (Jobs/h) - Higher is better",
                  data: [
                    { label: "HTCondor", x: "10%", y: "25%", value: "25.2" },
                    { label: "Run:ai", x: "22%", y: "45%", value: "25.3" },
                    { label: "LSF/SLURM/Ray/KAI", x: "38%", y: "65%", value: "25.4" },
                    { label: "Kueue", x: "55%", y: "35%", value: "25.5" },
                    { label: "Kubernetes", x: "68%", y: "75%", value: "25.6" },
                    { label: "Quasar", x: "90%", y: "85%", isHighlight: true, value: "26.0" }
                  ]
                },
                {
                  title: "GPU Utilization",
                  xLabel: "GPU Utilization (%) - Optimal Packing",
                  data: [
                    { label: "Quasar", x: "15%", y: "85%", isHighlight: true, value: "54.9%" },
                    { label: "Kueue", x: "30%", y: "25%", value: "63.0%" },
                    { label: "HTCondor", x: "45%", y: "45%", value: "63.9%" },
                    { label: "IBM LSF", x: "52%", y: "65%", value: "64.0%" },
                    { label: "Run:ai", x: "60%", y: "15%", value: "64.5%" },
                    { label: "Kube/SLURM/Ray", x: "70%", y: "75%", value: "65.0%" },
                    { label: "Google DWS", x: "84%", y: "55%", value: "66.3%" },
                    { label: "NVIDIA KAI", x: "92%", y: "35%", value: "66.5%" },
                  ]
                },
                {
                  title: "Mean Wait Time",
                  xLabel: "Mean Wait (Seconds) - Lower is better",
                  data: [
                    { label: "Quasar", x: "5%", y: "85%", isHighlight: true, value: "33s" },
                    { label: "IBM LSF", x: "32%", y: "25%", value: "5,461s" },
                    { label: "Run:ai", x: "55%", y: "65%", value: "10,292s" },
                    { label: "HTCondor", x: "68%", y: "45%", value: "11,925s" },
                    { label: "Kubernetes", x: "76%", y: "80%", value: "12,084s" },
                    { label: "SLURM/Ray", x: "82%", y: "15%", value: "12,149s" },
                    { label: "NVIDIA KAI", x: "86%", y: "55%", value: "12,340s" },
                    { label: "Google DWS", x: "89%", y: "35%", value: "12,455s" },
                    { label: "Kueue", x: "95%", y: "70%", value: "14,698s" },
                  ]
                },
                {
                  title: "P99 Wait Time",
                  xLabel: "P99 Wait (Seconds) - Lower is better",
                  data: [
                    { label: "Quasar", x: "5%", y: "85%", isHighlight: true, value: "183s" },
                    { label: "IBM LSF", x: "45%", y: "25%", value: "108,111s" },
                    { label: "Google DWS", x: "65%", y: "45%", value: "123,999s" },
                    { label: "Kubernetes", x: "73%", y: "75%", value: "127,127s" },
                    { label: "Run:ai", x: "78%", y: "15%", value: "130,296s" },
                    { label: "SLURM/Ray", x: "83%", y: "65%", value: "130,479s" },
                    { label: "NVIDIA KAI", x: "87%", y: "55%", value: "132,165s" },
                    { label: "HTCondor", x: "90%", y: "35%", value: "132,977s" },
                    { label: "Kueue", x: "96%", y: "80%", value: "157,586s" },
                  ]
                },
                {
                  title: "Energy Consumption",
                  xLabel: "Energy Consumption (kWh) - Lower is better",
                  data: [
                    { label: "Quasar", x: "8%", y: "85%", isHighlight: true, value: "14,767" },
                    { label: "Kueue", x: "42%", y: "25%", value: "16,560" },
                    { label: "IBM LSF", x: "57%", y: "45%", value: "16,853" },
                    { label: "HTCondor", x: "66%", y: "65%", value: "16,957" },
                    { label: "Kubernetes", x: "73%", y: "15%", value: "16,959" },
                    { label: "SLURM/Ray", x: "77%", y: "75%", value: "17,041" },
                    { label: "Run:ai", x: "83%", y: "55%", value: "17,057" },
                    { label: "Google DWS", x: "88%", y: "35%", value: "17,270" },
                    { label: "NVIDIA KAI", x: "94%", y: "60%", value: "17,363" },
                  ]
                }
              ].map((graph, i) => (
                <div key={i} className="reveal-up bg-[#111111] border border-white/5 p-4 md:p-6 pb-12 relative flex flex-col shadow-2xl h-[400px] group transition-all duration-300 hover:border-white/10">
                  <h3 className="text-white text-xl font-medium mb-2 relative z-20">{graph.title}</h3>

                  {/* Graph Container */}
                  <div className="relative w-[calc(100%-2rem)] h-[240px] mt-6 ml-6 border-l border-b border-white/10 flex-grow mb-6">

                    {/* Horizontal Grid lines */}
                    <div className="absolute top-[25%] w-full border-t border-dashed border-white/10" />
                    <div className="absolute top-[50%] w-full border-t border-dashed border-white/10" />
                    <div className="absolute top-[75%] w-full border-t border-dashed border-white/10" />
                    <div className="absolute top-[100%] w-full border-t border-dashed border-white/10" />

                    {/* Axis Label */}
                    <div className="absolute -bottom-8 left-0 text-slate-400 text-[10px] tracking-wider uppercase font-medium whitespace-nowrap">
                      {graph.xLabel}
                    </div>

                    {/* Data Points */}
                    {graph.data.map((pt, j) => (
                      <div key={j} className="absolute w-3 h-3 -translate-x-1/2 translate-y-1/2 z-10 cursor-pointer group/dot" style={{ left: pt.x, bottom: pt.y }}>
                        <div className={`absolute ${parseInt(pt.y) > 50 ? '-bottom-5' : '-top-5'} left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] ${pt.isHighlight ? 'text-slate-200 font-bold' : 'text-slate-400'} flex flex-col items-center pointer-events-none`}>
                          <span>{pt.label}</span>
                          <span className={`text-[9px] ${pt.isHighlight ? 'text-white' : 'text-slate-500'} font-mono`}>{pt.value}</span>
                        </div>
                        <div className={`w-full h-full rounded-full transition-transform duration-300 group-hover/dot:scale-150 ${pt.isHighlight ? 'bg-slate-300 shadow-[0_0_12px_rgba(255,255,255,0.7)] scale-125 z-30 relative' : 'bg-slate-600 opacity-50'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm font-light reveal-up">
              Results achieved in a discrete-event simulator with topology-aware cross-rack penalties. All schedulers were implemented faithfully based on their documented scheduling algorithms
            </div>
          </div>
        </section>

        {/* Matrix Optimization Visualization Section */}
        {/* <section className="relative z-10 py-32 px-6 md:px-12 bg-black overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Live Optimization Engine</h2>
              
            </div>
            <div className="flex justify-center">
              <TetrisMatrix />
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default QuasarPage;