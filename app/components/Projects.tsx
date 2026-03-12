"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

const projects = [
  {
    id: "01",
    title: "SehatSaathi",
    subtitle: "AI Health & Wellness Platform",
    description:
      "An AI-powered health assistant capable of detecting skin, eye, oral, bone X-ray, and lung conditions through computer vision. Integrated an AI health coach using GPT models for personalized lifestyle guidance, plus automated workout and nutrition planners.",
    tech: ["Python", "PyTorch", "OpenCV", "Streamlit", "OpenAI API"],
    color: "var(--cyan)",
    glow: "rgba(0, 245, 255, 0.08)",
    border: "rgba(0, 245, 255, 0.15)",
    features: [
      "Multi-condition medical image analysis",
      "GPT-powered health coaching",
      "Automated meal & workout planner",
      "Region-of-interest detection",
    ],
    icon: "🩺",
    size: "large",
  },
  {
    id: "02",
    title: "Autonomous Surveillance Rover",
    subtitle: "ROS2 Navigation Stack",
    description:
      "Designed an autonomous rover for navigation and surveillance using the ROS2 stack. Implemented perception modules for obstacle detection, terrain analysis, and adaptive speed control. Tested in Gazebo/RViz before hardware deployment on Raspberry Pi.",
    tech: ["Python", "C++", "ROS2", "Raspberry Pi", "Gazebo", "RViz"],
    color: "var(--purple)",
    glow: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.15)",
    features: [
      "Autonomous navigation with ROS2",
      "Obstacle detection & terrain analysis",
      "Gazebo/RViz simulation pipeline",
      "Optimized for Raspberry Pi",
    ],
    icon: "🤖",
    size: "large",
  },
  {
    id: "03",
    title: "College Info Chatbot",
    subtitle: "AI Assistant · GitHub Pages",
    description:
      "An AI chatbot answering student queries on admissions, fees, scholarships, and deadlines. Uses Google Gemini for contextual NLP with modular backend APIs for easy content updates.",
    tech: ["Python", "Gemini API", "REST APIs", "GitHub Pages"],
    color: "var(--green)",
    glow: "rgba(0, 255, 136, 0.08)",
    border: "rgba(0, 255, 136, 0.15)",
    features: [
      "Gemini-powered contextual responses",
      "Serverless architecture",
      "Modular FAQ backend",
    ],
    icon: "💬",
    size: "small",
  },
  {
    id: "04",
    title: "IoT Smart Monitoring",
    subtitle: "Sensor Fusion · Cloud Dashboard",
    description:
      "IoT systems for water quality monitoring, smart irrigation control, and laser-based perimeter security. Real-time cloud dashboards with rule-based automation triggers.",
    tech: ["IoT Sensors", "Microcontrollers", "Cloud Dashboards"],
    color: "var(--orange)",
    glow: "rgba(255, 107, 53, 0.08)",
    border: "rgba(255, 107, 53, 0.15)",
    features: [
      "Water quality & irrigation control",
      "Laser perimeter security",
      "Real-time cloud monitoring",
    ],
    icon: "📡",
    size: "small",
  },
];

export default function Projects() {
  const { ref, visible } = useInView(0.05);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      {/* Glow accents */}
      <div
        className="absolute left-1/4 top-1/3 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-[var(--cyan)] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            03 / PROJECTS
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.3), transparent)" }} />
        </div>

        <h2
          className={`text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          What I&apos;ve{" "}
          <span style={{ WebkitTextStroke: "1px var(--cyan)", color: "transparent" }}>Built</span>
        </h2>
        <p
          className={`text-[var(--text-secondary)] mb-16 max-w-xl transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          From autonomous rovers to AI health platforms — projects that solve real problems.
        </p>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  visible,
  index,
}: {
  project: (typeof projects)[number];
  visible: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card gradient-border rounded-xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        background: hovered ? project.glow : "var(--panel)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono"
                  style={{ color: project.color, fontFamily: "var(--font-mono)" }}
                >
                  {project.id}
                </span>
                <div className="w-12 h-px" style={{ background: project.color, opacity: 0.3 }} />
              </div>
              <h3
                className="text-xl font-bold text-white mt-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <div
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: `${project.glow}`,
              border: `1px solid ${project.border}`,
              color: project.color,
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.subtitle.split(" · ")[0]}
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-5 border-t border-[var(--border)]">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded font-mono"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${project.border}`,
                color: project.color,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover scan line */}
      {hovered && (
        <div
          className="absolute inset-x-0 h-0.5 top-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
}
