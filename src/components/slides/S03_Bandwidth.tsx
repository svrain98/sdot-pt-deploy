"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import HlsVideo from "@/components/effects/HlsVideo";
import { VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 03 — Army TIGER 4.0: 고화질 스트림 vs 9.6 Kbps 끊김
export default function S03_Bandwidth({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
            Context · Army TIGER 4.0
          </div>
          <h2 className="mt-4 text-[56px] font-black tracking-heading text-fg leading-[1.4]">
            드론·로봇 - 유무인 복합 전장에서 데이터 폭발적 증가,
            <br />
            <span className="text-accent">데이터 송수신 대역폭은 그대로</span>
          </h2>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-2 gap-10">
          {/* 좌: 이상적인 고화질 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[20px] font-medium uppercase tracking-label text-accent">
                ● 이론적 요구량
              </div>
              <div className="text-[32px] font-extrabold text-accent">
                20+ Mbps
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded border border-border">
              <HlsVideo src={VIDEO.MAIN} />
            </div>
            <p className="mt-3 text-[18px] text-fg-muted">
              4K EO/IR · 드론 무인차량 실시간 스트림 · 광대역 필수
            </p>
          </motion.div>

          {/* 우: 실제 전술망 — step >= 1 에서 등장 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={
              active && step >= 1
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 20 }
            }
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[20px] font-medium uppercase tracking-label text-fg-muted">
                ● 실제 전술망
              </div>
              <div className="text-[32px] font-extrabold text-fg-muted">
                9.6 Kbps
              </div>
            </div>
            <div
              className="relative aspect-video w-full overflow-hidden rounded border border-border"
              style={{ filter: "grayscale(100%) contrast(1.2)" }}
            >
              <HlsVideo src={VIDEO.S03_GLITCH} />
            </div>
            <p className="mt-3 text-[18px] text-fg-muted">
              P-999K 데이터 모드 · 헤더 오버헤드 · 전자전 취약
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4 border-t border-border pt-6"
          initial={{ opacity: 0 }}
          animate={active && step >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-[20px] text-fg-muted">이상 요구량</span>
          <span className="text-[24px] font-extrabold text-accent">÷ 2,000 ×</span>
          <span className="text-[20px] text-fg-muted">
            실제 가용 대역폭 격차가 AI의 가장 큰 장애요소
          </span>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
