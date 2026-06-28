"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

function Bar({ name, level, color, active, idx }: { name: string; level: number; color: string; active: boolean; idx: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(level), idx * 80 + 300);
    return () => clearTimeout(t);
  }, [active, level, idx]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-[var(--text-secondary)] text-sm">{name}</span>
        <span className="text-xs" style={{ color, fontFamily: "var(--font-mono)" }}>{active ? `${level}%` : "–"}</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}44` }} />
      </div>
    </div>
  );
}

const cats = [
  {
    icon: "🧠", label: "AI / ML & GenAI", color: "var(--cyan)",
    skills: [
      { name: "Python", level: 92 }, { name: "PyTorch / TensorFlow", level: 82 },
      { name: "OpenCV / Computer Vision", level: 85 }, { name: "RAG / LangChain", level: 80 },
      { name: "NLP / LLMs", level: 78 }, { name: "ChromaDB / Vector DBs", level: 72 },
    ],
  },
  {
    icon: "🤖", label: "Robotics & IoT", color: "var(--purple)",
    skills: [
      { name: "ROS2 Navigation Stack", level: 87 }, { name: "Autonomous Navigation", level: 82 },
      { name: "SLAM & Path Planning", level: 80 }, { name: "Gazebo / RViz", level: 80 },
      { name: "Raspberry Pi / ESP32", level: 83 }, { name: "Sensor Fusion", level: 78 },
    ],
  },
  {
    icon: "⚡", label: "Full-Stack & Cloud", color: "var(--green)",
    skills: [
      { name: "FastAPI / REST APIs", level: 82 }, { name: "React.js / Tailwind CSS", level: 75 },
      { name: "JavaScript / TypeScript", level: 72 }, { name: "Docker / AWS EC2", level: 76 },
      { name: "PostgreSQL / SQLAlchemy", level: 74 }, { name: "Git / Linux / CI-CD", level: 88 },
    ],
  },
];

const cloud = [
  "Python","PyTorch","TensorFlow","OpenCV","LangChain","ChromaDB","RAG","LLMs",
  "ROS2","Gazebo","RViz","SLAM","FastAPI","React.js","JavaScript","Tailwind CSS",
  "SQL","PostgreSQL","SQLAlchemy","Docker","AWS EC2","Vercel","Render",
  "Raspberry Pi","ESP32","Sensor Fusion","NLP","Computer Vision","REST APIs","Git","Linux",
];

export default function Skills() {
  const { ref, v } = useInView(0.08);
  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="absolute right-0 top-1/2 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-16 sec-fade ${v ? "visible" : ""}`}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--purple)", fontFamily: "var(--font-mono)" }}>02 / Skills</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.25), transparent)" }} />
        </div>

        <h2 className={`text-5xl md:text-6xl font-bold text-white mb-16 sec-fade ${v ? "visible" : ""}`} style={{ fontFamily: "var(--font-display)", transitionDelay: "0.1s" }}>
          Technical <span style={{ WebkitTextStroke: "1px var(--purple)", color: "transparent" }}>Arsenal</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {cats.map((cat, ci) => (
            <div key={cat.label} className={`g-card p-6 sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: `${ci * 0.12 + 0.15}s` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-semibold text-sm" style={{ color: cat.color, fontFamily: "var(--font-display)" }}>{cat.label}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((s, si) => <Bar key={s.name} name={s.name} level={s.level} color={cat.color} active={v} idx={ci * 6 + si} />)}
              </div>
            </div>
          ))}
        </div>

        {/* APIs & Integrations row */}
        <div className={`g-card p-6 mb-10 sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>APIs & AI Services Integrated</p>
          <div className="flex flex-wrap gap-2">
            {["LangChain + RAG", "ChromaDB", "Llama-3 (Groq)", "AWS EC2", "PostgreSQL", "Docker"].map((t, i) => (
              <span key={t} className="pill" style={{ color: ["var(--cyan)","var(--purple)","var(--green)","var(--orange)","var(--cyan)","var(--purple)"][i % 6] }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Full stack cloud */}
        <div className={`sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.6s" }}>
          <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-5 text-center" style={{ fontFamily: "var(--font-mono)" }}>Complete Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {cloud.map((t, i) => (
              <span key={t} className="pill" style={{
                color: ["var(--cyan)","var(--purple)","var(--green)","var(--orange)"][i % 4],
                borderColor: ["rgba(0,245,255,0.15)","rgba(139,92,246,0.15)","rgba(0,255,136,0.15)","rgba(255,107,53,0.15)"][i % 4],
                animation: v ? `fadeUp 0.5s ${i * 40}ms ease both` : "none",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
