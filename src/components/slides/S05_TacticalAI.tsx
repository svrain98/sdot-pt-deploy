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
          {/* 좌측 카드 — Parameters, 먼저 등장 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
          >
            <span className="inline-block border border-accent/50 rounded-card px-3 py-1 text-[22px] font-semibold text-accent">
              Parameters · 2025
            </span>
            <p className="mt-3 text-[22px] text-fg-dim">미 육군 전쟁대학 AWC | 전략·교리 공식 학술지</p>
            <div className="mt-6 border-l-2 border-accent pl-6 flex-1">
              <p className="text-[30px] text-fg leading-[1.6]">
                AI가 현장 데이터를 압축해<br />
                결심에 필요한 것만 지휘관에게 전달하는 것이<br />
                현대 지휘의 핵심
              </p>
            </div>
            <p className="mt-6 text-[24px] font-bold text-accent">
              통신 두절 및 제한(DDIL) 환경에서는 이 방식 없이는 결심 자체가 불가능
            </p>
            <p className="mt-6 text-[18px] text-fg-dim leading-[1.5]">
              Matei &amp; Reed, &ldquo;Mission Command&rsquo;s Asymmetric Advantage Through AI-Driven Data Management&rdquo;, 2025
            </p>
          </motion.div>

          {/* 우측 카드 — 처음엔 흐리게, step 1에 선명 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? {
              opacity: step >= 1 ? 1 : 0.15,
              y: 0,
            } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-bg-panel rounded-card border border-border p-8 flex flex-col"
          >
            <span className="inline-block border border-accent/50 rounded-card px-3 py-1 text-[22px] font-semibold text-accent">
              IEEE MILCOM · 2024
            </span>
            <p className="mt-3 text-[22px] text-fg-dim">
              미 육군 연구소 ARL | 세계 최대 군 통신 학술대회
            </p>
            <div className="mt-6 border-l-2 border-accent pl-6 flex-1">
              <p className="text-[30px] text-fg leading-[1.6]">
                전술 엣지 시맨틱 필터링 플랫폼으로<br />
                전송 전 불필요 데이터를 자동 제거하고<br />
                핵심만 선별 전달 필요
              </p>
            </div>
            <p className="mt-6 text-[24px] font-bold text-accent">
              제한된 대역폭에서도 전술 정보 전달 가능
            </p>
            <p className="mt-6 text-[18px] text-fg-dim leading-[1.5]">
              Colombi et al., &ldquo;Efficient Data Dissemination via Semantic Filtering at the Tactical Edge&rdquo;, 2024
            </p>
          </motion.div>
        </div>

        {/* 하단 결론 — 처음엔 흐리게, step 2에 선명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? {
            opacity: step >= 2 ? 1 : 0.15,
          } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p className="text-[34px] text-fg-muted">
            전술 AI 연구의 최전선이 같은 방향을 가리킵니다.
          </p>
          <p className="text-[44px] font-bold text-accent">
            S-DOT는 그 방향과 일치합니다.
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
