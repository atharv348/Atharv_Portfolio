"use client";
import { useEffect, useRef, useState } from "react";

function useInView(el: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, [el, threshold]);
  return v;
}

function Counter({ to, suffix, active }: { to: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0; const step = (to / 1800) * 16;
    const t = setInterval(() => { v += step; if (v >= to) { setN(to); clearInterval(t); } else setN(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [active, to]);
  return <>{n}{suffix}</>;
}

const stats = [
  { label: "Projects Shipped", value: 4, suffix: "+" },
  { label: "CGPA", value: 8, suffix: ".32" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Code Lines Written", value: 50, suffix: "K+" },
];

const edu = [
  { degree: "B.Tech — AI & Machine Learning", school: "D.Y. Patil Agriculture & Technical University, Kolhapur", note: "CGPA: 8.32 · May 2027", color: "var(--cyan)" },
  { degree: "Senior Secondary (Class XII)", school: "Padmashree Dr. V.V. Patil Sainik School, Pravaranagar", note: "63% · 2023", color: "var(--text-muted)" },
];

function TermLine({ prefix, children, delay, active, accent = false }: { prefix: string; children: React.ReactNode; delay: number; active: boolean; accent?: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!active) return; const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [active, delay]);
  if (!show) return null;
  return (
    <div className="flex gap-2 text-xs leading-relaxed" style={{ fontFamily: "var(--font-mono)", animation: "fadeUp 0.4s ease both" }}>
      <span style={{ color: accent ? "var(--cyan)" : "var(--text-muted)", userSelect: "none" }}>{prefix}</span>
      <span style={{ color: accent ? "var(--cyan)" : "var(--text-secondary)" }}>{children}</span>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref as React.RefObject<HTMLElement>);

  return (
    <section id="about" className="py-32 relative" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <div className={`flex items-center gap-4 mb-16 sec-fade ${visible ? "visible" : ""}`}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>01 / About</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.25), transparent)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className={`sec-fade ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Architecting AI<br />
              <span style={{ WebkitTextStroke: "1px var(--cyan)", color: "transparent" }}>at Scale</span>
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-[0.95rem]">
              <p>
                I&apos;m Atharv — a B.Tech AI/ML student (CGPA: 8.32, graduating May 2027) at D.Y. Patil Agriculture and Technical University, Kolhapur. I architect and ship end-to-end intelligent systems across healthcare, legal technology, and robotics.
              </p>
              <p>
                From <span style={{ color: "var(--cyan)" }}>SvasthaAI</span> — a full-stack health OS with RAG-powered medical analysis and multi-organ clinical inference, to{" "}
                <span style={{ color: "var(--purple)" }}>ALIS</span> — an AI Legal Intelligence System with transformer-based NLP and OCR workflows, to an{" "}
                <span style={{ color: "var(--green)" }}>autonomous surveillance rover</span> built on ROS2 that competed at IIT Madras and COEP Pune.
              </p>
              <p>
                I build with <span className="text-white font-medium">Python · PyTorch · ROS2 · FastAPI · LangChain · Docker · AWS</span> — and I care deeply about production-grade, deployable AI, not just research demos.
              </p>
              <p>
                National-level competitor. <span style={{ color: "var(--orange)" }}>Cyber Suraksha Warrior of the Year 2025</span>. Fluent in Hindi & Marathi.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10">
              <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-5" style={{ fontFamily: "var(--font-mono)" }}>Education</p>
              <div className="space-y-3">
                {edu.map(e => (
                  <div key={e.degree} className="g-card p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-white text-sm font-medium">{e.degree}</p>
                        <p className="text-[var(--text-muted)] text-xs mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{e.school}</p>
                      </div>
                      <span className="text-xs whitespace-nowrap mt-0.5" style={{ color: e.color, fontFamily: "var(--font-mono)" }}>{e.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={`sec-fade ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((s, i) => (
                <div key={s.label} className="g-card p-5 text-center">
                  <div className="stat-num"><Counter to={s.value} suffix={s.suffix} active={visible} /></div>
                  <p className="text-xs text-[var(--text-muted)] mt-2 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className="g-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="text-[var(--text-muted)] text-xs ml-2" style={{ fontFamily: "var(--font-mono)" }}>atharv@portfolio:~$</span>
              </div>
              <div className="p-5 space-y-1.5">
                <TermLine prefix="$" delay={100} active={visible} accent>whoami</TermLine>
                <TermLine prefix=">" delay={350} active={visible}>Atharv C. Joshi — AI/ML + Robotics + GenAI</TermLine>
                <TermLine prefix="$" delay={650} active={visible} accent>cat stack.json</TermLine>
                <TermLine prefix=">" delay={900} active={visible}>{`{ ai: ["PyTorch","LangChain","RAG"],`}</TermLine>
                <TermLine prefix=" " delay={1000} active={visible}>{`  web: ["FastAPI","React","Docker"],`}</TermLine>
                <TermLine prefix=" " delay={1100} active={visible}>{`  robot: ["ROS2","Gazebo","SLAM"] }`}</TermLine>
                <TermLine prefix="$" delay={1400} active={visible} accent>echo $STATUS</TermLine>
                <TermLine prefix=">" delay={1650} active={visible}>🟢 AVAILABLE · BUILDING · COMPETING</TermLine>
                <TermLine prefix="$" delay={1900} active={visible} accent>echo $CGPA</TermLine>
                <TermLine prefix=">" delay={2100} active={visible}>8.32 / 10 · D.Y. Patil University</TermLine>
              </div>
            </div>

            {/* Live site link */}
            <a
              href="https://atharv-portfolio-lime.vercel.app"
              target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 g-card p-4 group"
              style={{ textDecoration: "none" }}
              data-hover
            >
              <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              <span className="text-[var(--text-secondary)] text-sm group-hover:text-white transition-colors">atharv-portfolio-lime.vercel.app</span>
              <span className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--cyan)] transition-colors">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
