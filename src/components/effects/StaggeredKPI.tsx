"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import CountUp from "./CountUp";

// 4개 KPI 카드가 스태거 등장 + 숫자 카운트업 (슬라이드 08)
type KPIItem = {
  label: string;
  value: string | number; // 문자열이면 그대로, 숫자면 카운트업
  unit: string;
  color: "cyan" | "green" | "amber" | "red";
};

type Props = {
  items: readonly KPIItem[];
  active: boolean;
};

const COLOR_MAP: Record<KPIItem["color"], string> = {
  cyan: "text-accent border-accent/40",
  green: "text-accent border-accent/40",
  amber: "text-accent-light border-accent-light/40",
  red: "text-fg-muted border-border",
};

export default function StaggeredKPI({ items, active }: Props) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: active ? i * 0.2 : 0,
            ease: "easeOut",
          }}
          className={clsx(
            "rounded border-2 bg-black/60 p-6 backdrop-blur-sm",
            COLOR_MAP[item.color]
          )}
        >
          <div className="mb-2 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted">
            {item.label}
          </div>
          <div
            className={clsx(
              "font-mono text-[52px] font-black leading-none",
              COLOR_MAP[item.color].split(" ")[0]
            )}
          >
            {typeof item.value === "number" ? (
              <CountUp
                to={item.value}
                active={active}
                duration={1800}
              />
            ) : (
              <DelayedReveal active={active} delay={i * 0.2 + 0.3}>
                {item.value}
              </DelayedReveal>
            )}
          </div>
          <div className="mt-2 text-[16px] text-fg-muted">{item.unit}</div>
        </motion.div>
      ))}
    </div>
  );
}

function DelayedReveal({
  active,
  delay,
  children,
}: {
  active: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: active ? delay : 0 }}
    >
      {children}
    </motion.span>
  );
}
