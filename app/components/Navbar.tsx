"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = links.map(l => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" style={{ fontFamily: "var(--font-display)" }} className="flex items-center gap-1.5 group">
          <span className="text-2xl font-bold" style={{ color: "var(--cyan)", textShadow: "0 0 16px rgba(0,245,255,0.5)" }}>A</span>
          <span className="text-white font-bold text-lg">THARV</span>
          <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href} href={l.href}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 ${active === l.href.slice(1) ? "text-[var(--cyan)]" : "text-[var(--text-secondary)] hover:text-white"}`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Atharv_Joshi_Resume.pdf"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 text-xs"
          >
            Resume ↗
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-5 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-[var(--border)] mt-3 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}>
              {l.label}
            </a>
          ))}
          <a href="/Atharv_Joshi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary text-center">Resume ↗</a>
        </div>
      )}
    </nav>
  );
}
