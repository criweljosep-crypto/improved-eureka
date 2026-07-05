"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, number: Number(digits), suffix };
}

export default function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = parseValue(value);
    if (!node || !parsed) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        setDisplay(`${parsed!.prefix}0${parsed!.suffix}`);

        const duration = 1200;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = Math.round(eased * parsed!.number);
          setDisplay(`${parsed!.prefix}${current}${parsed!.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="stat-number text-3xl font-bold text-gold">
      {display}
    </p>
  );
}
