"use client";
import { useEffect, useRef } from "react";

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  hue: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
  group: number;
}

export default function Molecules() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;
    let mx = -9999;
    let my = -9999;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // --- Molecule generation ---
    // Many more atoms, all within viewport (fixed canvas)
    const TOTAL_ATOMS = Math.max(90, Math.floor((W * H) / 6000));
    const GROUP_COUNT = Math.ceil(TOTAL_ATOMS / 5);
    const atoms: Atom[] = [];
    const hues = [185, 270, 150, 25]; // cyan, purple, green, orange

    for (let g = 0; g < GROUP_COUNT; g++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      const members = 3 + Math.floor(Math.random() * 4); // 3-6 atoms per molecule
      const hue = hues[g % hues.length];

      for (let m = 0; m < members; m++) {
        const angle = (Math.PI * 2 * m) / members + (Math.random() - 0.5) * 0.8;
        const dist = 25 + Math.random() * 70;
        const baseR = 1.5 + Math.random() * 2.5;
        atoms.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          baseR,
          hue,
          alpha: 0.25 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          group: g,
        });
      }
    }

    const BOND_DIST = 150;
    const CROSS_BOND_DIST = 90;
    const MOUSE_DIST = 220;

    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onMouseLeave = () => { mx = -9999; my = -9999; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const hueToRGBA = (h: number, a: number): string => {
      if (h === 185) return `rgba(0,245,255,${a})`;
      if (h === 270) return `rgba(139,92,246,${a})`;
      if (h === 150) return `rgba(0,255,136,${a})`;
      if (h === 25) return `rgba(255,107,53,${a})`;
      return `rgba(0,245,255,${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];

        // Physics update
        a.pulse += a.pulseSpeed;
        a.x += a.vx;
        a.y += a.vy;

        // Wrap around viewport edges
        if (a.x < -30) a.x = W + 30;
        if (a.x > W + 30) a.x = -30;
        if (a.y < -30) a.y = H + 30;
        if (a.y > H + 30) a.y = -30;

        // Mouse repulsion
        const mdx = a.x - mx;
        const mdy = a.y - my;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < MOUSE_DIST && mDist > 0) {
          const force = (1 - mDist / MOUSE_DIST) * 0.02;
          a.vx += (mdx / mDist) * force;
          a.vy += (mdy / mDist) * force;
        }

        // Gentle group cohesion — atoms drift toward group center
        let gcx = 0, gcy = 0, gc = 0;
        for (let j = 0; j < atoms.length; j++) {
          if (atoms[j].group === a.group) { gcx += atoms[j].x; gcy += atoms[j].y; gc++; }
        }
        if (gc > 1) {
          gcx /= gc; gcy /= gc;
          a.vx += (gcx - a.x) * 0.00008;
          a.vy += (gcy - a.y) * 0.00008;
        }

        // Friction
        a.vx *= 0.997;
        a.vy *= 0.997;

        // Speed limit
        const speed = Math.hypot(a.vx, a.vy);
        if (speed > 0.5) { a.vx = (a.vx / speed) * 0.5; a.vy = (a.vy / speed) * 0.5; }

        const pulseR = a.baseR + Math.sin(a.pulse) * 0.8;
        const pulseA = a.alpha + Math.sin(a.pulse * 1.3) * 0.1;

        // Outer glow
        const glowR = pulseR * 5;
        const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glowR);
        glow.addColorStop(0, hueToRGBA(a.hue, pulseA * 0.4));
        glow.addColorStop(0.5, hueToRGBA(a.hue, pulseA * 0.1));
        glow.addColorStop(1, hueToRGBA(a.hue, 0));
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core atom (bright center)
        ctx.beginPath();
        ctx.arc(a.x, a.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = hueToRGBA(a.hue, pulseA * 1.2);
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, pulseR * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = hueToRGBA(a.hue, Math.min(pulseA * 2, 1));
        ctx.fill();

        // --- Bonds ---
        for (let j = i + 1; j < atoms.length; j++) {
          const b = atoms[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const sameGroup = a.group === b.group;
          const maxDist = sameGroup ? BOND_DIST : CROSS_BOND_DIST;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist);
            const bondAlpha = sameGroup ? opacity * 0.18 : opacity * 0.05;

            // Bond line
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = hueToRGBA(a.hue, bondAlpha);
            ctx.lineWidth = sameGroup ? 1 : 0.4;
            ctx.stroke();

            // Molecular midpoint node (double-bond look)
            if (sameGroup && dist < 100) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const midR = 0.8 + opacity * 0.6;
              ctx.beginPath();
              ctx.arc(midX, midY, midR, 0, Math.PI * 2);
              ctx.fillStyle = hueToRGBA(a.hue, bondAlpha * 1.5);
              ctx.fill();
            }
          }
        }

        // Mouse connection lines
        if (mDist < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = hueToRGBA(a.hue, (1 - mDist / MOUSE_DIST) * 0.18);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="molecules-canvas"
      aria-hidden="true"
    />
  );
}
