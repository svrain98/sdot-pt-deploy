"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import CountUp from "@/components/effects/CountUp";

// 단일 KPI 카드 — 대형 숫자 + 라벨 + CountUp 애니메이션
type Props = {
  label: string;
  value: number;
  unit: string;
  active: boolean;
  className?: string;
  format?: (v: number) => string;
};

export default function KPICard({
  label,
  value,
  unit,
  active,
  className,
  format,
}: Props) {
  return (
    <motion.div
      className={clsx(
        "bg-bg-panel rounded-card border border-border p-8",
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 라벨 */}
      <div className="mb-4 text-[20px] uppercase tracking-label text-fg-dim">
        {label}
      </div>

      {/* 수치 + 단위 */}
      <div className="flex items-baseline gap-2 leading-none">
        <span className="text-[64px] font-extrabold text-fg">
          <CountUp
            to={value}
            active={active}
            duration={1600}
            format={format ?? ((v) => Math.round(v).toLocaleString("ko-KR"))}
          />
        </span>
        <span className="text-[20px] text-fg-muted">{unit}</span>
      </div>
    </motion.div>
  );
}
