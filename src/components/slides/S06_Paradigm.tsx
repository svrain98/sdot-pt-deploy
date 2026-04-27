"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 06 — 패러다임 전환: 픽셀 → 의미
// 태그 → Before/After → 메인 카피 → 하단 설명 순차 자동 등장
export default function S06_Paradigm({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="relative flex h-full w-full flex-col items-center justify-center px-[140px]">
        {/* 태그 */}
        <motion.div
          className="mb-10 inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Paradigm Shift · 패러다임 전환
        </motion.div>

        {/* Before / After 비교 */}
        <div className="mb-12 flex items-baseline gap-10 text-center">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-2 text-[20px] font-medium uppercase tracking-label text-fg-dim">
              Before
            </div>
            <div className="text-[48px] font-black leading-none text-fg-dim line-through decoration-fg-dim/60 decoration-[3px]">
              Pixels
            </div>
          </motion.div>

          {/* 화살표 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 text-[20px] font-black text-accent"
          >
            →
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="mb-2 text-[20px] font-medium uppercase tracking-label text-accent">
              After
            </div>
            <div className="text-[48px] font-black leading-none text-accent">
              Meaning
            </div>
          </motion.div>
        </div>

        {/* 메인 카피 — After 등장 후 자동 등장 */}
        <motion.h2
          className="text-center text-[96px] font-black tracking-heading text-fg leading-[1.35]"
          initial={{ opacity: 0, y: 30 }}
          animate={active && step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          영상이 아닌,
          <br />
          <span className="font-bold text-accent">
            &lsquo;의미&rsquo;를 전송한다
          </span>
        </motion.h2>

        {/* 하단 설명 — step 1에 등장 */}
        <motion.div
          className="mt-12 max-w-[1200px] border-l-2 border-accent pl-6"
          initial={{ opacity: 0 }}
          animate={active && step >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-[32px] text-fg-muted leading-[1.9]">
            결심에 필요한 의미만 전송 <span className="text-accent">→</span> 전송량 대폭 감축<br />
            전송량 최소화<span className="text-accent">→</span> 전자전 위협 대비<br />
            
            <span className="font-bold text-accent">온톨로지 </span>
            데이터 <span className="text-accent">→</span> AI가<span className="text-accent font-bold"> 맥락</span>을 이해·전파·판단
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
