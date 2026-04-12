"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

// 좌(흑백)/우(컬러) split screen (슬라이드 10)
type Props = {
  left: ReactNode;
  right: ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  leftGrayscale?: boolean;
  rightActive?: boolean; // 우측 컬러 활성화 여부
  className?: string;
};

export default function SplitCompare({
  left,
  right,
  leftLabel,
  rightLabel,
  leftGrayscale = true,
  rightActive = true,
  className,
}: Props) {
  return (
    <div className={clsx("relative flex h-full w-full", className)}>
      {/* 좌측 */}
      <div
        className="relative flex-1 overflow-hidden border-r border-white/10"
        style={
          leftGrayscale
            ? { filter: "grayscale(100%) brightness(0.65)" }
            : undefined
        }
      >
        {leftLabel && (
          <div className="absolute left-6 top-6 z-20 rounded border border-border bg-black/80 px-3 py-1 font-mono text-[14px] font-black uppercase tracking-[0.2em] text-fg-muted">
            {leftLabel}
          </div>
        )}
        <div className="relative h-full w-full">{left}</div>
      </div>

      {/* 우측 */}
      <div
        className={clsx(
          "relative flex-1 overflow-hidden transition-all duration-1000",
          !rightActive && "opacity-40"
        )}
        style={
          rightActive
            ? undefined
            : { filter: "grayscale(70%) brightness(0.7)" }
        }
      >
        {rightLabel && (
          <div className="absolute left-6 top-6 z-20 rounded border border-accent bg-black/80 px-3 py-1 font-mono text-[14px] font-black uppercase tracking-[0.2em] text-accent">
            {rightLabel}
          </div>
        )}
        <div className="relative h-full w-full">{right}</div>
      </div>

      {/* 중앙 분할선 강조 */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-[1px] -translate-x-1/2 bg-accent/40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-black font-mono text-[14px] font-black text-accent">
        VS
      </div>
    </div>
  );
}
