"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 13 — Foundry 확대: 16 Object Type 온톨로지 그래프
// PipelineZoomStage(mode=foundry) 가 박스 2 로 줌인 + foundry 상세 이미지 fade-in.
export default function S13_FoundryZoom({ meta }: SlideProps) {
  return (
    <SlideFrame meta={meta} transparent>
      {/* 좌상단 chip */}
      <motion.div
        className="pointer-events-none absolute left-[120px] top-[140px] z-20"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="inline-block rounded-card border border-accent/60 bg-black/80 px-4 py-1.5 text-[22px] font-medium uppercase tracking-label text-accent backdrop-blur-sm">
          Stage 2 · Palantir Foundry · Ontology
        </div>
        <h2 className="mt-3 rounded-card border border-border bg-black/80 px-5 py-3 text-[44px] font-black leading-[1.1] tracking-heading text-fg backdrop-blur-sm">
          16 Object Types — 수많은 전장 데이터를 잇는{" "}
          <span className="text-accent">Traceability 그래프</span>
        </h2>
      </motion.div>

      {/* 하단 요약 스트립 */}
      <motion.div
        className="pointer-events-none absolute bottom-[100px] left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.45 }}
      >
        <div className="flex items-stretch divide-x divide-border rounded-card border border-border bg-black/85 backdrop-blur-sm">
          <StatCell label="Object Types" value="16" tone="accent" />
          <StatCell label="Pipelines" value="export → clean" tone="muted" />
          <StatCell label="Endpoint" value="s-dot-tactical-display" tone="muted" />
          <StatCell label="강점" value="Traceability" tone="accent" />
        </div>
      </motion.div>
    </SlideFrame>
  );
}

function StatCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "accent" | "muted";
}) {
  return (
    <div className="flex min-w-[210px] flex-col items-center justify-center px-6 py-4">
      <div className="text-[18px] font-medium uppercase tracking-label text-fg-dim">
        {label}
      </div>
      <div
        className={
          tone === "accent"
            ? "mt-1 font-mono text-[28px] font-black text-accent"
            : "mt-1 font-mono text-[28px] font-black text-fg"
        }
      >
        {value}
      </div>
    </div>
  );
}
