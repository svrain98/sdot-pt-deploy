"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 14 — 전체 파이프라인 복귀 (Foundry → 전체)
// PipelineZoomStage(mode=overview) 가 scale 2.8 → 1.0 으로 복귀.
// 박스 1·2 완료 표시 + "다음은 AIP" 안내.
export default function S14_PipelineReturn2({ meta }: SlideProps) {
  return (
    <SlideFrame meta={meta} transparent>
      {/* 상단 진행 표시 — Edge ✓ / Foundry ✓ / AIP next */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[120px] z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="flex items-center gap-3 rounded-card border border-border bg-black/80 px-5 py-2 backdrop-blur-sm">
          <span className="text-[16px] font-medium uppercase tracking-label text-fg-dim">
            Progress
          </span>
          <Dot state="done" label="Edge" />
          <span className="text-fg-dim">→</span>
          <Dot state="done" label="Foundry" />
          <span className="text-fg-dim">→</span>
          <Dot state="next" label="AIP" />
          <span className="text-fg-dim">→</span>
          <Dot state="pending" label="Decision" />
        </div>
      </motion.div>

      {/* 중앙 하단 transition 문구 */}
      <motion.div
        className="pointer-events-none absolute bottom-[140px] left-1/2 z-20 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <p className="rounded-card border border-border bg-black/80 px-6 py-3 text-[26px] font-medium leading-[1.3] text-fg-muted backdrop-blur-sm">
          온톨로지 위에서 AI 가 판단 —{" "}
          <span className="text-accent">AIP Logic</span>
        </p>
      </motion.div>
    </SlideFrame>
  );
}

function Dot({
  state,
  label,
}: {
  state: "done" | "next" | "pending";
  label: string;
}) {
  const color =
    state === "done"
      ? "bg-accent text-black"
      : state === "next"
      ? "border border-accent text-accent"
      : "border border-border text-fg-dim";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded px-2.5 py-1 text-[14px] font-medium uppercase tracking-label ${color}`}
    >
      {state === "done" ? "✓" : "•"} {label}
    </span>
  );
}
