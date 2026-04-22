"use client";

import { AnimatePresence, motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import { useDeckStore } from "@/lib/store";
import type { SlideProps } from "@/types/slide";

// 17 — 1파 시뮬레이션 · 아우디우카 (3-step 리허설 플로우)
// 스토리: 러시아 1파 기동 데이터를 S-DOT 에 넣고 시뮬레이션을 돌려본 결과,
//          AIP Logic 이 내놓은 방어 방안이 실제 2023-10-10 우크라이나 군의 대응과
//          부합했다. 결과를 미리 보고 맞춘 것이 아니라, 같은 상황에서 같은 판단에
//          도달했다는 검증.
// ─ step 0 : 좌측 "1파 시뮬레이션" 타이틀 + 영상 첫 프레임 정지
// ─ step 1 : 텍스트 fade-out → 영상 전면 재생 (소리 없이, 좌측 mask 도 걷어냄)
// ─ step 2 : 영상 끝(또는 Space) → 좌측 텍스트 복귀 + 우측 BEAT 01/02/03 stagger in
//            영상은 마지막 프레임에서 정지 유지 (loop 끔)
const WAVE1_BEATS = [
  {
    code: "BEAT-01",
    label: "입력",
    head: "러시아 1파 기동 데이터",
    note: "AXIS-NORTH · T-80BVM 6대 · 야간 기동. 드론 RDF 피드를 S-DOT 에 그대로 투입.",
  },
  {
    code: "BEAT-02",
    label: "S-DOT 추천",
    head: "지뢰지대 + Stugna-P ATGM + FPV 교차 타격",
    note: "AIP Logic 이 지형·보유 자산·교전 이력을 결합해 스스로 도출한 방어 방안.",
  },
  {
    code: "BEAT-03",
    label: "실제 결과와 부합",
    head: "우크라이나 군이 현장에서 선택한 대응과 동일",
    note: "2023-10-10 실제 AAR: 동일 교차화력 전술로 1제대 전멸. 같은 상황에서 같은 판단.",
  },
];

export default function S17_Scenario1({ meta, active, step }: SlideProps) {
  const nextStep = useDeckStore((s) => s.nextStep);
  // step 기반 상태
  const showTitle = step !== 1; // 영상 재생 중(step 1)에는 타이틀 숨김
  const showBeats = step >= 2; // 영상 끝난 뒤(step 2) 우측 비트 등장
  const videoPaused = step === 0; // 첫 진입 시 영상 정지, step 1 부터 재생, step 2 는 끝난 상태 유지
  // step 1 에선 영상을 전면에 보여줘야 하므로 sideMask 를 없애고 dim 도 최소화
  const immersiveVideo = step === 1;

  return (
    <SlideFrame
      meta={meta}
      background={
        <MediaBackground
          slot="S17_scenario_part1"
          src={VIDEO.SCENARIO_PART1}
          caption="아우디우카 1파 시나리오 — scenario_part1.mp4"
          grayscale={false}
          // step 0/2 : 좌측 진한 그라디언트 + 약한 uniform dim → 텍스트 가독
          // step 1   : 마스크 걷고 uniform dim 만 옅게 → 영상 몰입
          dim={immersiveVideo ? 0.08 : 0.18}
          sideMask={immersiveVideo ? "none" : "left"}
          sideMaskWidth="62%"
          sideMaskStrength={0.82}
          // step-based 재생 제어
          paused={videoPaused}
          loop={false}
          onEnded={() => {
            // 영상이 끝나면 자동으로 step 2 로 넘어가 텍스트 복귀
            if (active && step < 2) {
              nextStep(3);
            }
          }}
        />
      }
    >
      <div className="flex h-full w-full px-[140px] pt-[150px] pb-[120px]">
        {/* 좌측: 상황 타이틀 — step 0 과 step 2 에서만 노출 */}
        <div className="flex w-[52%] flex-col">
          <AnimatePresence mode="wait">
            {showTitle && (
              <motion.div
                key="title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-card border border-accent/60 bg-black/70 px-3 py-1.5 text-[18px] font-medium uppercase tracking-label text-accent backdrop-blur-sm">
                  Simulation 1 · Ukrainian Response · Avdiivka 2023-10-10
                </div>
                <h2 className="mt-4 text-[60px] font-black leading-[1.1] tracking-heading text-fg drop-shadow-lg">
                  S-DOT 의 추천이
                  <br />
                  <span className="text-accent">실제 대응과 부합했다</span>
                </h2>
                <p className="mt-5 max-w-[640px] rounded-card bg-black/55 px-5 py-4 text-[22px] leading-[1.6] text-fg-muted backdrop-blur-sm">
                  러시아 1파 기동 데이터를{" "}
                  <span className="font-bold text-fg">S-DOT</span> 에 그대로
                  넣고 시뮬레이션을 돌렸다. AIP Logic 이 스스로 내놓은 방어
                  방안은{" "}
                  <span className="text-fg">
                    지뢰지대 · Stugna-P · FPV 교차 타격
                  </span>
                  —{" "}
                  <span className="font-bold text-accent">
                    2023-10-10 실제 우크라이나 군이 현장에서 선택한 대응
                  </span>
                  과 부합했다.
                  <br />
                  같은 상황에서 같은 판단에 도달했다는 검증이다.
                </p>
                {step === 0 && (
                  <div className="mt-5 font-mono text-[14px] uppercase tracking-[0.25em] text-accent/80">
                    ▸ space — play video
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 우측: 3단계 비트 카드 — step 2 에서만 등장 */}
        <div className="flex w-[48%] flex-col justify-end gap-4">
          <AnimatePresence>
            {showBeats &&
              WAVE1_BEATS.map((b, i) => (
                <motion.div
                  key={b.code}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.18 }}
                  className="rounded-card border border-accent/40 bg-black/75 px-5 py-4 backdrop-blur-sm"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[16px] font-bold uppercase tracking-label text-accent">
                      {b.code}
                    </span>
                    <span className="text-[18px] font-medium uppercase tracking-label text-fg-dim">
                      {b.label}
                    </span>
                  </div>
                  <div className="mt-1 text-[22px] font-black text-fg">
                    {b.head}
                  </div>
                  <div className="mt-1 text-[18px] text-fg-muted">{b.note}</div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </SlideFrame>
  );
}
