"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 07 — S-DOT 3레이어 개념도: Edge · Network · C2
// 카드 순차 자동 등장 → 하단 파이프라인 자동 등장
const LAYERS = [
  {
    code: "L1",
    name: "Edge Layer",
    summary: "드론 영상 → AI 탐지 → 시맨틱 변환",
    duties: [
      "YOLO 기반 객체·행위 탐지",
      "NPU 온디바이스 추론 (Jetson Orin Nano)",
      "시맨틱 변환 (온톨로지 매핑)",
    ],
  },
  {
    code: "L2",
    name: "Network Layer",
    summary: "압축 · 서명 · 전술망 전송",
    duties: [
      "시맨틱 데이터 → 바이너리 압축",
      "무결성 서명 적용",
      "헤더 오버헤드 최소화",
    ],
  },
  {
    code: "L3",
    name: "C2 Layer",
    summary: "상황도 자동 도시 · AI 결심 지원",
    duties: [
      "시맨틱 디코딩 · 자동 전술 부호 도시",
      "위협 평가 · 타격 자산 추천",
      "지휘관 결심 지원",
    ],
  },
];

export default function S07_Concept({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            System Concept · 3-Layer Architecture
          </div>
          <h2 className="mt-4 text-[56px] font-black tracking-heading text-fg leading-[1.1]">
            S-DOT 시스템 개념도
          </h2>
        </div>

        {/* 3개 카드 — L1 먼저, 버튼으로 L2·L3 순차 활성화 */}
        <div className="mt-12 flex flex-1 items-center gap-6">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.code}
              initial={{ opacity: 0, y: 40 }}
              animate={active ? {
                opacity: step >= i ? 1 : 0.15,
                y: 0,
              } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="flex-1"
            >
              <div className="bg-bg-panel rounded-card border border-accent p-8 flex h-[460px] flex-col">
                {/* 코드 + 이름 한 줄 */}
                <div className="flex items-baseline gap-4">
                  <span className="text-[60px] font-extrabold leading-none text-accent shrink-0">
                    {l.code}
                  </span>
                  <h3 className="text-[30px] font-bold text-fg leading-tight">
                    {l.name}
                  </h3>
                </div>
                {/* 한 줄 요약 */}
                <p className="mt-3 text-[22px] font-medium text-accent">
                  {l.summary}
                </p>
                {/* 구분선 */}
                <div className="mt-4 border-t-2 border-border" />
                {/* 세부 항목 */}
                <ul className="mt-6 space-y-3 flex-1">
                  {l.duties.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[24px] text-fg-muted"
                    >
                      <span className="mt-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 파이프라인 — L3 활성화 후 1초 지연 등장 */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-6 text-[38px] font-black tracking-heading text-fg"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: step >= 3 ? 1 : 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>영상 (MB)</span>
          <span className="text-[28px] text-accent">→</span>
          <span>시맨틱 데이터 (Byte)</span>
          <span className="text-[28px] text-accent">→</span>
          <span className="text-accent">결심 (초)</span>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
