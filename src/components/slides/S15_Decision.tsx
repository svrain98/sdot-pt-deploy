"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import GrayscaleToColor from "@/components/effects/GrayscaleToColor";
import PlaceholderMedia from "@/components/effects/PlaceholderMedia";
import { IMAGE } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 11 — [극적 장면] 2파 팔란티어 의사결정 Yes / No
// step 0: 흑백 배경만 / step 1: 컬러 전환 + Recommendation 카드 / step 2: Yes 하이라이트
export default function S11_Wave2_Decision({
  meta,
  active,
  step,
}: SlideProps) {
  return (
    <SlideFrame
      meta={meta}
      background={
        <GrayscaleToColor active={active && step >= 1} className="h-full w-full">
          <PlaceholderMedia
            slot="S11_mon_graph"
            kind="image"
            src={IMAGE.MON_GRAPH}
            caption="Palantir Knowledge Graph (monocle-graph)"
            fit="cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </GrayscaleToColor>
      }
    >
      <div className="flex h-full w-full px-[140px] pt-[140px] pb-[120px]">
        {/* 좌측: 상황 설명 */}
        <div className="flex w-[52%] flex-col justify-between pr-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
              Day 2 · Wave 2 · DP-2 Decision Point
            </div>
            <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.3] text-fg">
              같은 축선,
              <br />
              <span className="text-accent">같은 전차 40대</span>
            </h2>
            <p className="mt-4 max-w-[600px] text-[20px] text-fg-muted leading-[1.7]">
              S-DOT이 2파 접근을 Day 2 06:18Z에 탐지. Palantir Ontology가 1파 BDA
              결과를 참조하여 동일 패턴 인지 — 지휘관에게 즉시 의사결정 요청.
            </p>
          </motion.div>

          {/* 팔란티어 오브젝트 리니지 칩 파이프라인 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active && step >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 rounded-card border border-border bg-black/70 p-4 text-[22px]"
          >
            <Chip>Observation</Chip>
            <span className="text-fg-dim">→</span>
            <Chip>UnitTrack</Chip>
            <span className="text-fg-dim">→</span>
            <Chip>DecisionPoint</Chip>
            <span className="text-fg-dim">→</span>
            <Chip>Recommendation</Chip>
          </motion.div>
        </div>

        {/* 우측: Decision Card */}
        <div className="flex w-[48%] items-center justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              active && step >= 1
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-[640px] overflow-hidden rounded-card-lg border-2 border-accent bg-black/90"
          >
            {/* 헤더 */}
            <div className="border-b border-border bg-accent/10 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-card bg-accent/20 text-[20px] font-black text-accent">
                    AI
                  </span>
                  <div>
                    <div className="text-[15px] font-medium uppercase tracking-label text-accent">
                      AI Recommendation · DP-2
                    </div>
                    <div className="text-[15px] font-bold text-fg">
                      FPV Drone 즉각 출격
                    </div>
                  </div>
                </div>
                <div className="rounded-card border border-accent/40 bg-accent/10 px-2 py-0.5 text-[14px] font-black uppercase tracking-label text-accent">
                  High · 0.94
                </div>
              </div>
            </div>

            {/* 바디 */}
            <div className="space-y-3 px-6 py-4 text-[20px]">
              <Row label="Target" value="RU 1차제 기계화대대 · T-72B3 ×14" />
              <Row
                label="Weapon"
                value="Ukraine FPV Drone ×12 + Stugna-P ATGM ×4"
              />
              <Row label="Effect" value="축선 차단 · 예상 파괴율 78%" />
              <Row label="Risk" value="FPV 손실 5~8기 · 허용 범위 내" />
              <div className="border-t border-border pt-3 text-[18px] text-fg-muted">
                Based on Day 1 Wave 1 BDA · Ontology hit: 12 matching precedents
              </div>
            </div>

            {/* Yes / No 버튼 */}
            <div className="grid grid-cols-2 border-t border-border">
              <motion.button
                initial={{ backgroundColor: "rgba(117,140,88,0.05)" }}
                animate={
                  active && step >= 2
                    ? {
                        backgroundColor: [
                          "rgba(117,140,88,0.05)",
                          "rgba(117,140,88,0.30)",
                          "rgba(117,140,88,0.10)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  times: [0, 0.5, 1],
                  repeat: active && step >= 2 ? Infinity : 0,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center border-r border-border py-5"
              >
                <div className="text-[16px] font-medium uppercase tracking-label text-accent">
                  Approve · F7
                </div>
                <div className="mt-1 text-[28px] font-black text-accent">
                  YES
                </div>
                <div className="text-[16px] text-fg-muted">
                  ↓ Fire Mission 자동 생성
                </div>
              </motion.button>
              <button className="flex flex-col items-center py-5 opacity-40 bg-bg-panel">
                <div className="text-[16px] font-medium uppercase tracking-label text-fg-dim">
                  Reject · F8
                </div>
                <div className="mt-1 text-[28px] font-black text-fg-dim">
                  NO
                </div>
                <div className="text-[16px] text-fg-muted">
                  대안 추천 재요청
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}

// 칩 — 모든 칩은 accent 단색 테마
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-card border border-accent text-accent px-2 py-1 font-black">
      {children}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[15px] font-medium uppercase tracking-label text-fg-dim">
        {label}
      </span>
      <span className="text-right text-fg">{value}</span>
    </div>
  );
}
