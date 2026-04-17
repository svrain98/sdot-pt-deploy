"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

type Gap = {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  contrast?: string;
  why: string;
  research: string;
};

// 17 — Next Step: 앞으로 필요한 것 — 3열 상세 카드
const GAPS: Gap[] = [
  {
    num: "01",
    title: "실 전장 데이터",
    subtitle: "공개 OSINT 기반 학습",
    body: "한국군 드론 센서·해상도·촬영 각도는 실 군 환경과 근본적으로 다름",
    why: "탐지 모델이 실전 신뢰도를 보장하지 못하면 온톨로지와 C4I 연동이 아무리 잘 돼도 전체 파이프라인이 무너질 수 있음",
    research: "실 데이터 기반 재학습·검증, Jetson Orin Nano 엣지 추론 최적화",
  },
  {
    num: "02",
    title: "군사 온톨로지 표준",
    subtitle: "미군 교리 및 MIL-STD-2525 기반",
    body: "한국군 교리·행동·의도 온톨로지 표준 없음",
    why: "'24년 미 DoD·CDAO가 BFO·CCO를 공식 표준으로 채택. 한국군이 같은 표준 위에 군 도메인 온톨로지를 구축하면 연합작전 시맨틱 연동 가능",
    research: "BFO(ISO/IEC 21838) 기반 한국군 군사 온톨로지 설계. CCO 확장. KJCCS 연동 프로토콜 개발",
  },
  {
    num: "03",
    title: "AI 개발 생태계",
    subtitle: "한국군 군사 부호 API 없음",
    body: "교리 비공개 또는 접근 제한. ATCIS 메시지 포맷 비공개.",
    contrast: "미군: MIL-STD-2525 API, FM 교리 전면 공개, BFO·CCO 오픈소스 → 이번 데모가 가능했던 이유",
    why: "공개 표준·데이터 없이는 민간·학계 협업 불가능, 국방 AI 혁신 속도 한계",
    research: "군사 부호 API · 교리 · 메시지 포맷 단계적 공개 및 표준화",
  },
];

export default function S17_NextStep({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            Next Step · 앞으로 필요한 것
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            Next Step
          </h2>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-3 gap-6">
          {GAPS.map((g, i) => (
            <motion.div
              key={g.num}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col bg-bg-panel rounded-card border border-border p-6 overflow-hidden"
            >
              {/* 워터마크 번호 */}
              <div className="absolute right-4 top-2 text-[96px] font-extrabold text-accent/10 leading-none select-none">
                {g.num}
              </div>

              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-[24px] font-bold text-fg">{g.title}</h3>
                <p className="mt-1 text-[20px] text-fg-dim">{g.subtitle}</p>

                <p className="mt-4 text-[20px] text-fg-muted leading-[1.5]">
                  {g.body}
                </p>

                {g.contrast && (
                  <p className="mt-3 text-[20px] text-fg-dim leading-[1.5]">
                    {g.contrast}
                  </p>
                )}

                <div className="mt-4 border-l-2 border-accent pl-4">
                  <p className="text-[20px] text-fg-muted leading-[1.5]">
                    {g.why}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-[20px] text-accent leading-[1.5]">
                    연구 방향: {g.research}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 border-t border-border pt-6 text-center"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-[24px] font-semibold text-fg">
            S-DOT은 군에 반드시 필요한 기술
          </p>
          <p className="mt-2 text-[22px] text-accent">
            함께 만들어 가야 합니다.
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
