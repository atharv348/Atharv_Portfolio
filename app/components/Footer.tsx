"use client";

export default function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: "var(--cyan)", textShadow: "0 0 10px rgba(0,245,255,0.4)", fontFamily: "var(--font-display)" }}>AJ</span>
          <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>© 2025 Atharv C. Joshi</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { l: "GitHub", h: "https://github.com/atharv348" },
            { l: "LinkedIn", h: "https://linkedin.com/in/atharv-joshi-ai" },
            { l: "Resume", h: "/Atharv_Joshi_Resume.pdf" },
            { l: "Email", h: "mailto:joshiatharv348@gmail.com" },
          ].map(link => (
            <a key={link.l} href={link.h} target={link.l !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >{link.l}</a>
          ))}
        </div>
        <div className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Next.js 15 · TypeScript · Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
