"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 05 — 전술 AI가 나아가는 방향: 2개 학술 인용 카드 + 결론 바
export default function S05_TacticalAI({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            DIRECTION · 전술 AI의 방향
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            전술 AI가 나아가는 방향
          </h2>
        </div>

        {/* 2열 인용 카드 */}
        <div className="mt-10 grid flex-1 grid-cols-2 gap-8">
          {/* 좌측 카드 — 미 육군 전쟁대학 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active && step >= 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
          >
            <span className="inline-block border border-accent/50 rounded-card px-3 py-1 text-[20px] text-accent">
              Parameters · 2025
            </span>
            <p className="mt-3 text-[20px] text-fg-dim">미 육군 전쟁대학 학술지</p>
            <div className="mt-6 border-l-2 border-accent pl-6">
              <p className="text-[20px] text-fg leading-[1.6]">
                &ldquo;AI가 현장 데이터를 압축해 결심에 필요한 것만 전달하는 것이 현대 지휘의 핵심&rdquo;
              </p>
            </div>
            <p className="mt-4 text-[20px] font-semibold text-accent">
              DDIL 환경에서는 이 접근 없이는 결심 불가
            </p>
            <p className="mt-6 text-[20px] text-fg-dim">
              Matei &amp; Reed, &ldquo;Mission Command&rsquo;s Asymmetric Advantage Through AI-Driven Data Management&rdquo;, 2025
            </p>
          </motion.div>

          {/* 우측 카드 — IEEE MILCOM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active && step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
          >
            <span className="inline-block border border-accent/50 rounded-card px-3 py-1 text-[20px] text-accent">
              IEEE MILCOM · 2024
            </span>
            <p className="mt-3 text-[20px] text-fg-dim">
              미 육군 연구소 ARL · 세계 최대 군 통신 학술대회
            </p>
            <div className="mt-6 border-l-2 border-accent pl-6">
              <p className="text-[20px] text-fg leading-[1.6]">
                전술 엣지 시맨틱 필터링 플랫폼
              </p>
            </div>
            <p className="mt-4 text-[20px] text-fg-muted leading-[1.6]">
              전송 전 중복 데이터 자동 제거 → 핵심만 선별 전달 → 제한된 대역폭에서도 전술 정보 전달 가능
            </p>
            <p className="mt-6 text-[20px] text-fg-dim">
              Colombi et al., &ldquo;Efficient Data Dissemination via Semantic Filtering at the Tactical Edge&rdquo;, 2024
            </p>
          </motion.div>
        </div>

        {/* 하단 결론 바 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active && step >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 border-t border-border pt-6 text-center"
        >
          <p className="text-[20px] text-fg-muted">
            미 육군 전쟁대학과 미 육군 연구소가 같은 방향을 가리키고 있음
          </p>
          <p className="mt-2 text-[20px] font-semibold text-accent">
            → S-DOT는 그 방향의 구현
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
