import React, { useEffect, useRef } from 'react';

export function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle density based on screen size
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.6;
        this.vy = prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.6;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce at boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Interaction with mouse cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          // Gentle attraction toward mouse
          this.x += directionX * force * 1.5;
          this.y += directionY * force * 1.5;
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? 'rgba(96, 165, 250, 0.45)' // Bright soft blue in dark mode
          : 'rgba(37, 99, 235, 0.35)'; // Crisp blue in light mode
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Render loop
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // Draw interactive connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 125) {
            const opacity = (1 - distance / 125) * (isDark ? 0.22 : 0.15);
            ctx.strokeStyle = isDark
              ? `rgba(96, 165, 250, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Draw line to mouse if in proximity
        const mouseDx = mouse.x - particles[a].x;
        const mouseDy = mouse.y - particles[a].y;
        const mouseDistance = Math.hypot(mouseDx, mouseDy);

        if (mouseDistance < mouse.radius) {
          const mouseOpacity = (1 - mouseDistance / mouse.radius) * (isDark ? 0.45 : 0.3);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${mouseOpacity})` // Cyan-blue connection
            : `rgba(37, 99, 235, ${mouseOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        particles[a].update();
        particles[a].draw(isDark);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dynamic Canvas Particles & Neural Mesh */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle Geometric Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(var(--borders)_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* Dynamic Ambient Gradient Glows that follow modern glass aesthetic */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        className="absolute top-1/2 -left-48 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" 
      />
      <div 
        className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" 
      />
    </div>
  );
}

