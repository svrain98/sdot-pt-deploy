"use client";

import { useEffect, useRef, useState } from "react";

// Framer Motion 에 직접 의존하지 않는 가벼운 카운트업 (CompressionBar, KPI 카드용)
type Props = {
  from?: number;
  to: number;
  active: boolean;
  duration?: number; // ms
  format?: (v: number) => string;
  className?: string;
};

export default function CountUp({
  from = 0,
  to,
  active,
  duration = 1600,
  format = (v) => Math.round(v).toLocaleString("ko-KR"),
  className,
}: Props) {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setValue(from);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, from, to, duration]);

  return <span className={className}>{format(value)}</span>;
}
