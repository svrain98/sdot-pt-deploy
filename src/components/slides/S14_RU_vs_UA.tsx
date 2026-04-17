"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import SplitCompare from "@/components/effects/SplitCompare";
import PlaceholderMedia from "@/components/effects/PlaceholderMedia";
import HlsVideo from "@/components/effects/HlsVideo";
import { IMAGE, VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 10 — 1파→2파 반복의 이유: 러시아 C2 한계 vs 우크라이나 S-DOT 즉시 결심
export default function S10_RU_vs_UA({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
            Day 1 → Day 2 · Why Wave 2 Repeated
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.05] text-fg">
            1파가 무너졌는데,{" "}
            <span className="text-accent">왜 2파가 똑같이 왔는가?</span>
          </h2>
        </div>

        {/* 스플릿 비교 */}
        <div className="mt-8 flex-1 overflow-hidden rounded-card border border-border">
          <SplitCompare
            leftLabel="러시아 · RU C2"
            rightLabel="우크라이나 · UA + S-DOT"
            leftGrayscale={true}
            rightActive={active && step >= 1}
            left={
              <div className="relative h-full w-full bg-black">
                <HlsVideo
                  src={VIDEO.MAIN}
                  startSeconds={30}
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-card border border-border bg-black/80 p-4">
                  <div className="mb-2 text-[16px] font-medium uppercase tracking-label text-fg-muted">
                    지휘통제 한계
                  </div>
                  <ul className="space-y-1 text-[20px] text-fg-muted">
                    <li>· 하향식·종이 지도 기반 결심</li>
                    <li>· 영상·음성 무전 중심 (대역 요구 높음)</li>
                    <li>· BDA 피드백 지연 → 1파 실패 원인 인지 실패</li>
                    <li>· 2파도 동일 축선 반복 투입 → 동일 결과</li>
                  </ul>
                </div>
              </div>
            }
            right={
              <div className="relative h-full w-full bg-black">
                <HlsVideo src={VIDEO.S10_UA_DASHBOARD} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    active && step >= 1 ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 rounded-card border border-accent bg-black/85 p-4"
                >
                  <div className="mb-2 text-[16px] font-medium uppercase tracking-label text-accent">
                    S-DOT Enabled C2
                  </div>
                  <ul className="space-y-1 text-[20px] text-fg">
                    <li>· 엣지 RDF → 2초 이내 C2 도시</li>
                    <li>· AI Weapon–Target Matching 자동 추천</li>
                    <li>· 관측 → 결심 → 교전 → BDA 킬체인 폐쇄</li>
                    <li>· 같은 축선 재침투 즉시 탐지 → 사전 차단 가능</li>
                  </ul>
                </motion.div>
              </div>
            }
          />
        </div>
      </div>
    </SlideFrame>
  );
}

