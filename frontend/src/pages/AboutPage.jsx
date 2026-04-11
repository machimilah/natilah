import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Lightbulb, Workflow, Cpu, Infinity, Zap, Brain, User } from 'lucide-react';
import { useTeam } from '../hooks/useData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutPage = () => {
  const containerRef = useRef(null);
  const { data: teamData, loading: teamLoading } = useTeam();

  useGSAP(() => {
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


      <div ref={containerRef} className="relative bg-black text-slate-200 font-sans min-h-screen pt-32 pb-48 overflow-hidden">

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <div className="reveal-up max-w-4xl mb-24 md:mb-32">
            <p className="text-slate-400 font-medium tracking-widest uppercase mb-6 text-sm">About Natilah</p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mb-10">
              Improving the present <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">by looking forward.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
              To get the best of this era of accelerated discovery and technological change, we must use the power of the future to improve the present. Then, use the improved past to accelerate the future.
            </p>
          </div>

          {/* Philosophy / Values */}
          <div className="reveal-up mb-32 md:mb-40">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12">Q-Thinking </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "Global view", desc: "To understand a problem, we must see the big picture." },
                { icon: Zap, title: "Q-Think the Problem", desc: "Try to identify the most efficient solution from the broader perspective of the problem." },
                { icon: Target, title: "Target the solution", desc: "Focus on the desired outcome, target it, and execute with precision." }
              ].map((val, i, arr) => (
                <div
                  key={i}
                  className={
                    `p-10 bg-black transition-all duration-500 ` +
                    (i !== arr.length - 1 ? ' md:border-r md:border-gray-800' : '')
                  }
                >
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-6">
                    <val.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">{val.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team / Execution */}
          <div className="reveal-up">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">The team</h2>
              <p className="text-lg text-slate-400 max-w-2xl font-light">
              </p>
            </div>

            <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamLoading ? (
                <p className="text-slate-400">Combobulating....</p>
              ) : (
                teamData?.map((member, i) => (
                  <div key={i} className="team-card bg-black rounded-xl p-8 transition-all duration-500">
                    <div className="w-20 h-20 bg-black rounded-2xl mb-6 flex items-center justify-center border border-white/[0.06]">
                      <User size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-slate-300 font-medium mb-4">{member.role}</p>

                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-xs font-semibold text-slate-500 hover:text-white uppercase tracking-wider transition-colors">
                        LinkedIn
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;
