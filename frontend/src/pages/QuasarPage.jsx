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

        {/*
          All metrics, benchmark results, and related sections have been commented out as per request.
          Original content is preserved below for future reference.

          ...existing code for metrics, impact, and performance benchmarks...
        */}

        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-white/10 selection:text-white flex items-center justify-center">
          <div className="text-center w-full">
            <div className="text-3xl md:text-5xl font-light text-white mb-6">Work in progress</div>
          </div>
        </div>
      </>
  );
};

export default QuasarPage;