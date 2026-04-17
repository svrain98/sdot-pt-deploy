"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 05 — S-DOT 3레이어 개념도: Edge · Network · C2
const LAYERS = [
  {
    code: "L1",
    name: "Edge",
    korean: "엣지 레이어",
    duties: [
      "YOLO 기반 객체·행위 탐지",
      "NPU (Jetson Orin Nano · RPi 5)",
      "시맨틱 변환 (온톨로지 매핑)",
    ],
    tech: "YOLOv10n · Ollama Gemma 4",
  },
  {
    code: "L2",
    name: "Network",
    korean: "네트워크 레이어",
    duties: [
      "RDF Triple → CBOR 바이너리",
      "COSE 서명 (무결성 · 부인방지)",
      "헤더 오버헤드 최소화",
    ],
    tech: "MQTT · KVMF 호환",
  },
  {
    code: "L3",
    name: "C2",
    korean: "C2 레이어",
    duties: [
      "시맨틱 디코딩 · 자동 MIL-STD-2525 도시",
      "AI 추천 (Weapon–Target Matching)",
      "필요 시 GenAI 복원",
    ],
    tech: "Palantir Maven · TAK",
  },
];

export default function S05_Concept({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            System Concept · 3-Layer Architecture
          </div>
          <h2 className="mt-4 text-[56px] font-black tracking-heading text-fg leading-[1.1]">
            S-DOT 시스템 개념도
          </h2>
        </div>

        <div className="mt-12 flex flex-1 items-center gap-6">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.code}
              initial={{ opacity: 0, y: 40 }}
              animate={
                active && step >= i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="bg-bg-panel rounded-card border border-accent p-8 flex h-[460px] flex-col">
                <div className="text-[40px] font-medium uppercase tracking-label text-accent">
                  {l.code}
                </div>
                <h3 className="mt-2 text-[30px] font-bold text-fg leading-tight">
                  {l.name}
                </h3>
                <p className="text-[28px] text-fg-muted">{l.korean}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {l.duties.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[24px] text-fg-muted"
                    >
                      <span className="mt-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-border pt-4 text-[20px] font-medium uppercase tracking-label text-fg-dim">
                  {l.tech}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 파이프라인 화살표 */}
        <motion.div
          className="mt-2 flex items-center justify-center gap-4 text-[28px] font-medium uppercase tracking-label text-fg-muted"
          initial={{ opacity: 0 }}
          animate={active && step >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span>Video (MB)</span>
          <span className="text-accent">→</span>
          <span>RDF (Byte)</span>
          <span className="text-accent">→</span>
          <span>Decision (sec)</span>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
