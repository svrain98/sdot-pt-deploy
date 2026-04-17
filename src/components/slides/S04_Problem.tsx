"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 04 — 전장 네트워크의 구조적 한계: 타이틀 + 3카드 + SAMS 인용바(하단)
const PROBLEMS = [
  {
    title: "전술망 대역폭 한계",
    subtitle: "TICN · 전투무선망",
    body: "드론·로봇 고해상도 감시장비 폭증 vs. 제한된 대역폭",
  },
  {
    title: "열악한 전장 환경",
    subtitle: "지형·차폐·기상",
    body: "전송 지연, 화질 저하, 단절 — 안정적 네트워크 유지 불가",
  },
  {
    title: "정보 과부하 (Cognitive Overload)",
    subtitle: "다수 센서 · 동시 전송",
    body: "수십 대 센서 동시 전송 → 실시간 처리 불가. 선별 전달 구조 필수",
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

        {/* 3개 카드 */}
        <div className="mt-10 grid flex-1 grid-cols-3 gap-10">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={
                active && step >= i + 1
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
            >
              <span className="text-[60px] font-extrabold text-accent leading-none">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-[28px] font-bold text-fg leading-tight">
                {p.title}
              </h3>
              <p className="mt-1 text-[22px] text-fg-dim">
                {p.subtitle}
              </p>
              <p className="mt-6 text-[22px] text-fg-muted leading-[1.6]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SAMS 인용 바 — 하단 */}
        <motion.div
          className="mt-8 bg-bg-panel rounded-card border border-accent/30 p-5"
          initial={{ opacity: 0 }}
          animate={active && step >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <span className="shrink-0 border border-accent/50 rounded-card px-3 py-1 text-[20px] font-semibold uppercase tracking-label text-accent">
              2024 SAMS Best Monograph
            </span>
            <p className="text-[20px] text-fg leading-[1.5]">
              &ldquo;전술 제대의 대역폭은 최신 AI 플랫폼 요구량(3.6Tbps)에 턱없이 부족하다.
              해법은 로컬에서 압축·정제 후 핵심만 전달하는 것이다.&rdquo;
            </p>
            <span className="shrink-0 text-[20px] text-fg-dim">
              — Adler, 2025
            </span>
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
