import React, { useRef, useEffect, useCallback } from 'react';

const QuantumBackground = ({
  particleCount = 18,
  speed = 0.8,
  opacity = 0.12,
  colorScheme = 'mixed',
  traceCount = 6,
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const getColor = useCallback((index) => {
    return { r: 255, g: 255, b: 255 };
  }, []);

  const buildTraces = useCallback((w, h) => {
    const traces = [];

    // Static horizontal traces with quantum nodes
    const hCount = Math.max(3, traceCount);
    for (let i = 0; i < hCount; i++) {
      const y = (h / (hCount + 1)) * (i + 1);
      traces.push({ y, dir: 'h', x1: 0, x2: w });
    }

    // A few vertical connectors
    const vCount = Math.max(2, Math.floor(traceCount * 0.35));
    for (let i = 0; i < vCount; i++) {
      const x = (w / (vCount + 1)) * (i + 1);
      traces.push({ x, dir: 'v', y1: 0, y2: h });
    }

    return traces;
  }, [traceCount]);

  const spawnPhoton = useCallback((traces, index, w, h) => {
    const color = getColor(index);
    const hTraces = traces.filter(t => t.dir === 'h');
    const trace = hTraces[Math.floor(Math.random() * hTraces.length)];

    return {
      x: Math.random() * w,
      y: trace.y,
      vx: 0,
      vy: 0,
      baseY: trace.y,
      color,
      radius: 0.8,
      trail: [],
    };
  }, [getColor]);

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

      // Render static grid immediately
      renderStatic(ctx, w, h);
    };

    const renderStatic = (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      // Draw datacenter grid pattern
      const gridSize = 200;
      ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.15})`;
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw quantum nodes at intersections
      const nodeSize = 2;
      ctx.fillStyle = `rgba(100, 200, 255, ${opacity * 0.4})`;
      for (let x = 0; x <= w; x += gridSize) {
        for (let y = 0; y <= h; y += gridSize) {
          ctx.fillRect(x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);
        }
      }

      // Draw connecting photon lines (static paths)
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.08})`;
      ctx.lineWidth = 0.3;
      const traces = buildTraces(w, h);
      
      for (const trace of traces) {
        ctx.beginPath();
        if (trace.dir === 'h') {
          ctx.moveTo(trace.x1, trace.y);
          ctx.lineTo(trace.x2, trace.y);
        } else {
          ctx.moveTo(trace.x, trace.y1);
          ctx.lineTo(trace.x, trace.y2);
        }
        ctx.stroke();
      }

      // Draw subtle photon nodes along paths
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      const photonNodeSize = 1.2;
      for (const trace of traces) {
        if (trace.dir === 'h') {
          for (let x = trace.x1; x <= trace.x2; x += 60) {
            ctx.fillRect(x - photonNodeSize / 2, trace.y - photonNodeSize / 2, photonNodeSize, photonNodeSize);
          }
        } else {
          for (let y = trace.y1; y <= trace.y2; y += 60) {
            ctx.fillRect(trace.x - photonNodeSize / 2, y - photonNodeSize / 2, photonNodeSize, photonNodeSize);
          }
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const animationFrameId = animFrameRef.current;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [buildTraces, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default QuantumBackground;
