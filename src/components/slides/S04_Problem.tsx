"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 04 — 전장 네트워크의 구조적 한계
// step 1: SAMS 인용 박스 등장 (상단)
// step 2: 01~03 카드 한꺼번에 등장 (하단)
const PROBLEMS = [
  {
    title: "전술통신망 대역폭 한계",
    subtitle: "TICN · 전투무선망",
    body: "드론·로봇 등 고해상도 감시장비 폭증\nvs. 제한된 대역폭",
  },
  {
    title: "불안정한 전장 네트워크",
    subtitle: "지형 · 차폐 · 기상 · 전자전",
    body: "전송 지연, 화질 저하, 통신 두절\n— 안정적 네트워크 유지 제한",
  },
  {
    title: "정보 과부하",
    subtitle: "다수 센서 · 동시 전송",
    body: "수십 대 센서 동시 전송\n— 실시간 처리 불가, 선별 전달 구조 필수",
  },
];

export default function S04_Problem({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">

        {/* 타이틀 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            CHALLENGE · 전장 네트워크의 구조적 한계
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            전장 네트워크의{" "}
            <span className="text-accent">구조적 한계</span>
          </h2>
        </div>

        {/* SAMS 인용 박스 — 슬라이드 진입 시 자동 등장 */}
        <motion.div
          className="mt-8 bg-bg-panel rounded-card border border-accent/30 p-7"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* 윗줄: 배지 + SAMS 설명 */}
          <div className="flex items-center gap-4 mb-4">
            <span className="border border-accent/50 rounded-card px-4 py-2 text-[22px] font-semibold tracking-label text-accent">
              SAMS 최우수 논문(Best Monograph)
            </span>
            <span className="text-[20px] text-fg-dim">
              미 육군 지휘참모대학 산하의 최정예 교육기관
            </span>
          </div>
          {/* 인용문 */}
          <p className="text-[24px] text-fg leading-[1.6]">
            &ldquo;전술 제대의 대역폭은 최신 AI 플랫폼 요구량(3.6Tbps)에 턱없이 부족하다.
            해법 중 하나는 <span className="text-accent font-bold">로컬에서 데이터를 압축·정제한 후 핵심만 전달</span>하는 것이다.&rdquo;
          </p>
          {/* 논문 제목 + 출처 */}
          <p className="mt-3 text-[20px] text-fg-dim">
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
              <span className="text-[60px] font-extrabold text-accent leading-none">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-[32px] font-bold text-fg leading-tight">
                {p.title}
              </h3>
              <p className="mt-1 text-[28px] text-fg-dim">
                {p.subtitle}
              </p>
              <p className="mt-6 text-[28px] text-fg-muted leading-[1.6] whitespace-pre-line">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideFrame>
  );
}
