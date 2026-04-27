"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 11 — Edge 확대: 드론 영상 → 시맨틱 변환
// PipelineZoomStage(mode=edge) 가 4박스 overview 를 scale=2.8 로 줌인 +
// drone_semantic.mp4 영상 overlay 를 fade-in.
// 슬라이드는 좌상단 chip 타이틀과 하단 핵심 수치 카드만 표출.
export default function S11_EdgeZoom({ meta }: SlideProps) {
  return (
    <SlideFrame meta={meta} transparent>
      {/* 좌상단 chip — 이미지가 떠오른 뒤에 나타나도록 delay */}
      <motion.div
        className="pointer-events-none absolute left-[120px] top-[140px] z-20"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="inline-block rounded-card border border-accent/60 bg-black/80 px-4 py-1.5 text-[22px] font-medium uppercase tracking-label text-accent backdrop-blur-sm">
          Stage 1 · Edge · VLM Ontology Conversion
        </div>
        <h2 className="mt-3 rounded-card border border-border bg-black/80 px-5 py-3 text-[48px] font-black leading-[1.1] tracking-heading text-fg backdrop-blur-sm">
          드론 영상 →{" "}
          <span className="text-accent">온톨로지 데이터</span>
        </h2>
      </motion.div>

      {/* 하단 핵심 수치 — "61MB → 88B, 99.9999% 압축, 0.012초 전송" */}
      <motion.div
        className="pointer-events-none absolute bottom-[100px] left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.45 }}
      >
        <div className="flex items-stretch divide-x divide-border rounded-card border border-border bg-black/85 backdrop-blur-sm">
          <StatCell label="원본" value="61 MB" tone="muted" />
          <StatCell label="온톨로지" value="88 B" tone="accent" />
          <StatCell label="압축률" value="99.9999%" tone="accent" />
          <StatCell label="전송 지연" value="0.012 s" tone="accent" />
          <StatCell label="VLM" value="Gemini 2.5 Flash" tone="muted" />
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
    <div className="flex min-w-[180px] flex-col items-center justify-center px-6 py-4">
      <div className="text-[18px] font-medium uppercase tracking-label text-fg-dim">
        {label}
      </div>
      <div
        className={
          tone === "accent"
            ? "mt-1 font-mono text-[32px] font-black text-accent"
            : "mt-1 font-mono text-[32px] font-black text-fg"
        }
      >
        {value}
      </div>
    </div>
  );
}
