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
          <span className="text-[20px] font-semibold tracking-label text-accent">
            제5회 육군 인공지능 아이디어 공모전 · 본선
          </span>
        </motion.div>

        {/* 메인 타이틀 */}
        <div className="flex flex-1 flex-col justify-center -mt-16 pb-40">

          {/* S-DOT 약어 + 풀네임 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-baseline gap-5">
              <p className="text-[72px] font-black tracking-heading text-accent leading-none">
                S-DOT
              </p>
              <p className="text-[32px] font-light tracking-widest text-fg-muted leading-none">
                <span className="text-fg font-bold">S</span><span className="tracking-wider">emantic</span>{" "}
                <span className="text-fg font-bold">D</span><span className="tracking-wider">ata</span>{" "}
                <span className="text-fg font-bold">O</span><span className="tracking-wider">n</span>{" "}
                <span className="text-fg font-bold">T</span><span className="tracking-wider">actical-network</span>{" "}
              </p>
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            className="mt-8 text-[84px] font-black tracking-heading text-fg leading-[1.15]"
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            엣지 AI 기반 초경량 시맨틱 전송 기술
          </motion.h1>

          {/* 구분선 + 서브 메시지 */}
          <motion.div
            className="mt-12 border-t border-border pt-6"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-[34px] text-fg-muted leading-[1.7]">
              영상 데이터의 99% 감축 — 대역폭 제한·전자전 위협·정보 과부하 동시 해결
            </p>
          </motion.div>
        </div>

        {/* 하단 태그라인 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <p className="text-[22px] font-medium uppercase tracking-label text-fg-dim">
            Edge AI · Semantic Communication · Tactical Network
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
