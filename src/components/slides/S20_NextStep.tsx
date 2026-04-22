"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 20 — Next Step · 왜 '전체'여야 하는가
// 스크립트 슬라이드 11 기반: 온톨로지 변환 · 빅데이터 플랫폼 · LLM 세 가지가 하나로 연결될 때
// 기존 ISR→C2 가 '온톨로지 기반 지휘결심 루프' 로 바뀐다. S-DOT 는 그 연결을 제공한다.
const PILLARS = [
  {
    n: "01",
    key: "온톨로지 변환",
    head: "영상·음성 → RDF Triple",
    body: "Edge VLM 이 드론 영상을 기계가 읽을 수 있는 온톨로지 데이터로 바꾼다. (61MB → 88B)",
  },
  {
    n: "02",
    key: "온톨로지 빅데이터",
    head: "조각 데이터 → Traceability 그래프",
    body: "16 Object Type 으로 연결된 Foundry 플랫폼이 전장의 모든 데이터를 추적 가능하게 이어준다.",
  },
  {
    n: "03",
    key: "LLM 결심 지원",
    head: "맥락 → 권고 · 결심",
    body: "AIP 5단계가 위협 평가 · Pk 산출 · Fire Mission 생성을 자동화한다.",
  },
];

export default function S20_NextStep({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col items-center justify-center px-[140px] pt-[160px] pb-[140px]">
        {/* 상단 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="w-full"
        >
          <div className="inline-block rounded-card border border-accent/60 bg-black/60 px-3 py-1.5 text-[18px] font-medium uppercase tracking-label text-accent">
            Next Step · Why the whole stack?
          </div>
          <h2 className="mt-4 text-[60px] font-black leading-[1.1] tracking-heading text-fg">
            세 가지가 <span className="text-accent">하나</span>로 연결될 때
          </h2>
          <p className="mt-3 max-w-[1100px] text-[22px] leading-[1.6] text-fg-muted">
            온톨로지 변환 · 빅데이터 플랫폼 · LLM — 이 셋 중 하나만 있어도 완성되지 않는다.
            S-DOT 는 <span className="font-bold text-fg">셋을 하나의 플랫폼</span>으로
            묶어, 기존 ISR → C2 경로를{" "}
            <span className="font-bold text-accent">온톨로지 기반 결심 루프</span>로
            바꾼다.
          </p>
        </motion.div>

        {/* 3-column 필러 */}
        <div className="mt-12 grid w-full grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              animate={active && step >= 0 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.15 }}
              className="flex flex-col rounded-card border border-border bg-bg-panel/80 px-7 py-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[20px] font-black text-accent">
                  {p.n}
                </span>
                <span className="text-[20px] font-medium uppercase tracking-label text-fg-dim">
                  {p.key}
                </span>
              </div>
              <div className="mt-3 text-[28px] font-black leading-[1.2] text-fg">
                {p.head}
              </div>
              <div className="mt-4 text-[19px] leading-[1.55] text-fg-muted">
                {p.body}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 결론 배너 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-auto self-center rounded-card border border-accent bg-accent/10 px-8 py-4"
        >
          <div className="text-center text-[26px] font-black leading-[1.3] tracking-heading text-fg">
            S-DOT ={" "}
            <span className="text-accent">
              Ontology · Big Data · LLM
            </span>{" "}
            — 하나의 온톨로지 빅데이터 플랫폼
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
