"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 14 — 마무리: "지금 만들지 않으면 전장에서 늦는다"
export default function S14_Closing({ meta, active }: SlideProps) {
  return (
    <SlideFrame
      meta={meta}
      showChrome={false}
      background={
        <MediaBackground
          slot="S14_bg_main02"
          src={VIDEO.MAIN_02}
          caption="메인 영상 02 — main_02.mp4"
          dim={0.78}
        />
      }
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center px-[140px]">
        {/* 태그 */}
        <motion.div
          className="mb-8 inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Closing · Semantic is Survival
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.h2
          className="text-center text-[90px] font-black tracking-heading leading-[1.3] text-fg"
          initial={{ opacity: 0, y: 30 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          고용량 정보를 전술통신망에서 운용하도록,
          <br />
          <span className="text-accent">AI - 시맨틱 전송체계로 혁신합니다.</span>
        </motion.h2>

        {/* 구분선 + S-DOT 서브타이틀 */}
        <motion.div
          className="mt-14 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="h-px w-20 bg-fg-dim/60" />
          <div className="text-[20px] font-medium uppercase tracking-label text-fg-dim">
            S-DOT · Semantic Data On Tactical-network
          </div>
          <div className="h-px w-20 bg-fg-dim/60" />
        </motion.div>

      </div>
    </SlideFrame>
  );
}
