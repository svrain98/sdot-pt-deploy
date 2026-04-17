"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import HlsVideo from "@/components/effects/HlsVideo";
import TypingRDF from "@/components/effects/TypingRDF";
import { VIDEO, FALLBACK_TRIPLES } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 06 — 엣지 AI 시맨틱 변환 프로세스 (대표님 시연 시작)
// 좌: 원본 드론 피드 / 우: RDF Triple 실시간 타이핑
export default function S06_SemanticPipeline({
  meta,
  active,
  step,
}: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
              Live Demo · Semantic Conversion
            </div>
            <h2 className="mt-3 text-[52px] font-black tracking-heading text-fg leading-[1.1]">
              드론 영상 →{" "}
              <span className="text-accent">RDF Triple</span>
            </h2>
          </div>
          <div className="text-[20px] font-medium uppercase tracking-label text-fg-dim">
            Jetson Orin Nano · VLM 추론 · 28 FPS
          </div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-2 gap-10">
          {/* 좌측: 원본 드론 영상 */}
          <div className="flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[20px] font-medium uppercase tracking-label text-fg-muted">
                ● INPUT · EO/IR Frame
              </span>
              <span className="text-[20px] text-fg-muted">
                ~835 KB / frame
              </span>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded border border-border">
              <HlsVideo src={VIDEO.S06_DRONE_FEED} />
              {/* 탐지 박스 오버레이 (CSS-only 흉내) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={active && step >= 0 ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="pointer-events-none absolute left-[34%] top-[38%] h-[30%] w-[38%] border-2 border-accent"
              >
                <div className="absolute -top-6 left-0 bg-accent px-2 py-0.5 text-[20px] font-medium text-black">
                  2S19 Msta · 0.94
                </div>
              </motion.div>
            </div>
            <p className="mt-3 text-[20px] text-fg-dim">
              VLM 추론 결과 좌표·클래스·신뢰도 → 데이터 경량 전송 및 분석
            </p>
          </div>

          {/* 우측: RDF Triple 타이핑 */}
          <div className="flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[20px] font-medium uppercase tracking-label text-accent">
                ● OUTPUT · RDF Triple (JSON-LD)
              </span>
              <span className="text-[20px] text-fg-muted">
                ≈ 48 B / frame
              </span>
            </div>
            <div className="relative h-[460px] w-full overflow-hidden rounded border border-accent bg-bg p-6">
              {/* 터미널 헤더 */}
              <div className="mb-3 flex items-center border-b border-border pb-2 text-[20px] font-medium uppercase tracking-label text-fg-dim">
                <span>sdot-edge · triples.jsonld</span>
              </div>
              <TypingRDF
                triples={FALLBACK_TRIPLES}
                active={active && step >= 1}
                charDelay={22}
                tripleGap={350}
              />
            </div>
            <p className="mt-3 text-[20px] text-fg-dim">
              W3C 표준 RDF — C4I 체계에서 자동 해석·질의 가능
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
