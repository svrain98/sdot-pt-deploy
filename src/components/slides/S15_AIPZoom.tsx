"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 15 — AIP + 결심 확대: 오른쪽 두 박스(AIP Logic + AI 결심 지원) 동시 줌
// PipelineZoomStage(mode=aip) 가 오른쪽 절반을 scale~1.85 로 확대 + aip 상세 이미지 fade-in.
// 왼쪽 두 박스(Edge·Foundry)와 다르게 "한 컷에 두 박스" 를 보여주는 게 포인트.
export default function S15_AIPZoom({ meta }: SlideProps) {
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
          Stage 3·4 · AIP Logic + Commander Decision
        </div>
        <h2 className="mt-3 rounded-card border border-border bg-black/80 px-5 py-3 text-[48px] font-black leading-[1.1] tracking-heading text-fg backdrop-blur-sm">
          5단계 AI 분석 →{" "}
          <span className="text-accent">지휘관 결심 지원</span>
        </h2>
      </motion.div>

      {/* 하단 5단계 요약 */}
      <motion.div
        className="pointer-events-none absolute bottom-[100px] left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.45 }}
      >
        <div className="flex items-stretch divide-x divide-border rounded-card border border-border bg-black/85 backdrop-blur-sm">
          <StageCell n="1" label="데이터 융합" note="102 건 COP" />
          <StageCell n="2·3" label="LLM 위협 평가" note="동일 경로 인식" />
          <StageCell n="4·5" label="취약점·타격 추천" note="Pk 85% / 95%" />
          <StageCell n="→" label="지휘관 결심" note="APPROVE → CFF" highlight />
        </div>
      </motion.div>
    </SlideFrame>
  );
}

function StageCell({
  n,
  label,
  note,
  highlight = false,
}: {
  n: string;
  label: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex min-w-[230px] flex-col items-center justify-center px-6 py-4 text-center">
      <div
        className={
          highlight
            ? "font-mono text-[18px] font-bold uppercase tracking-label text-accent"
            : "font-mono text-[18px] font-medium uppercase tracking-label text-fg-dim"
        }
      >
        Stage {n}
      </div>
      <div
        className={
          highlight
            ? "mt-1 text-[26px] font-black text-accent"
            : "mt-1 text-[26px] font-black text-fg"
        }
      >
        {label}
      </div>
      <div className="mt-1 text-[18px] text-fg-muted">{note}</div>
    </div>
  );
}
