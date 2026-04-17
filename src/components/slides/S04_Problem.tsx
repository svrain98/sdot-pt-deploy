"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 04 — 전장 네트워크의 구조적 한계: SAMS 인용바 + 3카드
const PROBLEMS = [
  {
    title: "전술망 대역폭 한계",
    subtitle: "TICN · 전투무선망",
    body: "드론·로봇 고해상도 감시장비 폭증 vs. 최저 9.6 Kbps 데이터 모드",
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
      <div className="flex h-full w-full flex-col px-[140px] pt-[100px] pb-[120px]">
        {/* SAMS 인용 바 — 최상단 */}
        <motion.div
          className="mb-10 bg-bg-panel rounded-card border border-accent/30 p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <span className="shrink-0 border border-accent/50 rounded px-2 py-0.5 text-[13px] font-semibold uppercase tracking-label text-accent">
              2024 SAMS Best Monograph
            </span>
            <div>
              <p className="text-[20px] text-fg leading-[1.6]">
                &ldquo;전술 제대의 대역폭은 최신 AI 플랫폼 요구량(3.6Tbps)에 턱없이 부족하다.
                해법 중 하나는 로컬에서 압축·정제 후 핵심만 전달하는 것이다.&rdquo;
              </p>
              <p className="mt-2 text-[16px] font-medium uppercase tracking-label text-fg-dim">
                — Adler, Military Review (2025)
              </p>
            </div>
          </div>
        </motion.div>

        <Header />

        <div className="mt-10 grid flex-1 grid-cols-3 gap-10">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={
                active && step >= i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
            >
              <span className="text-[60px] font-extrabold text-accent leading-none">
                0{i + 1}
              </span>
              <h3 className="mt-8 text-[32px] font-bold text-fg leading-tight">
                {p.title}
              </h3>
              <p className="mt-1 text-[30px] font-medium uppercase tracking-label text-fg-dim">
                {p.subtitle}
              </p>
              <p className="mt-14 text-[28px] text-fg-muted leading-[1.65]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function Header() {
  return (
    <div>
      <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
        CHALLENGE · 전장 네트워크의 구조적 한계
      </div>
      <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
        전장 네트워크의{" "}
        <span className="text-accent">구조적 한계</span>
      </h2>
    </div>
  );
}
