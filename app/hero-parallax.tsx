"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    function applyOffset() {
      ticking = false;
      const offset = Math.min(window.scrollY * 0.18, 90);
      if (node) node.style.transform = `translate3d(0, ${offset}px, 0)`;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyOffset);
    }

    applyOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="floating-hero-bg" aria-hidden="true">
      {children}
    </div>
  );
}
