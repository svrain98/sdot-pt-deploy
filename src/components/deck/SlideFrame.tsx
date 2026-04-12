"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import type { SlideMeta } from "@/types/slide";

// 1920×1080 슬라이드 프레임 — 18theses 스타일: 순수 블랙, 장식 없음
type Props = {
  meta: SlideMeta;
  children: ReactNode;
  showChrome?: boolean;
  background?: ReactNode;
  className?: string;
};

export default function SlideFrame({
  meta,
  children,
  showChrome = true,
  background,
  className,
}: Props) {
  return (
    <div className={clsx("slide-frame", className)}>
      {background && (
        <div className="absolute inset-0 z-0">{background}</div>
      )}

      {/* 상단 바 — 미니멀 */}
      {showChrome && (
        <header className="absolute left-[140px] right-[140px] top-[80px] z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-bold tracking-label text-accent">
              S-DOT
            </span>
            <span className="text-[15px] tracking-label text-fg-dim">
              Semantic Data On Tactical-network
            </span>
          </div>
          <div className="mx-8 h-[1px] flex-1 bg-border" />
          <span className="text-[15px] tracking-label text-fg-dim">
            {String(meta.number).padStart(2, "0")} / 14
          </span>
        </header>
      )}

      {/* 본문 */}
      <main className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
