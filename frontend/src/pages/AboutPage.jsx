import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Lightbulb, Workflow, Cpu, Infinity, Zap } from 'lucide-react';
import { aboutPageData } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Parallax floating BG Orbs
    gsap.to('.parallax-bg', {
      yPercent: -20,
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
        <title>About Us | Natilah</title>
        <meta name="description" content="Discover the mission, philosophy, and engineers behind Natilah's frontier computing platform." />
      </Helmet>

      <div ref={containerRef} className="relative bg-[#FAFAFA] text-slate-800 font-sans min-h-screen pt-32 pb-48 overflow-hidden">
        
        {/* Soft Background Orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="parallax-bg absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-blue-100/40 to-indigo-50/20 blur-[120px] rounded-full mix-blend-multiply" />
          <div className="parallax-bg absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-l from-cyan-50/50 to-transparent blur-[100px] rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <div className="reveal-up max-w-4xl mb-24 md:mb-32">
            <p className="text-[#ffca55] font-medium tracking-widest uppercase mb-6 text-sm">About Natilah</p>
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-10">
              We build the infrastructure for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffca55] to-[#ffca55]">impossible.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              Natilah was founded on a singular premise: the hardware is capable, but the orchestration is broken. We are bridging the gap between theoretical limits and actual execution, giving humanity the compute power it needs to tackle existential problems.
            </p>
          </div>

          {/* Philosophy / Values */}
          <div className="reveal-up mb-32 md:mb-40">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-12">Core Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Infinity, title: "Infinite Fluidity", desc: "Compute should behave like water: routing around bottlenecks, scaling effortlessly, and filling the shape of the problem." },
                { icon: Zap, title: "Zero Friction", desc: "Eliminating microseconds of latency compounds to years of saved research time. We optimize down to the bare metal." },
                { icon: Target, title: "Deterministic Outcomes", desc: "In a world of probabilistic chaos, our schedulers bring rigorous mathematical certainty to every payload." }
              ].map((val, i) => (
                <div key={i} className="p-10 bg-white/60 backdrop-blur border border-slate-200/50 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                     <val.icon size={22} className="text-[#ffca55]" />
                   </div>
                   <h3 className="text-xl font-medium text-slate-900 mb-4">{val.title}</h3>
                   <p className="text-slate-500 font-light leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team / Execution */}
          <div className="reveal-up">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">The Architects</h2>
              <p className="text-lg text-slate-500 max-w-2xl font-light">
                We are a team of low-level systems engineers, quantum physicists, and distributed networking veterans. We build tools that command bare metal.
              </p>
            </div>
            
            <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutPageData.team?.map((member, i) => (
                 <div key={i} className="team-card bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center border border-slate-200/50">
                       <Cpu size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-[#ffca55] font-medium mb-4">{member.role}</p>
                    <p className="text-slate-500 font-light text-sm line-clamp-3">{member.bio || "Systems architecture & computing research."}</p>
                    
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-xs font-semibold text-slate-400 hover:text-[#ffca55] uppercase tracking-wider transition-colors">
                        LinkedIn
                      </a>
                    )}
                 </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;
