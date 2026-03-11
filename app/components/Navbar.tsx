"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass border-b border-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-800 text-xl text-white flex items-center gap-2 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="text-[var(--cyan)] text-2xl font-bold"
            style={{ textShadow: "0 0 20px rgba(0,245,255,0.5)" }}
          >
            A
          </span>
          <span className="text-text-primary group-hover:text-white transition-colors">
            THARV
          </span>
          <span className="text-[var(--text-muted)] font-light">.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 animated-underline ${
                activeSection === link.href.slice(1)
                  ? "text-[var(--cyan)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Atharv-Joshi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2 px-4"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--cyan)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-border mt-3 px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Atharv-Joshi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 inline-block text-center mt-2"
            >
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
