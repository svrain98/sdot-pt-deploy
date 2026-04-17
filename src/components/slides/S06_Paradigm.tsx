"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 04 — 패러다임 전환: 픽셀 → 의미
// 교관님 핵심 메시지. 대형 타이포 강조. 배경: 팔란티어 대시보드 영상
export default function S04_Paradigm({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="relative flex h-full w-full flex-col items-center justify-center px-[140px]">
        {/* 태그 */}
        <motion.div
          className="mb-10 inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Paradigm Shift · 패러다임 전환
        </motion.div>

        {/* Before / After 비교 */}
        <div className="mb-12 flex items-baseline gap-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-2 text-[20px] font-medium uppercase tracking-label text-fg-dim">
              Before
            </div>
            <div className="text-[48px] font-black leading-none text-fg-dim line-through decoration-fg-dim/60 decoration-[3px]">
              Pixels
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 text-[20px] font-black text-accent"
          >
            →
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="mb-2 text-[20px] font-medium uppercase tracking-label text-accent">
              After
            </div>
            <div className="text-[48px] font-black leading-none text-accent">
              Meaning
            </div>
          </motion.div>
        </div>

        {/* 메인 카피 */}
        <motion.h2
          className="text-center text-[96px] font-black tracking-heading text-fg leading-[1.35]"
          initial={{ opacity: 0, y: 30 }}
          animate={active && step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          영상이 아닌,
          <br />
          <span className="font-bold text-accent">
            &lsquo;의미&rsquo;를 전송한다
          </span>
        </motion.h2>

        <motion.p
          className="mt-12 max-w-[1000px] border-l-2 border-accent pl-6 text-[24px] text-fg-muted leading-[1.7]"
          initial={{ opacity: 0 }}
          animate={active && step >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          고화질 영상 대신, 전장 판단에 필수적인 핵심 정보(객체·위치·행동)만 추출 후
          전송하면 —<br />
          전송량 99% 감축, 재밍 환경에서도 킬체인 생존. 6G 핵심 기술 &lsquo;시맨틱 통신&rsquo;의
          국방 선제 적용.
        </motion.p>
      </div>
    </SlideFrame>
  );
}
