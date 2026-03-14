import React, { useRef, useEffect, useCallback } from 'react';

const QuantumBackground = ({
  particleCount = 30,
  speed = 0.6,
  opacity = 0.12,
  colorScheme = 'mixed',
  traceCount = 8,
}) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], traces: [], nodes: [] });
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

  const buildCircuit = useCallback((w, h) => {
    const traces = [];
    const nodes = [];
    const hCount = Math.max(3, Math.floor(traceCount * 0.6));
    const vCount = Math.max(3, Math.floor(traceCount * 0.5));

    // Horizontal traces at semi-random y positions
    const hPositions = [];
    for (let i = 0; i < hCount; i++) {
      const y = (h / (hCount + 1)) * (i + 1) + (Math.random() - 0.5) * (h / (hCount + 1)) * 0.4;
      const x1 = Math.random() * w * 0.15;
      const x2 = w - Math.random() * w * 0.15;
      hPositions.push(y);
      traces.push({ x1, y1: y, x2, y2: y, dir: 'h' });
    }

    // Vertical traces at semi-random x positions
    const vPositions = [];
    for (let i = 0; i < vCount; i++) {
      const x = (w / (vCount + 1)) * (i + 1) + (Math.random() - 0.5) * (w / (vCount + 1)) * 0.4;
      const y1 = Math.random() * h * 0.1;
      const y2 = h - Math.random() * h * 0.1;
      vPositions.push(x);
      traces.push({ x1: x, y1, x2: x, y2, dir: 'v' });
    }

    // Nodes at intersections
    for (const hy of hPositions) {
      for (const vx of vPositions) {
        nodes.push({ x: vx, y: hy });
      }
    }

    return { traces, nodes };
  }, [traceCount]);

  const spawnPhoton = useCallback((traces, nodes, index, w, h) => {
    const trace = traces[Math.floor(Math.random() * traces.length)];
    const color = getColor(index);
    const isH = trace.dir === 'h';
    const forward = Math.random() > 0.5;

    let x, y;
    if (isH) {
      x = forward ? trace.x1 : trace.x2;
      y = trace.y1;
    } else {
      x = trace.x1;
      y = forward ? trace.y1 : trace.y2;
    }

    return {
      x,
      y,
      vx: isH ? (forward ? speed : -speed) : 0,
      vy: isH ? 0 : (forward ? speed : -speed),
      color,
      radius: 1.2 + Math.random() * 0.8,
      trail: [],
      trailLength: 12 + Math.floor(Math.random() * 16),
      alive: true,
      turnCooldown: 0,
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

      const { traces, nodes } = buildCircuit(w, h);
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(spawnPhoton(traces, nodes, i, w, h));
      }
      stateRef.current = { particles, traces, nodes };
    };

    const findNearestNode = (px, py, nodes) => {
      let best = null;
      let bestDist = 18; // snap distance
      for (const n of nodes) {
        const d = Math.abs(px - n.x) + Math.abs(py - n.y);
        if (d < bestDist) {
          bestDist = d;
          best = n;
        }
      }
      return best;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const { particles, traces, nodes } = stateRef.current;

      // Draw circuit traces — very faint
      ctx.lineWidth = 0.5;
      for (const t of traces) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
        ctx.stroke();
      }

      // Draw nodes — faint dots at intersections
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & draw photons
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLength) p.trail.shift();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.turnCooldown = Math.max(0, p.turnCooldown - 1);

        // Check if near a node — maybe turn
        if (p.turnCooldown === 0) {
          const node = findNearestNode(p.x, p.y, nodes);
          if (node) {
            const isMovingH = Math.abs(p.vx) > 0;
            // 40% chance to turn at a node
            if (Math.random() < 0.4) {
              const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || speed;
              if (isMovingH) {
                p.vx = 0;
                p.vy = Math.random() > 0.5 ? spd : -spd;
              } else {
                p.vy = 0;
                p.vx = Math.random() > 0.5 ? spd : -spd;
              }
              p.x = node.x;
              p.y = node.y;
              p.turnCooldown = 40;
            }
          }
        }

        // Respawn if out of bounds
        if (p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) {
          const newP = spawnPhoton(traces, nodes, i, w, h);
          Object.assign(p, newP);
          continue;
        }

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const progress = t / p.trail.length;
            const trailOpacity = progress * opacity * 0.6;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${trailOpacity})`;
            ctx.lineWidth = p.radius * progress * 0.8;
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
        }

        // Draw photon glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity * 0.9})`);
        gradient.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${Math.min(p.color.r + 60, 255)}, ${Math.min(p.color.g + 60, 255)}, ${Math.min(p.color.b + 60, 255)}, ${opacity * 1.4})`;
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
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
  }, [buildCircuit, spawnPhoton, particleCount, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default QuantumBackground;
