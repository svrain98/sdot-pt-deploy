"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 10 — S-DOT 전체 파이프라인 overview
// Deck 레벨의 PipelineZoomStage 가 4박스 스틸을 scale=1 로 깔아주고,
// 슬라이드 컴포넌트는 상/하단 캡션만 담당. transparent 프레임 사용.
export default function S10_PipelineOverview({ meta }: SlideProps) {
  return (
    <SlideFrame meta={meta} transparent>
      {/* 좌상단 타이틀 카드 — 파이프라인 이미지 위에 떠 있음 */}
      <motion.div
        className="pointer-events-none absolute left-[120px] top-[140px] z-20"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="inline-block rounded-card border border-accent/60 bg-black/70 px-4 py-1.5 text-[20px] font-medium uppercase tracking-label text-accent backdrop-blur-sm">
          S-DOT Pipeline · Overview
        </div>
        <h2 className="mt-3 max-w-[780px] rounded-card border border-border bg-black/70 px-6 py-4 text-[44px] font-black leading-[1.1] tracking-heading text-fg backdrop-blur-sm">
          영상이 아닌 <span className="text-accent">온톨로지 데이터</span>를 보낸다
        </h2>
      </motion.div>

      {/* 우하단 설명 카드 — 4단계 요약 */}
      <motion.div
        className="pointer-events-none absolute bottom-[120px] right-[120px] z-20 max-w-[620px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <div className="rounded-card border border-border bg-black/75 p-6 text-right backdrop-blur-sm">
          <div className="mb-2 text-[18px] font-medium uppercase tracking-label text-accent">
            4 Stages
          </div>
          <p className="text-[22px] leading-[1.45] text-fg-muted">
            <span className="text-fg">ISR 드론</span> →{" "}
            <span className="text-fg">Foundry 온톨로지</span> →{" "}
            <span className="text-fg">AIP Logic</span> →{" "}
            <span className="text-accent">지휘관 결심 지원</span>
          </p>
          <p className="mt-2 text-[18px] text-fg-dim">
            각 단계를 하나씩 들어가 봅니다.
          </p>
        </div>
      </motion.div>
    </SlideFrame>
  );
}
