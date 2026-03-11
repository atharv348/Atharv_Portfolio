"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const skillCategories = [
  {
    label: "AI & Machine Learning",
    color: "var(--cyan)",
    icon: "🧠",
    skills: [
      { name: "Python", level: 90 },
      { name: "PyTorch", level: 78 },
      { name: "OpenCV / Computer Vision", level: 82 },
      { name: "Machine Learning", level: 80 },
      { name: "Deep Learning", level: 72 },
    ],
  },
  {
    label: "Robotics & Embedded",
    color: "var(--purple)",
    icon: "🤖",
    skills: [
      { name: "ROS2", level: 85 },
      { name: "C++", level: 75 },
      { name: "Autonomous Navigation", level: 80 },
      { name: "Gazebo / RViz", level: 78 },
      { name: "Raspberry Pi / IoT", level: 82 },
    ],
  },
  {
    label: "Web & Backend",
    color: "var(--green)",
    icon: "⚡",
    skills: [
      { name: "REST APIs", level: 76 },
      { name: "JavaScript / TypeScript", level: 65 },
      { name: "HTML / CSS", level: 72 },
      { name: "Streamlit", level: 85 },
      { name: "Git / Linux", level: 88 },
    ],
  },
];

const techCloud = [
  "Python", "C++", "ROS2", "PyTorch", "OpenCV",
  "TensorFlow", "Gazebo", "RViz", "Raspberry Pi",
  "Linux", "Git", "Streamlit", "REST API",
  "OpenAI API", "Gemini API", "Sensor Fusion",
  "SLAM", "NumPy", "FastAPI", "Docker",
];

function SkillBar({ name, level, color, active, index }: {
  name: string;
  level: number;
  color: string;
  active: boolean;
  index: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setWidth(level), index * 100 + 200);
    return () => clearTimeout(t);
  }, [active, level, index]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[var(--text-secondary)] text-sm">{name}</span>
        <span className="text-xs font-mono" style={{ color, fontFamily: "var(--font-mono)" }}>
          {active ? `${level}%` : "–"}
        </span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}44`,
            transitionDuration: "1.2s",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, visible } = useInView(0.1);

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Glow accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-[var(--purple)] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            02 / SKILLS
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.3), transparent)" }} />
        </div>

        <h2
          className={`text-5xl md:text-6xl font-bold text-white mb-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          Technical{" "}
          <span style={{ WebkitTextStroke: "1px var(--purple)", color: "transparent" }}>
            Arsenal
          </span>
        </h2>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.label}
              className={`gradient-border rounded-xl p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${ci * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3
                  className="font-semibold text-white text-sm"
                  style={{ fontFamily: "var(--font-display)", color: cat.color }}
                >
                  {cat.label}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    active={visible}
                    index={ci * 5 + si}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech cloud */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p
            className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-6 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Full Technology Stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techCloud.map((tech, i) => (
              <span
                key={tech}
                className="tech-pill cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible ? `fadeInUp 0.5s ${i * 50}ms ease forwards` : "none",
                  color: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--purple)" : "var(--green)",
                  borderColor: i % 3 === 0 ? "rgba(0,245,255,0.2)" : i % 3 === 1 ? "rgba(139,92,246,0.2)" : "rgba(0,255,136,0.2)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
