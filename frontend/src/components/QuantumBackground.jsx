import React, { useRef, useEffect, useCallback } from 'react';

const QuantumBackground = ({ 
  particleCount = 40, 
  connectDistance = 150, 
  speed = 0.3,
  opacity = 0.25,
  colorScheme = 'mixed'
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const color = getColor(i);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2.2 + 0.8,
        color,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
      });
    }
    return particles;
  }, [particleCount, speed, getColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      particlesRef.current = initParticles(width, height);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.2;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.998;
        p.vy *= 0.998;

        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed < speed * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.08;
        }
      }

      // Draw connections - brighter
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const lineOpacity = (1 - dist / connectDistance) * opacity * 0.7;
            const c1 = particles[i].color;
            const c2 = particles[j].color;
            const r = Math.round((c1.r + c2.r) / 2);
            const g = Math.round((c1.g + c2.g) / 2);
            const b = Math.round((c1.b + c2.b) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles - much brighter glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulseOpacity = opacity * (0.7 + 0.4 * Math.sin(p.pulse));
        const pulseRadius = p.radius * (0.85 + 0.3 * Math.sin(p.pulse));

        // Large outer glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, pulseRadius * 10
        );
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseOpacity * 1.2})`);
        gradient.addColorStop(0.15, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseOpacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseOpacity * 0.15})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, pulseRadius * 10, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${Math.min(p.color.r + 80, 255)}, ${Math.min(p.color.g + 80, 255)}, ${Math.min(p.color.b + 80, 255)}, ${pulseOpacity * 2.5})`;
        ctx.arc(p.x, p.y, pulseRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // White-hot center
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 1.8})`;
        ctx.arc(p.x, p.y, pulseRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles, connectDistance, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default QuantumBackground;
