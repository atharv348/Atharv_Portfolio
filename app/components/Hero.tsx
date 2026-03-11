"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const PARTICLE_COUNT = 80;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse attraction
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - mDist / 150) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.pulse += 0.02;
        const alphaPulse = p.alpha + Math.sin(p.pulse) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alphaPulse})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 fade-in-up"
          style={{
            background: "rgba(0, 255, 136, 0.05)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
          <span className="text-[var(--green)] text-xs tracking-widest uppercase">
            Open to Opportunities
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="fade-in-up delay-100 text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="block text-white"
            style={{ opacity: 0, animation: "fadeInUp 0.8s 0.2s ease forwards" }}
          >
            ATHARV
          </span>
          <span
            className="block"
            style={{
              opacity: 0,
              animation: "fadeInUp 0.8s 0.35s ease forwards",
              WebkitTextStroke: "1px rgba(0, 245, 255, 0.4)",
              color: "transparent",
            }}
          >
            C. JOSHI
          </span>
        </h1>

        {/* Subtitle with typewriter */}
        <div
          className="mt-6 mb-8"
          style={{ opacity: 0, animation: "fadeInUp 0.8s 0.5s ease forwards" }}
        >
          <p
            className="text-lg md:text-xl text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="text-[var(--cyan)]">{">"}</span>{" "}
            <TypewriterText
              texts={[
                "AI & Machine Learning Engineer",
                "Autonomous Robotics Builder",
                "Computer Vision Specialist",
                "ROS2 Navigation Expert",
                "IoT Systems Developer",
              ]}
            />
          </p>
        </div>

        {/* Descriptor tags */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{ opacity: 0, animation: "fadeInUp 0.8s 0.65s ease forwards" }}
        >
          {[
            "Python",
            "C++",
            "ROS2",
            "PyTorch",
            "OpenCV",
            "Raspberry Pi",
          ].map((tag) => (
            <span key={tag} className="tech-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0, animation: "fadeInUp 0.8s 0.8s ease forwards" }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0, animation: "fadeInUp 0.8s 1.2s ease forwards" }}
        >
          <span
            className="text-[var(--text-muted)] text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scroll
          </span>
          <div className="w-0.5 h-16 overflow-hidden">
            <div
              className="w-full h-8 bg-gradient-to-b from-[var(--cyan)] to-transparent"
              style={{
                animation: "scan 2s linear infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none hidden lg:block">
        <div
          className="text-[var(--cyan)] text-xs"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div>{"// ATHARV_PORTFOLIO_v2.0"}</div>
          <div>{"// BUILD: 2025.03.11"}</div>
          <div>{"// STATUS: RUNNING"}</div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none hidden lg:block">
        <div
          className="text-[var(--cyan)] text-xs text-right"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div>{"LAT: 21.3067° N"}</div>
          <div>{"LNG: 76.1288° E"}</div>
          <div>{"INDIA / MP"}</div>
        </div>
      </div>
    </section>
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let textIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = texts[textIdx];
      if (deleting) {
        charIdx--;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          textIdx = (textIdx + 1) % texts.length;
          timer = setTimeout(type, 500);
          return;
        }
        timer = setTimeout(type, 40);
      } else {
        charIdx++;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(type, 2000);
          return;
        }
        timer = setTimeout(type, 80);
      }
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, [texts]);

  return (
    <span
      ref={ref}
      className="text-white terminal-cursor"
      style={{ fontFamily: "var(--font-mono)" }}
    />
  );
}
