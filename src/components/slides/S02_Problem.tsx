"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 02 — 문제제기: 전장 네트워크가 AI의 가장 큰 장애
// 3개 카드(대역폭/차폐/전자전) 순차 등장
const PROBLEMS = [
  {
    title: "전술망 대역폭 한계",
    subtitle: "TICN · 전투무선망 · P-999K",
    body: "드론·로봇 고해상도 감시장비 폭증 vs. 최저 9.6 Kbps 데이터 모드",
  },
  {
    title: "열악한 전장 환경",
    subtitle: "지형·차폐·기상",
    body: "전송 지연, 화질 저하, 단절 — 안정적 네트워크 유지 불가",
  },
  {
    title: "전자전 (Electronic Warfare)",
    subtitle: "Jamming · Spoofing",
    body: "재밍 상황에서 원활한 데이터 전송 제한 — AI 활용의 가장 큰 장애",
  },
];

export default function S02_Problem({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <Header />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
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

        {/* 하단 인용 */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={active && step >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="border-l-2 border-accent pl-6">
            <p className="text-[24px] text-fg">
              &ldquo;AI 기술 자체보다 전장 네트워크 환경이 가장 큰 장애요소&rdquo;
            </p>
            <p className="mt-2 text-[px] font-medium uppercase tracking-label text-fg-dim">
              — U.S. Army, Modernizing Military Decision-Making (2025)
            </p>
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}

function Header() {
  return (
    <div>
      <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
        Problem · 제안 배경
      </div>
      <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
        전장 네트워크가{" "}
        <span className="text-accent">AI의 가장 큰 장애</span>
      </h2>
    </div>
  );
}
