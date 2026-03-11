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

const achievements = [
  {
    rank: "4th Overall",
    highlight: "2nd in Rover Domain",
    event: "MindSpark 2025",
    organizer: "L&T Tech Xcelerate · COEP Pune",
    description:
      "Built an autonomous navigation rover that competed among India's top engineering teams at one of the most prestigious tech fests.",
    icon: "🏆",
    color: "var(--orange)",
    glow: "rgba(255, 107, 53, 0.08)",
    border: "rgba(255, 107, 53, 0.2)",
    badge: "National",
  },
  {
    rank: "13th Nationwide",
    highlight: "Team AutoNavX",
    event: "RoboRun · Shaastra 2026",
    organizer: "IIT Madras",
    description:
      "As part of Team AutoNavX, built an autonomous maze-solving robot using IR sensors and real-time navigation algorithms.",
    icon: "🥇",
    color: "var(--cyan)",
    glow: "rgba(0, 245, 255, 0.08)",
    border: "rgba(0, 245, 255, 0.2)",
    badge: "IIT Madras",
  },
  {
    rank: "Top 5 Teams",
    highlight: "Finalist",
    event: "Autodev Hackathon",
    organizer: "Techfest · IIT Bombay",
    description:
      "Selected as finalist among hundreds of teams at India's largest international science and technology festival.",
    icon: "⚡",
    color: "var(--purple)",
    glow: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.2)",
    badge: "IIT Bombay",
  },
  {
    rank: "National Award",
    highlight: "Warrior of the Year",
    event: "Cyber Suraksha Warrior 2025",
    organizer: "Quick Heal Foundation",
    description:
      "Recognized nationally for outstanding contributions to cybersecurity awareness and digital safety education.",
    icon: "🛡️",
    color: "var(--green)",
    glow: "rgba(0, 255, 136, 0.08)",
    border: "rgba(0, 255, 136, 0.2)",
    badge: "National Award",
  },
];

export default function Achievements() {
  const { ref, visible } = useInView(0.1);

  return (
    <section id="achievements" className="py-32 relative" ref={ref}>
      {/* Background glow */}
      <div
        className="absolute right-1/4 bottom-1/3 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-[var(--orange)] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            04 / ACHIEVEMENTS
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,107,53,0.3), transparent)" }} />
        </div>

        <h2
          className={`text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          Battle{" "}
          <span style={{ WebkitTextStroke: "1px var(--orange)", color: "transparent" }}>
            Tested
          </span>
        </h2>
        <p
          className={`text-[var(--text-secondary)] mb-16 max-w-lg transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Competing and winning at India&apos;s top engineering institutions.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {achievements.map((ach, i) => (
            <div
              key={ach.event}
              className={`gradient-border rounded-xl p-6 relative overflow-hidden group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms`, background: "var(--panel)" }}
              data-cursor="hover"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: ach.glow }}
              />

              {/* Top accent line on hover */}
              <div
                className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
              />

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: ach.glow, border: `1px solid ${ach.border}` }}
                >
                  {ach.icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Badge + Rank */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: ach.glow,
                        border: `1px solid ${ach.border}`,
                        color: ach.color,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {ach.badge}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: ach.color, fontFamily: "var(--font-display)" }}
                    >
                      {ach.rank}
                    </span>
                  </div>

                  {/* Event */}
                  <h3
                    className="text-white font-bold text-lg mb-0.5 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {ach.event}
                  </h3>
                  <p
                    className="text-[var(--text-muted)] text-xs mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {ach.organizer}
                  </p>

                  {/* Highlight */}
                  <div
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded mb-3"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: ach.color }}>✦</span>
                    <span className="text-white font-medium">{ach.highlight}</span>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div
          className={`mt-12 gradient-border rounded-xl p-8 transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "IIT Madras", label: "Competed At" },
              { value: "IIT Bombay", label: "Competed At" },
              { value: "COEP Pune", label: "Competed At" },
              { value: "Quick Heal", label: "Recognized By" },
            ].map((item) => (
              <div key={item.label + item.value}>
                <p
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.value}
                </p>
                <p
                  className="text-[var(--text-muted)] text-xs mt-1 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
