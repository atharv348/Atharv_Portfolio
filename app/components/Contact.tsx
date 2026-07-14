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

const links = [
  { label: "Email", value: "atharv.c.joshi@gmail.com", href: "mailto:atharv.c.joshi@gmail.com", icon: "✉", color: "var(--cyan)" },
  { label: "GitHub", value: "github.com/atharv348", href: "https://github.com/atharv348", icon: "⌥", color: "var(--purple)" },
  { label: "LinkedIn", value: "linkedin.com/in/atharv-joshi-ai", href: "https://linkedin.com/in/atharv-joshi-ai", icon: "◈", color: "var(--green)" },
  { label: "Portfolio", value: "atharv-portfolio-lime.vercel.app", href: "https://atharv-portfolio-lime.vercel.app", icon: "◎", color: "var(--orange)" },
  { label: "Phone", value: "+91 93025 73730", href: "tel:+919302573730", icon: "☏", color: "var(--cyan)" },
];

export default function Contact() {
  const { ref, v } = useInView(0.1);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("atharv.c.joshi@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(0,245,255,0.035) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-16 sec-fade ${v ? "visible" : ""}`}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>05 / Contact</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,245,255,0.25), transparent)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className={`sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              Let&apos;s Build<br />
              <span style={{ WebkitTextStroke: "1px var(--cyan)", color: "transparent" }}>Something</span><br />
              <span style={{ color: "var(--cyan)" }}>Extraordinary</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md">
              Actively seeking internships, research opportunities, and project collaborations in AI, robotics, full-stack development, and intelligent systems. I build things that actually ship.
            </p>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg mb-10" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] animate-pulse" />
              <span className="text-[var(--green)] text-sm font-medium">Available · Expected May 2027</span>
            </div>

            {/* Resume download CTA */}
            <div className="g-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.15)" }}>
                📄
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Download Full Resume</p>
                <p className="text-[var(--text-muted)] text-xs mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>Atharv_Joshi_Resume.pdf</p>
              </div>
              <a href="/Atharv_Joshi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-xs">
                Download ↗
              </a>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>Languages Spoken</p>
              <div className="flex gap-2">
                {[{ l: "English", n: "Basic" }, { l: "Hindi", n: "Native" }, { l: "Marathi", n: "Native" }].map(lang => (
                  <div key={lang.l} className="pill flex flex-col items-center" style={{ padding: "0.4rem 0.8rem" }}>
                    <span>{lang.l}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>{lang.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`space-y-3 sec-fade ${v ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="g-card flex items-center gap-4 p-5 group no-underline block"
                style={{ transition: "background 0.25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}
                data-hover
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: link.color }}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>{link.label}</p>
                  <p className="text-white text-sm font-medium truncate group-hover:text-[var(--cyan)] transition-colors">{link.value}</p>
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--cyan)] group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}

            <button onClick={copyEmail} className="w-full btn-primary mt-2 text-center" style={{ display: "block", width: "100%", textAlign: "center" }}>
              {copied ? "✓ Copied to Clipboard!" : "Copy Email Address"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
