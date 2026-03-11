export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="text-[var(--cyan)] font-bold text-lg"
            style={{ textShadow: "0 0 10px rgba(0,245,255,0.4)", fontFamily: "var(--font-display)" }}
          >
            AJ
          </span>
          <span className="text-[var(--text-muted)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
            © {year} Atharv C. Joshi
          </span>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: "https://github.com/atharv348" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/atharv-joshi-ai/" },
            { label: "Email", href: "mailto:joshiatharv348@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--cyan)] text-xs uppercase tracking-widest transition-colors animated-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="text-[var(--text-muted)] text-xs"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Built with Next.js · TypeScript · Tailwind
        </div>
      </div>
    </footer>
  );
}
