"use client";
import { useRef, useState, useEffect } from "react";

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

const achievements = [
  {
    rank: "2nd Place · Rover Domain",
    event: "MindSpark 2025",
    organizer: "COEP Pune",
    description: "Secured 2nd place in the Rover Domain at MindSpark 2025, building an autonomous navigation rover competing against top national engineering teams at COEP's flagship technical festival.",
    icon: "🏆", color: "var(--orange)", glow: "rgba(255,107,53,0.07)", border: "rgba(255,107,53,0.2)", badge: "National · COEP",
  },
  {
    rank: "13th Nationwide",
    event: "RoboRun · Shaastra 2026",
    organizer: "IIT Madras",
    description: "Ranked 13th nationally in RoboRun at Shaastra 2026, building an autonomous maze-solving robot using IR sensors and real-time navigation algorithms at IIT Madras.",
    icon: "🥇", color: "var(--cyan)", glow: "rgba(0,245,255,0.07)", border: "rgba(0,245,255,0.2)", badge: "IIT Madras",
  },
  {
    rank: "National Award",
    event: "Cyber Suraksha Warrior of the Year 2025",
    organizer: "Quick Heal Foundation",
    description: "Recognized nationally for outstanding contributions to cybersecurity awareness and digital safety initiatives by the Quick Heal Foundation.",
    icon: "🛡️", color: "var(--green)", glow: "rgba(0,255,136,0.07)", border: "rgba(0,255,136,0.2)", badge: "National Award",
  },
];

export default function Achievements() {
  const { ref, v } = useInView(0.08);

  return (
    <section id="achievements" className="py-32 relative" ref={ref}>
      <div className="absolute right-1/4 bottom-1/3 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-16 sec-fade ${v ? "visible" : ""}`}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--orange)", fontFamily: "var(--font-mono)" }}>04 / Achievements</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,107,53,0.25), transparent)" }} />
        </div>

        <h2 className={`text-5xl md:text-6xl font-bold text-white mb-4 sec-fade ${v ? "visible" : ""}`} style={{ fontFamily: "var(--font-display)", transitionDelay: "0.1s" }}>
          Battle <span style={{ WebkitTextStroke: "1px var(--orange)", color: "transparent" }}>Tested</span>
        </h2>
        <p className={`text-[var(--text-secondary)] mb-14 max-w-lg sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.18s" }}>
          Competing and winning at India&apos;s most prestigious engineering institutions.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <div
              key={a.event}
              className={`g-card p-6 relative overflow-hidden group sec-fade ${v ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.12 + 0.2}s` }}
              data-hover
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" style={{ background: a.glow }} />
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }} />

              <div className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: a.glow, border: `1px solid ${a.border}` }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: a.glow, border: `1px solid ${a.border}`, color: a.color, fontFamily: "var(--font-mono)" }}>{a.badge}</span>
                    <span className="font-bold text-sm" style={{ color: a.color, fontFamily: "var(--font-display)" }}>{a.rank}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{a.event}</h3>
                  <p className="text-[var(--text-muted)] text-xs mb-3" style={{ fontFamily: "var(--font-mono)" }}>{a.organizer}</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trophy banner */}
        <div className={`mt-10 g-card p-7 sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.65s" }}>
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { v: "IIT Madras", l: "RoboRun 2026" },
              { v: "COEP Pune", l: "MindSpark 2025" },
              { v: "Quick Heal", l: "National Award" },
            ].map(item => (
              <div key={item.v}>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>{item.v}</p>
                <p className="text-[var(--text-muted)] text-xs mt-1 tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
