"use client";

import { AnimatePresence, motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import { useDeckStore } from "@/lib/store";
import type { SlideProps } from "@/types/slide";

// 18 — 2파 재진입 시뮬레이션 셋업 (3-step 리허설 플로우)
// 스토리: 실제 역사에서 러시아 2제대가 같은 축선으로 재진입했습니다. 이 재진입
//         데이터를 S-DOT 에 그대로 넣고 시뮬레이션을 돌리면, Foundry Traceability
//         가 1파 기록과 연결해 동일 경로 재진입을 스스로 식별할 수 있을까요. 다음
//         장에서 실제 결과와 부합하는지 확인합니다.
// ─ step 0 : 타이틀 노출 + 영상(0s) 첫 프레임 정지
// ─ step 1 : 타이틀 hide + 영상 0~4s 전면 재생 (loop 없음)
// ─ step 2 : 영상 끝 → 타이틀 복귀 + INPUT / QUESTION / CHECK 3카드 + 귀결 문장
const GAPS = [
  {
    tag: "INPUT",
    head: "러시아 2제대 재진입 데이터",
    body: "T-72B3 4대 · BMP-2 6대, AXIS-NORTH 동일 축선. 1시간 10분 뒤 같은 길로 들어오는 실제 기록.",
  },
  {
    tag: "QUESTION",
    head: "Traceability 가 잡아낼까요",
    body: "1파 기록과 2파 입력을 Foundry 온톨로지 위에서 비교할 때, 동일 경로 재진입을 S-DOT 가 스스로 식별할 수 있을까요.",
  },
  {
    tag: "CHECK",
    head: "실제 결과와 부합하는지 확인",
    body: "AIP Logic · LLM 위협평가 · 타격 추천 — 이 흐름이 현장의 상황 판단과 맞닿는지 다음 장에서 검증합니다.",
  },
];

export default function S18_InfoGap({ meta, active, step }: SlideProps) {
  const nextStep = useDeckStore((s) => s.nextStep);
  const showTitle = step !== 1;
  const showCards = step >= 2;
  const videoPaused = step === 0;
  // step 1 에선 영상 전면 — dim 옅게, grayscale 도 제거해 색감 살리기
  const immersiveVideo = step === 1;

  return (
    <SlideFrame
      meta={meta}
      background={
        <MediaBackground
          slot="S18_scenario_part2_infogap"
          src={VIDEO.SCENARIO_PART2}
          caption="2파 시나리오 (0~3s · 정보 단절 구간) — scenario_part2.mp4"
          // 단절 분위기를 위해 카드 단계에선 흑백, 영상 몰입 단계에선 컬러
          grayscale={!immersiveVideo}
          dim={immersiveVideo ? 0.08 : 0.42}
          startSeconds={0}
          // 영상 마지막 1초는 숨김 — 원본 4s → 3s
          endSeconds={3}
          // step-based 재생
          paused={videoPaused}
          loop={false}
          onEnded={() => {
            if (active && step < 2) {
              nextStep(3);
            }
          }}
        />
      }
    >
      <div className="flex h-full w-full flex-col px-[140px] pt-[150px] pb-[120px]">
        {/* 상단: 문제 질문 — step 0 / 2 에서 노출 */}
        <AnimatePresence mode="wait">
          {showTitle && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-card border border-accent/60 bg-black/70 px-3 py-1.5 text-[20px] font-medium uppercase tracking-label text-accent backdrop-blur-sm">
                Simulation 2 · Russian Wave 2 Re-entry · Same Axis
              </div>
              <h2 className="mt-4 text-[68px] font-black leading-[1.05] tracking-heading text-fg drop-shadow-lg">
                2제대가 같은 축선으로 다시 온다 —
                <br />
                <span className="text-accent">Traceability 가 잡아낼까?</span>
              </h2>
              {step === 0 && (
                <div className="mt-5 font-mono text-[16px] uppercase tracking-[0.25em] text-accent/80">
                  ▸ space — play video
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 중앙: 3-column 정보 단절 카드 — step 2 에서 등장 */}
        <div className="mt-10 grid grid-cols-3 gap-5">
          <AnimatePresence>
            {showCards &&
              GAPS.map((g, i) => (
                <motion.div
                  key={g.tag}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="rounded-card border border-accent/40 bg-black/78 px-6 py-5 backdrop-blur-sm"
                >
                  <div className="font-mono text-[18px] font-bold uppercase tracking-label text-accent">
                    {g.tag}
                  </div>
                  <div className="mt-2 text-[30px] font-black leading-[1.2] text-fg">
                    {g.head}
                  </div>
                  <div className="mt-3 text-[22px] leading-[1.55] text-fg-muted">
                    {g.body}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* 하단: 귀결 문장 — step 2 에서 등장 */}
        <AnimatePresence>
          {showCards && (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="mt-auto self-center rounded-card border border-border bg-black/85 px-6 py-3 backdrop-blur-sm"
            >
              <div className="text-[26px] text-fg">
                <span className="text-fg-muted">같은 드론 피드 + Foundry Traceability · </span>
                <span className="font-bold text-accent">
                  S-DOT 의 판단이 실제 현장과 부합하는지 — 다음 장에서 확인.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}
