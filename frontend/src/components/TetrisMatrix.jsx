import React, { useRef, useMemo } from 'react';
import { Clock1, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const TetrisMatrix = () => {
  const containerRef = useRef(null);

  // Memoize block layout so it doesn't change on re-renders
  const blocks = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const rand = Math.random();
      let colorClass = 'bg-slate-700/50';
      if (rand > 0.85) colorClass = 'bg-slate-300 shadow-[0_0_12px_rgba(203,213,225,0.5)]';
      else if (rand > 0.75) colorClass = 'bg-slate-400 shadow-[0_0_12px_rgba(148,163,184,0.5)]';
      else if (rand > 0.6) colorClass = 'bg-slate-200 shadow-[0_0_12px_rgba(226,232,240,0.4)]';
      else if (rand > 0.4) colorClass = 'bg-slate-600/80';
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
    gsap.to('.tetris-block.bg-slate-300, .tetris-block.bg-slate-400', {
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
    const blocksElements = gsap.utils.toArray('.tetris-block');
    let isActive = true;

    // 1) Continuous Feed: Unassigned jobs constantly streaming in from the left
    const runConstantFeed = contextSafe(() => {
      if (!isActive) return;
      
      const numJobs = gsap.utils.random(5, 12, 1);
      const shuffled = gsap.utils.shuffle([...blocksElements]);
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
      const shuffled = gsap.utils.shuffle([...blocksElements]);
      const selected = shuffled.slice(0, numJobs);

      const dispatchTl = gsap.timeline({
        onComplete: () => {
          gsap.set(selected, { clearProps: 'all' });
          gsap.set(selected, { opacity: 0 });
          gsap.delayedCall(gsap.utils.random(1.5, 2.5), runProductionDispatch);
        }
      });

      dispatchTl.to(selected, {
        backgroundColor: '#ffffff',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
        opacity: 1,
        duration: 0.1,
        stagger: 0.05
      })
      .to(selected, {
        scale: 1.15,
        duration: 0.15,
        yoyo: true,
        repeat: 3,
        stagger: 0.05,
        ease: 'power1.inOut'
      }, "<")
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

    return () => {
      isActive = false;
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Matrix Grid Container */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 md:gap-3 p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-[2.5rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]">
        {blocks.map((colorClass, i) => (
          <div 
            key={i} 
            className={`tetris-block w-full h-full rounded-sm md:rounded-md ${colorClass}`}
          />
        ))}
      </div>
      
      {/* Decorative overlay elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 blur-2xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-slate-400/10 blur-3xl rounded-full pointer-events-none" />
      
    </div>


  );
};

export default TetrisMatrix;
