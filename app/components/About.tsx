"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const stats = [
  { label: "Projects Built", value: 4, suffix: "+" },
  { label: "Competition Rankings", value: 3, suffix: "" },
  { label: "Technologies Mastered", value: 15, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
];

function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function About() {
  const { ref, visible } = useInView(0.15);

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      {/* Background elements */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 pointer-events-none hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, var(--cyan), transparent)", opacity: 0.2 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-[var(--cyan)] text-sm tracking-widest uppercase font-mono" style={{ fontFamily: "var(--font-mono)" }}>
            01 / ABOUT
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.3), transparent)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: bio text */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building the{" "}
              <span
                style={{
                  WebkitTextStroke: "1px var(--cyan)",
                  color: "transparent",
                }}
              >
                Future
              </span>{" "}
              with AI
            </h2>

            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                I&apos;m Atharv — a B.Tech AI/ML student at D.Y. Patil Agriculture and Technical University,
                Kolhapur. I build systems that see, think, and move through the world autonomously.
              </p>
              <p>
                My work spans from{" "}
                <span className="text-[var(--cyan)]">autonomous navigation rovers</span> competing at IIT Madras and
                IIT Bombay, to AI-powered health platforms integrating computer vision and large language models.
              </p>
              <p>
                I&apos;m passionate about the intersection of{" "}
                <span className="text-[var(--purple)] font-medium">robotics</span>,{" "}
                <span className="text-[var(--green)] font-medium">machine learning</span>, and{" "}
                <span className="text-[var(--orange)] font-medium">real-world systems</span> — building things
                that don&apos;t just run in simulation, but actually work.
              </p>
              <p>
                When I&apos;m not training models or debugging ROS2 nodes, I&apos;m competing in national
                hackathons, earning the{" "}
                <span className="text-white font-medium">Cyber Suraksha Warrior of the Year 2025</span>{" "}
                recognition from Quick Heal Foundation.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10">
              <h3
                className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Education
              </h3>
              <div className="space-y-4">
                <div className="gradient-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium text-sm">B.Tech — AI & Machine Learning</p>
                      <p className="text-[var(--text-muted)] text-xs mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                        D.Y. Patil Agriculture & Technical University, Kolhapur
                      </p>
                    </div>
                    <span className="text-[var(--cyan)] text-xs font-mono whitespace-nowrap ml-4">Pursuing</span>
                  </div>
                </div>
                <div className="gradient-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium text-sm">Senior Secondary (Class XII)</p>
                      <p className="text-[var(--text-muted)] text-xs mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Padmashree Dr. V.V. Patil Sainik School, Pravaranagar
                      </p>
                    </div>
                    <span className="text-[var(--text-secondary)] text-xs font-mono">63%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: stats + visual */}
          <div
            className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="gradient-border rounded-xl p-6 text-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="stat-number">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} active={visible} />
                  </div>
                  <p className="text-[var(--text-muted)] text-xs mt-2 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual terminal block */}
            <div className="gradient-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="text-[var(--text-muted)] text-xs ml-2" style={{ fontFamily: "var(--font-mono)" }}>
                  atharv@portfolio:~
                </span>
              </div>
              <div className="p-5 space-y-2" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                <TerminalLine delay={0} visible={visible} prefix="$" color="var(--cyan)">
                  whoami
                </TerminalLine>
                <TerminalLine delay={300} visible={visible} prefix=">" color="var(--text-secondary)">
                  Atharv C. Joshi — AI/ML + Robotics Engineer
                </TerminalLine>
                <TerminalLine delay={600} visible={visible} prefix="$" color="var(--cyan)">
                  cat interests.txt
                </TerminalLine>
                <TerminalLine delay={900} visible={visible} prefix=">" color="var(--text-secondary)">
                  ["autonomous_systems", "computer_vision",
                </TerminalLine>
                <TerminalLine delay={1000} visible={visible} prefix=" " color="var(--text-secondary)">
                  &nbsp;"deep_learning", "ros2", "iot", "hackathons"]
                </TerminalLine>
                <TerminalLine delay={1300} visible={visible} prefix="$" color="var(--cyan)">
                  echo $STATUS
                </TerminalLine>
                <TerminalLine delay={1600} visible={visible} prefix=">" color="var(--green)">
                  READY_TO_BUILD ✓
                </TerminalLine>
              </div>
            </div>

            {/* Soft skills */}
            <div className="mt-6">
              <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {["Team Leadership", "Problem Solving", "Technical Communication", "Time Management", "Analytical Thinking"].map((s) => (
                  <span key={s} className="tech-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalLine({
  children,
  prefix,
  color,
  delay,
  visible,
}: {
  children: React.ReactNode;
  prefix: string;
  color: string;
  delay: number;
  visible: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  if (!show) return null;

  return (
    <div className="flex gap-2 fade-in-up" style={{ color }}>
      <span className="text-[var(--cyan)] select-none">{prefix}</span>
      <span>{children}</span>
    </div>
  );
}
