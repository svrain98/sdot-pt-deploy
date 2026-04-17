"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 01 — 표지: 드론 영상 배경 loop + 타이틀 페이드인
export default function S01_Title({ meta, active }: SlideProps) {
  return (
    <SlideFrame
      meta={meta}
      showChrome={false}
      background={
        <MediaBackground
          slot="S01_bg_drone_recon"
          src={VIDEO.MAIN}
          caption="메인 영상 — main_00.mov"
          dim={0.8}
        />
      }
    >
      <div className="relative flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 상단 태그 */}
        <motion.div
          className="inline-flex self-start border border-accent/50 px-4 py-2 rounded-card"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[15px] font-semibold tracking-label text-accent">
            제5회 육군 인공지능 아이디어 공모전 · 본선
          </span>
        </motion.div>

        {/* 메인 타이틀 */}
        <div className="flex flex-1 flex-col justify-center">
          <motion.h1
            className="text-[90px] font-black tracking-heading text-fg leading-[1.3]"
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            현대전장의 전술통신망 한계를 극복하는
            <br />
            <span className="text-accent">시맨틱 데이터 전송 기술 S-DOT</span>
          </motion.h1>

          {/* 약어 풀이 */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <span className="text-[24px] font-bold text-accent">S-DOT</span>
            <span className="text-[20px] text-fg-dim">=</span>
            <span className="text-[20px] text-fg-muted">
              <strong className="text-fg">S</strong>emantic{" "}
              <strong className="text-fg">D</strong>ata{" "}
              <strong className="text-fg">O</strong>n{" "}
              <strong className="text-fg">T</strong>actical-network
            </span>
          </motion.div>

          {/* 구분선 + 서브 메시지 */}
          <motion.div
            className="mt-8 border-t border-border pt-8"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="text-[20px] text-fg-muted leading-[1.7]">
              Edge AI 기반 초경량 시맨틱 전송 체계 —
              99% 데이터 감축, 전술통신망의 극히 제한된 대역폭에서도 끊기지 않는 킬체인.
            </p>
          </motion.div>
        </div>

        {/* 하단 태그라인 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p className="text-[15px] font-medium uppercase tracking-label text-fg-dim">
            Edge AI · Semantic Communication · Tactical Network
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
