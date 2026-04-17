"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

// 비교 테이블 — before(취소선) vs after(올리브 강조)
// dashed 행 구분선, 스태거 페이드인
export type Row = {
  axis: string;
  before: string;
  after: string;
};

type Props = {
  rows: Row[];
  beforeLabel?: string;
  afterLabel?: string;
  active: boolean;
  className?: string;
};

export default function ComparisonTable({
  rows,
  beforeLabel = "Before",
  afterLabel = "After",
  active,
  className,
}: Props) {
  return (
    <div className={clsx("w-full", className)}>
      {/* 헤더 행 */}
      <div className="mb-3 grid grid-cols-[1fr_1fr_1fr] gap-4 pb-2 border-b border-border">
        <span className="text-[20px] uppercase tracking-label text-fg-dim" />
        <span className="text-[20px] uppercase tracking-label text-fg-dim">
          {beforeLabel}
        </span>
        <span className="text-[20px] uppercase tracking-label text-fg-dim">
          {afterLabel}
        </span>
      </div>

      {/* 데이터 행 */}
      {rows.map((row, idx) => (
        <motion.div
          key={idx}
          className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-3 border-b border-dashed border-border"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
          transition={{
            duration: 0.4,
            delay: active ? idx * 0.08 : 0,
            ease: "easeOut",
          }}
        >
          {/* 축 레이블 */}
          <span className="text-[22px] uppercase tracking-label text-fg-dim self-center">
            {row.axis}
          </span>

          {/* before — 취소선 */}
          <span className="text-[22px] text-fg-dim line-through self-center">
            {row.before}
          </span>

          {/* after — 올리브 강조 */}
          <span className="text-[22px] font-semibold text-accent self-center">
            {row.after}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
