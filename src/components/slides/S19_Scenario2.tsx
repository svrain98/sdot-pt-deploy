"use client";

import { AnimatePresence, motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import MediaBackground from "@/components/effects/MediaBackground";
import { VIDEO } from "@/lib/assets";
import { useDeckStore } from "@/lib/store";
import type { SlideProps } from "@/types/slide";

// 19 — 2파 시나리오 · Traceability & AIP Logic (3-step 리허설 플로우)
// ─ step 0 : 좌측 "이번엔 의미가 연결된다" 타이틀 + 요약 노출
//            (우측 Traceability/LLM/APPROVE 카드 · APPROVE 배너는 모두 숨김)
//            scenario_part2.mp4 는 4s 지점 첫 프레임에서 정지
// ─ step 1 : 좌측 타이틀 fade-out → 영상 4s 이후 전면 재생 (loop 없음)
// ─ step 2 : 영상 끝 → 좌측 타이틀 복귀 + 우측 3-step 파이프라인 카드 + APPROVE 배너 stagger-in
const PIPELINE_STEPS = [
  {
    n: "01",
    head: "Traceability — 1파 사례 매칭",
    body: "수많은 전장 데이터 중 1파 진격·전멸 AAR 을 Foundry 온톨로지에서 즉시 매칭. 동일 축선 재진입 = 경고 시그널.",
  },
  {
    n: "02",
    head: "LLM 위협 평가",
    body: "AIP Logic 이 장갑·무기 제원 DB 와 교전 이력을 결합해 위협 레벨을 산출하고 최적 타격 수단을 추천.",
  },
  {
    n: "03",
    head: "AI 타격 추천 → 지휘관 결심",
    body: "Fire Mission 자동 생성 → APPROVE → CFF 상향. AI 의 추천이 결심을 지원한다.",
  },
];

export default function S19_Scenario2({ meta, active, step }: SlideProps) {
  const nextStep = useDeckStore((s) => s.nextStep);
  const showTitle = step !== 1; // 영상 몰입 단계에선 타이틀 숨김
  const showCards = step >= 2; // 영상 끝난 뒤 우측 카드 + APPROVE 등장
  const videoPaused = step === 0; // 첫 진입 시 정지
  const immersiveVideo = step === 1;

  return (
    <SlideFrame
      meta={meta}
      background={
        <MediaBackground
          slot="S19_scenario_part2_aip"
          src={VIDEO.SCENARIO_PART2}
          caption="2파 시나리오 (4s~ · AIP 권고 구간) — scenario_part2.mp4"
          grayscale={false}
          // step 0/2: 좌측 그라디언트 mask + 옅은 dim. step 1: mask 걷고 영상 몰입
          dim={immersiveVideo ? 0.08 : 0.18}
          sideMask={immersiveVideo ? "none" : "left"}
          sideMaskWidth="55%"
          sideMaskStrength={0.82}
          startSeconds={4}
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
      <div className="flex h-full w-full px-[140px] pt-[150px] pb-[120px]">
        {/* 좌측: 타이틀 + 요약 — step 0 / 2 에서 노출 */}
        <div className="flex w-[45%] flex-col">
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
                  Simulation 2 · Result · Traceability + AIP Logic
                </div>
                <h2 className="mt-4 text-[56px] font-black leading-[1.1] tracking-heading text-fg drop-shadow-lg">
                  시뮬레이션 결과 —{" "}
                  <span className="text-accent">Traceability</span>가 잡아냈다
                </h2>
                <p className="mt-5 max-w-[560px] rounded-card bg-black/60 px-5 py-4 text-[21px] leading-[1.55] text-fg-muted backdrop-blur-sm">
                  2파 재진입 데이터가 들어오는 순간, Foundry Traceability 가{" "}
                  <span className="font-bold text-fg">
                    수많은 전장 데이터 중 1파 진격·전멸 AAR
                  </span>
                  을 매칭.{" "}
                  <span className="font-bold text-accent">
                    동일 경로 재진입
                  </span>
                  을 스스로 플래그했다. AIP 5단계가 LLM 위협평가 → Pk 계산 →
                  Fire Mission 생성 →{" "}
                  <span className="font-bold text-accent">AI 타격 추천</span>
                  까지 자동 수행 — 실제 전장에서 요구되는 판단 흐름과 부합했다.
                </p>

                {/* step 0 에선 안내 힌트, step 2 에선 APPROVE 배너 */}
                {step === 0 && (
                  <div className="mt-5 font-mono text-[14px] uppercase tracking-[0.25em] text-accent/80">
                    ▸ space — play video
                  </div>
                )}
                {showCards && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.6 }}
                    className="mt-6 inline-block rounded-card border border-accent bg-accent/15 px-5 py-3 text-[22px] font-black tracking-heading text-accent backdrop-blur-sm"
                  >
                    AI 타격 추천 · APPROVE → CFF
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 우측: 3단계 파이프라인 카드 — step 2 에서만 등장 */}
        <div className="flex w-[55%] flex-col justify-end gap-4">
          <AnimatePresence>
            {showCards &&
              PIPELINE_STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.18 }}
                  className="relative rounded-card border border-accent/40 bg-black/75 px-6 py-4 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-card border border-accent/70 bg-black/80 font-mono text-[26px] font-black text-accent">
                      {s.n}
                    </div>
                    <div>
                      <div className="text-[24px] font-black leading-[1.2] text-fg">
                        {s.head}
                      </div>
                      <div className="mt-1 text-[19px] leading-[1.5] text-fg-muted">
                        {s.body}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </SlideFrame>
  );
}
