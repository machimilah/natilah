import React, { useRef, useEffect, useCallback } from 'react';

const QuantumBackground = ({
  particleCount = 18,
  speed = 0.8,
  opacity = 0.12,
  colorScheme = 'mixed',
  traceCount = 6,
}) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], traces: [] });
  const animFrameRef = useRef(null);

  const getColor = useCallback((index) => {
    if (colorScheme === 'green') return { r: 16, g: 185, b: 129 };
    if (colorScheme === 'purple') return { r: 168, g: 85, b: 247 };
    if (colorScheme === 'cyan') return { r: 34, g: 211, b: 238 };
    const colors = [
      { r: 16, g: 185, b: 129 },
      { r: 168, g: 85, b: 247 },
      { r: 34, g: 211, b: 238 },
      { r: 245, g: 158, b: 11 },
    ];
    return colors[index % colors.length];
  }, [colorScheme]);

  const buildTraces = useCallback((w, h) => {
    const traces = [];

    // Mostly horizontal traces spanning the full width
    const hCount = Math.max(4, traceCount);
    for (let i = 0; i < hCount; i++) {
      const y = (h / (hCount + 1)) * (i + 1) + (Math.random() - 0.5) * (h / (hCount + 1)) * 0.3;
      traces.push({ y, dir: 'h' });
    }

    // A few vertical connectors so photons can drift between lanes
    const vCount = Math.max(2, Math.floor(traceCount * 0.35));
    for (let i = 0; i < vCount; i++) {
      const x = (w / (vCount + 1)) * (i + 1) + (Math.random() - 0.5) * (w / (vCount + 1)) * 0.4;
      traces.push({ x, dir: 'v' });
    }

    return traces;
  }, [traceCount]);

  const spawnPhoton = useCallback((traces, index, w, h) => {
    const color = getColor(index);
    const hTraces = traces.filter(t => t.dir === 'h');
    const trace = hTraces[Math.floor(Math.random() * hTraces.length)];

    // Always start from the left edge (or near it) and move right
    return {
      x: -Math.random() * 60,
      y: trace.y + (Math.random() - 0.5) * 4,
      vx: speed * (0.6 + Math.random() * 0.6),   // always rightward, varied speed
      vy: 0,
      baseY: trace.y,
      color,
      radius: 1.0 + Math.random() * 0.7,
      trail: [],
      trailLength: 25 + Math.floor(Math.random() * 30),
      laneChangeTimer: 80 + Math.floor(Math.random() * 200),
    };
  }, [speed, getColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const traces = buildTraces(w, h);
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const p = spawnPhoton(traces, i, w, h);
        // Stagger initial positions across the screen width for first render
        p.x = Math.random() * w;
        particles.push(p);
      }
      stateRef.current = { particles, traces };
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const { particles, traces } = stateRef.current;
      const hTraces = traces.filter(t => t.dir === 'h');
      const vTraces = traces.filter(t => t.dir === 'v');

      // Draw horizontal trace lines — very faint
      for (const t of hTraces) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, t.y);
        ctx.lineTo(w, t.y);
        ctx.stroke();
      }

      // Draw vertical connector lines — even fainter
      for (const t of vTraces) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(t.x, 0);
        ctx.lineTo(t.x, h);
        ctx.stroke();
      }

      // Update & draw photons
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Store trail position
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLength) p.trail.shift();

        // Move — predominantly right
        p.x += p.vx;
        p.y += p.vy;

        // Gradually return to the nearest horizontal lane
        if (Math.abs(p.vy) < 0.01) {
          // Smoothly settle onto baseY
          const diff = p.baseY - p.y;
          if (Math.abs(diff) > 0.5) {
            p.y += diff * 0.03;
          }
        }

        // Lane change: occasionally drift to a different horizontal trace
        p.laneChangeTimer--;
        if (p.laneChangeTimer <= 0) {
          // Check if near a vertical connector
          let nearV = false;
          for (const vt of vTraces) {
            if (Math.abs(p.x - vt.x) < 20) { nearV = true; break; }
          }
          if (nearV && Math.random() < 0.35) {
            // Pick a new horizontal lane
            const newTrace = hTraces[Math.floor(Math.random() * hTraces.length)];
            const dy = newTrace.y - p.y;
            p.vy = dy * 0.02; // gentle vertical drift
            p.baseY = newTrace.y;
            // Slow down horizontal slightly during transition
            p.vx *= 0.85;
          }
          p.laneChangeTimer = 100 + Math.floor(Math.random() * 250);
        }

        // Dampen vertical velocity over time
        p.vy *= 0.97;

        // Restore horizontal speed gradually
        const targetVx = speed * (0.6 + (i % 5) * 0.1);
        p.vx += (targetVx - p.vx) * 0.01;

        // Respawn when off the right edge
        if (p.x > w + 60) {
          const newP = spawnPhoton(traces, i, w, h);
          Object.assign(p, newP);
          continue;
        }

        // Draw trail — fading left
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const progress = t / p.trail.length;
            const a = progress * opacity * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${a})`;
            ctx.lineWidth = p.radius * progress * 0.7;
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
        }

        // Draw photon glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grd.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity * 0.85})`);
        grd.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity * 0.25})`);
        grd.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${Math.min(p.color.r + 50, 255)}, ${Math.min(p.color.g + 50, 255)}, ${Math.min(p.color.b + 50, 255)}, ${opacity * 1.2})`;
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [buildTraces, spawnPhoton, particleCount, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default QuantumBackground;
