"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 09 — 아우디우카 Day 1 1파 공격
// 전면 영상 배경(흑백) + 좌측 타임라인 오버레이
const TIMELINE = [
  {
    time: "04:00Z",
    code: "EVT-001",
    text: "NAI-STAGING 포구화염 18문 탐지",
    subtext: "2S19 Msta · 152mm + BM-21 Grad MLRS",
  },
  {
    time: "04:22Z",
    code: "EVT-002",
    text: "러시아 1파 전차 40대 남하 감지",
    subtext: "T-72B3 · T-80BVM · BMP-2 혼성",
  },
  {
    time: "04:45Z",
    code: "EVT-003",
    text: "우크라이나 전방 관측소 보고",
    subtext: "드론 ISR · Leleka-100 Mavic 3",
  },
];

export default function S09_Avdiivka_Wave1({
  meta,
  active,
  step,
}: SlideProps) {
  return (
    <SlideFrame
      meta={meta}
      background={
        <MediaBackground
          slot="S09_bg_night_surveillance"
          src={VIDEO.S09_NIGHT_SURVEILLANCE}
          caption="야간 감시·타격 영상 — sdot-clip/05_야간_감시및타격.mp4"
          grayscale={true}
          dim={0.7}
        />
      }
    >
      <div className="flex h-full w-full px-[140px] pt-[140px] pb-[120px]">
        {/* 좌측: 타이틀 + 타임라인 */}
        <div className="flex w-[55%] flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
              Day 1 · Wave 1 · 2023-10-10
            </div>
            <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.2] text-fg">
              러시아,
              <br />
              <span className="text-accent">공격 준비 사격 개시</span>
            </h2>
            <p className="mt-4 max-w-[700px] text-[20px] text-fg-muted leading-[1.7]">
              04:00Z, 아우디우카 동측 NAI-STAGING 일대에서 열상 포구화염 18개
              동시 관측. 드론 ISR 피드가 S-DOT 엣지에서 RDF로 자동 변환되어
              우크라이나 C2로 즉시 도착.
            </p>
          </motion.div>

          {/* 타임라인 */}
          <div className="mt-10 space-y-4 border-l border-accent/40 pl-6">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.code}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  active && step >= (i < 2 ? 0 : 1)
                    ? { opacity: 1, x: 0 }
                    : {}
                }
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-[29px] top-4 h-2 w-2 rounded-full bg-accent" />
                <div className="flex items-baseline gap-3 text-[24px]">
                  <span className="text-accent font-medium">{t.time}</span>
                  <span className="text-fg-dim">{t.code}</span>
                </div>
                <div className="mt-0.5 text-[20px] font-bold text-fg">
                  {t.text}
                </div>
                <div className="text-[20px] text-fg-muted">{t.subtext}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 우측: RDF 이벤트 카드 */}
        <div className="flex w-[46%] items-end justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={active && step >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-[440px] border border-accent bg-bg-panel/90 rounded-card p-5 backdrop-blur-sm"
          >
            <div className="mb-1 text-[20px] font-medium uppercase tracking-label text-accent">
              S-DOT Event — EVT-001
            </div>
            <div className="mb-3 text-[20px] text-fg-muted">
              열상 탐지 · RDF 자동 변환
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded bg-black p-3 text-[20px] leading-[1.55] text-accent">
{`[{ "s": "unit:RU-2S19",
   "p": "detection:suspect",
   "o": "geo:37.69,48.15" },
 { "s": "unit:RU-2S19",
   "p": "count:observed",
   "o": "qty:18" },
 { "s": "unit:RU-2S19",
   "p": "activity:phase",
   "o": "prep-fire" }]`}
            </pre>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[20px] font-medium uppercase tracking-label">
              <span className="text-fg-muted">원본 815.7 KB</span>
              <span className="text-accent font-black">17,401:1</span>
              <span className="text-accent-light">S-DOT 48 B</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}
