"use client";
import { useEffect, useRef } from "react";

function Typewriter({ texts }: { texts: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let ti = 0, ci = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cur = texts[ti];
      if (del) {
        ci--; el.textContent = cur.slice(0, ci);
        if (ci === 0) { del = false; ti = (ti + 1) % texts.length; t = setTimeout(tick, 500); return; }
        t = setTimeout(tick, 38);
      } else {
        ci++; el.textContent = cur.slice(0, ci);
        if (ci === cur.length) { del = true; t = setTimeout(tick, 2200); return; }
        t = setTimeout(tick, 75);
      }
    };
    t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, [texts]);
  return <span ref={ref} className="tcursor" style={{ color: "white", fontFamily: "var(--font-mono)" }} />;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight, animId: number;
    canvas.width = W; canvas.height = H;

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.4, a: Math.random() * 0.45 + 0.08, pulse: Math.random() * Math.PI * 2,
    }));

    let mx = -999, my = -999;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - d / 110) * 0.07})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        const md = Math.hypot(p.x - mx, p.y - my);
        if (md < 160) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(0,245,255,${(1 - md / 160) * 0.13})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
        p.pulse += 0.018;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.a + Math.sin(p.pulse) * 0.08})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="scan-line" />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
          style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)", fontFamily: "var(--font-mono)" }}>
          <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
          <span className="text-[var(--green)] text-xs tracking-widest uppercase">Open to Opportunities · 2027 Graduate</span>
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.88] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
          <span className="block text-white" style={{ animation: "fadeUp 0.8s 0.15s ease both" }}>ATHARV</span>
          <span className="block" style={{ animation: "fadeUp 0.8s 0.3s ease both", WebkitTextStroke: "1px rgba(0,245,255,0.45)", color: "transparent" }}>
            C. JOSHI
          </span>
        </h1>

        {/* Typewriter */}
        <div className="mb-8" style={{ animation: "fadeUp 0.8s 0.45s ease both", opacity: 0 }}>
          <p className="text-base md:text-lg text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "var(--cyan)" }}>{">"}</span>{" "}
            <Typewriter texts={[
              "AI & Machine Learning Engineer",
              "Autonomous Robotics Builder",
              "Computer Vision Specialist",
              "GenAI & RAG Developer",
              "Full-Stack AI Developer",
              "ROS2 Navigation Expert",
            ]} />
          </p>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" style={{ animation: "fadeUp 0.8s 0.6s ease both", opacity: 0 }}>
          {["Python", "PyTorch", "ROS2", "FastAPI", "React", "LangChain", "Docker", "AWS"].map(t => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16" style={{ animation: "fadeUp 0.8s 0.75s ease both", opacity: 0 }}>
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="/Atharv_Joshi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Download Resume ↗
          </a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeUp 0.8s 1.1s ease both", opacity: 0 }}>
          <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>Scroll</span>
          <div className="w-px h-14 overflow-hidden">
            <div className="w-full h-7 bg-gradient-to-b from-[var(--cyan)] to-transparent" style={{ animation: "scanAnim 2s linear infinite" }} />
          </div>
        </div>
      </div>

      {/* Corner meta */}
      <div className="absolute top-24 left-6 opacity-[0.15] pointer-events-none hidden lg:block" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", lineHeight: 1.8 }}>
        <div>{"// ATHARV_PORTFOLIO v2.0"}</div>
        <div>{"// STACK: Next.js · TS · Tailwind"}</div>
        <div>{"// STATUS: LIVE"}</div>
      </div>
      <div className="absolute bottom-8 right-6 opacity-[0.15] pointer-events-none hidden lg:block text-right" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", lineHeight: 1.8 }}>
        <div>{"BURHANPUR / MP / INDIA"}</div>
        <div>{"LAT: 21.31° N · LNG: 76.23° E"}</div>
        <div>{"IIT-COMPETED · NATIONAL RANKED"}</div>
      </div>
    </section>
  );
}
