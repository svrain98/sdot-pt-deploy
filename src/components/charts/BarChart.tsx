"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

// 수평 막대 차트 — 18theses.com 팔란티어 스타일
// tone: accent(올리브), muted(워밍 그레이), dim(다크 그레이)
export type BarItem = {
  label: string;
  value: number;
  maxValue?: number;
  tone?: "accent" | "muted" | "dim";
};

type Props = {
  items: BarItem[];
  active: boolean;
  unit?: string;
  className?: string;
};

const TONE_BAR: Record<string, string> = {
  accent: "bg-accent",
  muted: "bg-fg-muted",
  dim: "bg-fg-dim",
};

const TONE_VALUE: Record<string, string> = {
  accent: "text-accent",
  muted: "text-fg-muted",
  dim: "text-fg-dim",
};

export default function BarChart({ items, active, unit, className }: Props) {
  // 자동 maxValue: 지정이 없으면 모든 항목 중 최대값 사용
  const globalMax = Math.max(...items.map((i) => i.value));

  return (
    <div className={clsx("w-full", className)}>
      {items.map((item, idx) => {
        const tone = item.tone ?? "accent";
        const max = item.maxValue ?? globalMax;
        const pct = max > 0 ? (item.value / max) * 100 : 0;

        return (
          <div
            key={idx}
            style={{ marginBottom: idx < items.length - 1 ? 24 : 0 }}
          >
            {/* 라벨 행 */}
            <div className="mb-[6px] flex items-baseline justify-between">
              <span className="text-[20px] tracking-label text-fg-muted uppercase">
                {item.label}
              </span>
              <span
                className={clsx(
                  "text-[20px] font-semibold",
                  TONE_VALUE[tone]
                )}
              >
                {item.value.toLocaleString("ko-KR")}
                {unit && (
                  <span className="ml-1 text-[20px] text-fg-dim">{unit}</span>
                )}
              </span>
            </div>

            {/* 막대 트랙 */}
            <div className="relative h-[8px] w-full overflow-hidden rounded-full bg-bg-panel">
              <motion.div
                className={clsx("absolute inset-y-0 left-0 rounded-full", TONE_BAR[tone])}
                initial={{ width: "0%" }}
                animate={{ width: active ? `${pct}%` : "0%" }}
                transition={{
                  duration: 0.8,
                  delay: active ? idx * 0.1 : 0,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
