"use client";
import { useRef, useState, useEffect } from "react";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

const projects = [
  {
    id: "01", icon: "🤖",
    title: "Autonomous Surveillance Rover",
    subtitle: "ROS2 Navigation Stack",
    deployed: "Hardware · Gazebo Simulated",
    description: "Built an autonomous rover on Linux using the ROS2 navigation stack with obstacle avoidance, sensor fusion, and real-time path planning for autonomous indoor/outdoor surveillance. Developed OpenCV-based perception modules for terrain and obstacle detection, improving navigation stability. Simulated and validated workflows in Gazebo before Raspberry Pi deployment, enabling faster debugging and efficient edge-based execution.",
    tech: ["Python", "ROS2", "OpenCV", "Raspberry Pi", "Gazebo", "SLAM", "C"],
    highlights: [
      "Full ROS2 navigation stack integration",
      "OpenCV perception for terrain & obstacle detection",
      "Gazebo → RViz → hardware deployment pipeline",
      "Competed at IIT Madras & COEP Pune",
      "Optimized for edge execution on Raspberry Pi",
    ],
    color: "var(--green)", glow: "rgba(0,255,136,0.06)", border: "rgba(0,255,136,0.18)",
    size: "large",
  },
  {
    id: "02", icon: "🏥",
    title: "SvasthaAI",
    subtitle: "AI-Powered Health OS",
    deployed: "AWS EC2 · Docker",
    description: "Multi-organ disease screening platform supporting 5+ clinical domains using PyTorch and OpenCV for image-based medical inference. Built a RAG pipeline using LangChain, ChromaDB, and Llama-3 achieving 90%+ contextual retrieval accuracy for medical PDF analysis and multilingual wellness coaching. Designed and deployed Dockerized backend services using FastAPI, SQLAlchemy, and AWS EC2 with JWT authentication.",
    tech: ["FastAPI", "LangChain", "AWS EC2", "PyTorch", "OpenCV", "ChromaDB", "Docker", "SQLAlchemy"],
    highlights: [
      "Multi-organ AI diagnostics (5+ clinical domains)",
      "RAG pipeline — 90%+ contextual retrieval accuracy",
      "LangChain + ChromaDB + Llama-3 integration",
      "Dockerized backend on AWS EC2 with JWT auth",
      "Multilingual wellness coaching",
    ],
    color: "var(--cyan)", glow: "rgba(0,245,255,0.06)", border: "rgba(0,245,255,0.18)",
    size: "large",
  },
  {
    id: "03", icon: "⚖️",
    title: "ALIS",
    subtitle: "AI Legal Intelligence System",
    deployed: "Docker · FastAPI + React",
    description: "LegalTech platform for semantic legal search, OCR-based document analysis, and AI-powered legal assistance using transformer-based NLP models. Implemented multilingual NLP pipelines and OCR workflows across large-scale legal datasets, improving document retrieval and contextual search efficiency. Built automated legal drafting and chatbot support using FastAPI and React.",
    tech: ["Legal-BERT", "OCR", "React", "FastAPI", "NLP", "Docker", "TypeScript"],
    highlights: [
      "Transformer-based semantic legal search",
      "OCR-based document analysis pipeline",
      "Multilingual NLP pipelines",
      "Automated legal drafting & chatbot",
      "FastAPI + React full-stack",
    ],
    color: "var(--purple)", glow: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.18)",
    size: "large",
  },
  {
    id: "04", icon: "📡",
    title: "IoT Smart Monitoring",
    subtitle: "Distributed Sensor Networks",
    deployed: "ESP32 · Cloud Dashboard",
    description: "Engineered IoT-based monitoring solutions for water quality analysis, smart irrigation, and laser-based perimeter security using ESP32 and Raspberry Pi. Integrated multiple sensor arrays with cloud dashboards for real-time telemetry, automated alert generation, and remote monitoring. Developed rule-based actuator automation and real-time event logging workflows.",
    tech: ["ESP32", "Raspberry Pi", "IoT Sensors", "Cloud Dashboards", "Microcontrollers"],
    highlights: ["Water quality + smart irrigation", "Laser perimeter security", "Real-time cloud telemetry", "Autonomous actuator control"],
    color: "var(--orange)", glow: "rgba(255,107,53,0.06)", border: "rgba(255,107,53,0.18)",
    size: "small",
  },
];

function ProjCard({ p, visible, idx }: { p: typeof projects[number]; visible: boolean; idx: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`proj-card g-card overflow-hidden sec-fade ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${idx * 0.12}s`, background: hov ? p.glow : "var(--panel)", transition: "background 0.3s, transform 0.3s, box-shadow 0.3s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      data-hover
    >
      {hov && <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />}
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{p.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs" style={{ color: p.color, fontFamily: "var(--font-mono)" }}>{p.id}</span>
                <div className="w-10 h-px" style={{ background: p.color, opacity: 0.3 }} />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: p.glow, border: `1px solid ${p.border}`, color: p.color, fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
              {p.subtitle}
            </span>
            <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>{p.deployed}</span>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{p.description}</p>

        <div className="space-y-1.5 mb-6">
          {p.highlights.map(h => (
            <div key={h} className="flex items-start gap-2 text-sm">
              <span style={{ color: p.color, marginTop: "2px", flexShrink: 0 }}>▸</span>
              <span className="text-[var(--text-secondary)]">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-5 border-t border-[var(--border)]">
          {p.tech.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.border}`, color: p.color, fontFamily: "var(--font-mono)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, v } = useInView(0.04);
  const large = projects.filter(p => p.size === "large");
  const small = projects.filter(p => p.size === "small");

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="absolute left-1/4 top-1/3 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,245,255,0.035) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-16 sec-fade ${v ? "visible" : ""}`}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>03 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.25), transparent)" }} />
        </div>

        <h2 className={`text-5xl md:text-6xl font-bold text-white mb-4 sec-fade ${v ? "visible" : ""}`} style={{ fontFamily: "var(--font-display)", transitionDelay: "0.1s" }}>
          What I&apos;ve <span style={{ WebkitTextStroke: "1px var(--cyan)", color: "transparent" }}>Shipped</span>
        </h2>
        <p className={`text-[var(--text-secondary)] mb-14 max-w-xl sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.18s" }}>
          4 production-grade projects — from autonomous rovers competing at IITs to AI health platforms and LegalTech systems.
        </p>

        {/* Large cards: full width grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {large.map((p, i) => <ProjCard key={p.id} p={p} visible={v} idx={i} />)}
        </div>

        {/* Small cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {small.map((p, i) => <ProjCard key={p.id} p={p} visible={v} idx={large.length + i} />)}
        </div>
      </div>
    </section>
  );
}
