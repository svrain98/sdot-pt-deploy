"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 04 — 전장 네트워크의 구조적 한계

const PROBLEMS = [
  {
    title: "대역폭 한계",
    subtitle: "TICN(최대 45Mbps)",
    cause: "드론·로봇 등 고해상도 감시장비 폭증",
    effect: "제한된 대역폭으로 수용 제한",
  },
  {
    title: "전자전 위협",
    subtitle: "적 방향탐지 · 전파 교란",
    cause: "통신 노드가 적의 우선 표적",
    effect: "송수신 데이터 최소화 필요",
  },
  {
    title: "정보 과부하",
    subtitle: "센서 폭증 · 처리 한계",
    cause: "수십 대 센서 동시 전송",
    effect: "실시간 처리 한계, 선별 전달 필요",
  },
];

export default function S04_Problem({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">

        {/* 타이틀 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            CHALLENGE · 한계 및 도전과제
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            전장 네트워크의{" "}
            <span className="text-accent">구조적 한계</span>
          </h2>
        </div>

        {/* SAMS 인용 박스 — 슬라이드 진입 시 자동 등장 */}
        <motion.div
          className="mt-8 bg-bg-panel rounded-card border border-accent/30 p-10"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* 윗줄: 배지 + SAMS 설명 */}
          <div className="flex items-center gap-4 mb-5">
            <span className="border border-accent/50 rounded-card px-4 py-2 text-[24px] font-semibold tracking-label text-accent">
              SAMS 최우수 논문
            </span>
            {/* <span className="text-[22px] text-fg-dim"> */}
            <span className="text-[22px] text-fg-muted">
              미 육군 지휘참모대학 산하 최정예 교육기관
            </span>
          </div>
          {/* 인용문 — 좌측 accent 세로선 */}
          <div className="border-l-4 border-accent pl-6 py-1">
            <p className="text-[34px] text-fg leading-[1.5]">
              &ldquo;전술망 대역폭은 AI가 요구하는 데이터량(3.6Tbps)을 감당할 수 없고,
              전자전 위협으로 통신은 최소화해야 한다.<br />
              해결책 중 하나는 <span className="text-accent font-bold">엣지에서 데이터를 정제한 후 핵심만 전달</span>하는 것이다.&rdquo;
            </p>
          </div>
          {/* 논문 제목 + 출처 */}
          <p className="mt-4 text-[22px] text-fg-dim">
            &ldquo;Modernizing Military Decision-Making&rdquo; — Adler, Military Review (2025)
          </p>
        </motion.div>

        {/* 3개 카드 — 처음엔 흐리게, 버튼마다 순차 활성화 */}
        <div className="mt-8 grid flex-1 grid-cols-3 gap-10">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={active ? {
                opacity: step >= i + 1 ? 1 : 0.15,
                y: 0,
              } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
            >
              <div className="flex items-center gap-5">
                <span className="text-[60px] font-extrabold text-accent leading-none">
                  0{i + 1}
                </span>
                <h3 className="text-[32px] font-bold text-fg leading-tight">
                  {p.title}
                </h3>
              </div>
              <p className="mt-2 text-[24px] text-fg-dim">
                {p.subtitle}
              </p>
              <p className="mt-6 text-[28px] leading-[1.6] text-fg-muted">
                {p.cause}
                <br />
                <span className="font-bold text-accent">→</span> {p.effect}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideFrame>
  );
}
