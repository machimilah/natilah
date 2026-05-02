import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 0, b: 255 };
}

const HeroWaves = ({ accent = "#3B82F6" }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let rafId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x > -80 && x < rect.width + 80 && y > -80 && y < rect.height + 80) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    const spacing = 24;
    const baseDot = 1.4;
    const repelRadius = 180;
    const repelStrength = 42;
    const accentRgb = hexToRgb(accent);

    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const cx = mouseRef.current.x;
      const cy = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const wave =
            Math.sin(x * 0.012 + t * 1.15) * 10 +
            Math.cos(y * 0.016 + t * 0.75) * 6;

          let dx = 0;
          let dy = 0;
          let nearness = 0;
          if (active) {
            const diffX = x - cx;
            const diffY = y - cy;
            const dist = Math.hypot(diffX, diffY);
            if (dist < repelRadius) {
              const fall = 1 - dist / repelRadius;
              const force = fall * fall * repelStrength;
              const inv = 1 / Math.max(dist, 0.001);
              dx = diffX * inv * force;
              dy = diffY * inv * force;
              nearness = fall;
            }
          }

          const px = x + dx;
          const py = y + wave + dy;
          const r = baseDot + nearness * 2.8;

          if (nearness > 0) {
            const a = 0.35 + nearness * 0.65;
            ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${a})`;
          } else {
            const vertical = y / height;
            const base = 0.22 + (1 - vertical) * 0.16 + (wave + 15) / 60 * 0.14;
            // Using white for base dots in dark mode
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.14, Math.min(0.5, base))})`;
          }

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (active) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
        g.addColorStop(0, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.08)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - 120, cy - 120, 240, 240);
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.hero-elem', {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[60vh] flex flex-col justify-center bg-[#050505] overflow-hidden py-16"
    >
      {/* Background Dots Canvas */}
      <HeroWaves accent="#3B82F6" />

      {/* Edge Fades (Dots disappearance) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-[1] pointer-events-none" />

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-32 mx-auto max-w-[1600px] pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-4 md:pt-12">

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start max-w-3xl pointer-events-auto">


            {/* Main Headline (Logo) */}
            <div className="hero-elem mb-8">
              <img 
                src="/images/natilahonlywhite.png" 
                alt="Natilah Logo" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain" 
              />
            </div>

            {/* Description */}
            <p className="hero-elem text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mb-12">
              Building the bridge between AI and Quantum Computing.
            </p>


          </div>

        </div>
      </div>

      {/* Massive Emerging Logo */}
      <div className="hidden md:block absolute -bottom-[40%] right-[10%] w-[50vw] max-w-[1000px] h-auto pointer-events-none z-[1] opacity-100 brightness-[0.6]">
        <img
          src="/images/logo_transparent.png"
          alt="Natilah Logo"
          className="w-full h-auto drop-shadow-[0_0_120px_rgba(59,130,246,0.15)]"
        />
      </div>

      {/* Bottom Divider Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
    </section>
  );
};

export default HeroSection;
