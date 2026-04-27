"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 21 — Closing · 영상을 보내는 시대에서, 의미를 보내는 시대로
// 스크립트 슬라이드 12 기반 클로징.
// 메인 영상 배경 + 대형 카피 + 감사 인사.
export default function S21_Closing({ meta, active }: SlideProps) {
  return (
    <SlideFrame
      meta={meta}
      background={
        <MediaBackground
          slot="S21_closing_bg"
          src={VIDEO.MAIN}
          caption="클로징 배경 — sdot-pt main reel"
          grayscale={true}
          dim={0.78}
        />
      }
    >
      <div className="flex h-full w-full flex-col items-center justify-center px-[160px] pt-[150px] pb-[130px] text-center">
        {/* 메인 카피 — 2줄 대비 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[44px] font-medium leading-[1.3] tracking-heading text-fg-muted drop-shadow-lg">
            영상을 보내는 시대에서,
          </div>
          <div className="mt-3 text-[80px] font-black leading-[1.1] tracking-heading text-fg drop-shadow-lg">
            <span className="text-accent">온톨로지</span>로 통합하는 시대로.
          </div>
        </motion.div>

        {/* 서브 카피 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 max-w-[1200px] rounded-card bg-black/55 px-8 py-5 text-[30px] leading-[1.55] text-fg-muted backdrop-blur-sm"
        >
          <span className="font-bold text-fg">S-DOT</span> 는 그 전환의 시작입니다.
          <br />
          온톨로지 · 빅데이터 · LLM 을 하나의 플랫폼으로 엮어,
          전장의 모든 데이터가 <span className="text-accent font-bold">맥락</span>으로
          이어지는 미래를 만들겠습니다.
        </motion.div>

        {/* 감사 인사 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-12"
        >
          <div className="text-[52px] font-black tracking-heading text-fg drop-shadow-lg">
            감사합니다.
          </div>
          <div className="mt-2 font-mono text-[22px] uppercase tracking-[0.3em] text-accent">
            S-DOT · Semantic Data On Tactical-network
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
