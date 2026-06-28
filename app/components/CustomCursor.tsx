"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const addHover = () => ring.classList.add("hovered");
    const rmHover = () => ring.classList.remove("hovered");

    const setupHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach(el => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", rmHover);
      });
    };
    setupHover();
    const obs = new MutationObserver(setupHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => { window.removeEventListener("mousemove", onMove); obs.disconnect(); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
