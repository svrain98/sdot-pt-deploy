"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 09 — 데모 시나리오: 아우디우카 전투
// 좌측: 타임라인 / 우측: 드론 탐지 스틸
// 러시아 통신두절 관점이 아닌, S-DOT 데모가 2차파 재진입을 포착했다는 점을 중심으로 서술
// step 1: 하단 핵심 메시지 박스 선명화
const TIMELINE = [
  { time: "04:00Z", event: "러시아 포병 준비사격 개시", sub: "전차(T-80BVM) 6대 · 장갑차(BMP-2) 8대", highlight: false },
  { time: "05:00Z", event: "러시아 1제대 북측 축선 진입", sub: "", highlight: false },
  { time: "05:20Z", event: "1제대 격파 — 지뢰·대전차미사일로 통로 차단", sub: "", highlight: false },
  { time: "06:30Z", event: "러시아 2제대 동일 축선 재진입", sub: "전차(T-72B3) 4대 · 장갑차(BMP-2) 6대", highlight: true },
  { time: "06:45Z", event: "2제대 동일 피해 반복", sub: "", highlight: false },
];

export default function S09_DemoScenario({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">

        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            DAY 1 · 2023-10-10 · AVDIIVKA
          </div>
          <h2 className="mt-4 text-[56px] font-black tracking-heading text-fg leading-[1.1]">
            데모 시나리오: 아우디우카 전투
          </h2>
          <p className="mt-2 text-[26px] text-fg-muted">
            S-DOT 데모가 <span className="text-accent font-semibold">2차파 재진입</span>을 스스로 포착했다
          </p>
        </div>

        {/* 좌우 분할 */}
        <div className="mt-8 flex flex-1 gap-10">

          {/* 좌측 — 타임라인 */}
          <div className="flex w-[55%] flex-col justify-center gap-5">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
                className="flex items-start gap-5"
              >
                <span className={`w-[110px] shrink-0 text-[22px] font-bold text-right pt-1 ${t.highlight ? "text-accent" : "text-accent/70"}`}>
                  {t.time}
                </span>
                <span className={`mt-[10px] w-2.5 h-2.5 rounded-full shrink-0 ${t.highlight ? "bg-accent ring-2 ring-accent/40" : "bg-accent/70"}`} />
                <div className="flex flex-col">
                  <span className={`text-[24px] ${t.highlight ? "font-bold text-fg" : "text-fg-muted"}`}>
                    {t.event}
                  </span>
                  {t.sub && (
                    <span className="text-[20px] text-fg-dim mt-0.5">{t.sub}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 우측 — 드론 탐지 스틸 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 rounded-card overflow-hidden border border-border"
          >
            <img
              src="/images/thumbnails/evt_001.jpg"
              alt="드론 전차 탐지 장면"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* 핵심 메시지 — 처음엔 흐리게, step 1에 선명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: step >= 1 ? 1 : 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: step >= 1 ? 0.2 : 0.8 }}
          className="mt-6 bg-bg-panel rounded-card border border-accent/30 p-6"
        >
          <p className="text-[24px] text-fg-muted leading-[1.7]">
            러시아 2제대가 1시간 10분 뒤 같은 축선으로 다시 들어온 이 실제 기록을 S-DOT 에 그대로 투입했습니다.
          </p>
          <p className="mt-3 text-[34px] font-bold text-accent">
            Foundry Traceability 가 1파 기록과 2파 입력을 연결해, 동일 축선 재진입을 스스로 포착했습니다.
          </p>
        </motion.div>

      </div>
    </SlideFrame>
  );
}
