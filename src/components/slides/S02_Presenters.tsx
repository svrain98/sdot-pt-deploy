"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import PlaceholderMedia from "@/components/effects/PlaceholderMedia";
import type { SlideProps } from "@/types/slide";

// 02 — 발표자 소개: 4인 카드 그리드
const PRESENTERS = [
  { slot: "S02_presenter_1", name: "발표자 1", role: "역할" },
  { slot: "S02_presenter_2", name: "발표자 2", role: "역할" },
  { slot: "S02_presenter_3", name: "발표자 3", role: "역할" },
  { slot: "S02_presenter_4", name: "발표자 4", role: "역할" },
];

export default function S02_Presenters({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta} showChrome={true}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
            TEAM · 발표 팀 소개
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            발표자 소개
          </h2>
        </div>

        {/* 4인 카드 그리드 */}
        <div className="mt-14 grid flex-1 grid-cols-4 gap-6">
          {PRESENTERS.map((p, i) => (
            <motion.div
              key={p.slot}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-bg-panel rounded-card border border-border p-6 flex flex-col"
            >
              {/* 사진 영역 */}
              <div className="h-[200px] w-full overflow-hidden rounded-card">
                <PlaceholderMedia
                  slot={p.slot}
                  kind="image"
                  caption={`${p.name} 사진`}
                  className="h-full w-full"
                  fit="cover"
                />
              </div>
              {/* 이름 */}
              <p className="mt-4 text-[20px] font-bold text-fg">{p.name}</p>
              {/* 역할 */}
              <p className="mt-1 text-[16px] text-fg-muted">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
