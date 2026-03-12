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

const contactLinks = [
  {
    label: "Email",
    value: "joshiatharv348@gmail.com",
    href: "mailto:joshiatharv348@gmail.com",
    icon: "✉",
    color: "var(--cyan)",
  },
  {
    label: "GitHub",
    value: "@atharv348",
    href: "https://github.com/atharv348",
    icon: "⌥",
    color: "var(--purple)",
  },
  {
    label: "LinkedIn",
    value: "atharv-joshi-ai",
    href: "https://www.linkedin.com/in/atharv-joshi-ai/",
    icon: "◈",
    color: "var(--green)",
  },
  {
    label: "Phone",
    value: "+91 93025 73730",
    href: "tel:+919302573730",
    icon: "☏",
    color: "var(--orange)",
  },
  {
    label: "WhatsApp",
    value: "+91 93025 73730",
    href: "https://wa.me/919302573730",
    icon: "💬",
    color: "var(--green)",
  },
];

export default function Contact() {
  const { ref, visible } = useInView(0.1);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("joshiatharv348@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(0,245,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-[var(--cyan)] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            05 / CONTACT
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.3), transparent)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA text */}
          <div
            className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s{" "}
              <span style={{ WebkitTextStroke: "1px var(--cyan)", color: "transparent" }}>
                Build
              </span>
              <br />
              Something
              <br />
              <span className="text-[var(--cyan)]">Extraordinary</span>
            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md">
              I&apos;m actively seeking internships, research opportunities, and project collaborations
              in AI, robotics, and autonomous systems. Always open to interesting problems.
            </p>

            {/* Status */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg"
              style={{
                background: "rgba(0, 255, 136, 0.05)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] animate-pulse" />
              <span className="text-[var(--green)] text-sm font-medium">
                Available for new opportunities
              </span>
            </div>

            {/* Languages */}
            <div className="mt-10">
              <p
                className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Languages Spoken
              </p>
              <div className="flex gap-3">
                {["English", "Hindi", "Marathi"].map((lang) => (
                  <span key={lang} className="tech-pill">{lang}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: contact cards */}
          <div
            className={`space-y-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group gradient-border rounded-xl p-5 flex items-center gap-5 block no-underline"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = link.color.replace("var(", "").replace(")", "") === "--cyan"
                    ? "rgba(0,245,255,0.04)"
                    : link.color === "var(--purple)" ? "rgba(139,92,246,0.04)"
                    : link.color === "var(--green)" ? "rgba(0,255,136,0.04)"
                    : "rgba(255,107,53,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                }}
                data-cursor="hover"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {link.label}
                  </p>
                  <p className="text-white font-medium group-hover:text-[var(--cyan)] transition-colors">
                    {link.value}
                  </p>
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--cyan)] transition-colors group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            ))}

            {/* Copy email button */}
            <button
              onClick={copyEmail}
              className="w-full btn-primary text-center mt-2"
            >
              {copied ? "✓ Email Copied!" : "Copy Email to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
