"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 08 — 데모 구현 조건: 제약 나열 → 가능성 선언
const CONDITIONS = [
  { number: "01", title: "전투 데이터", desc: "아우디우카 전투 공개 출처 데이터 (러시아-우크라이나전)" },
  { number: "02", title: "교리", desc: "공개 미군 교리 · 군사 부호 표준(MIL-STD-2525)" },
  { number: "03", title: "온톨로지", desc: "Palantir Foundry 16개 전장 객체 타입" },
  { number: "04", title: "C4I 체계", desc: "Palantir AIP(AI Platform)" },
];

export default function S08_DemoConditions({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            IMPLEMENTATION · 데모 구현 및 확장 가능성
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            데모 구현 및 한국군 확장 가능성
          </h2>
        </div>

        {/* 본문 — 순차 자동 등장 */}
        <div className="mt-10 flex flex-col gap-6 flex-1 justify-center">
          {CONDITIONS.map((c, i) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, x: -30 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="flex items-baseline gap-6"
            >
              <span className="text-[54px] font-extrabold text-accent leading-none w-[90px] shrink-0">
                {c.number}
              </span>
              <span className="text-[44px] font-bold text-fg">
                {c.title}
              </span>
              <span className="text-[36px] text-fg-muted">
                — {c.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 하단 가능성 선언 — 처음엔 흐리게, step 1에 선명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: step >= 1 ? 1 : 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-bg-panel rounded-card border border-accent/30 p-7 text-center"
        >
          <p className="text-[44px] text-fg-muted leading-[1.2]">
            한국군 전투 데이터 · 교리 · 온톨로지 · C4I 체계 적용 시
          </p>
          <p className="mt-2 text-[44px] font-bold text-accent">
            동일한 방식으로 실전 확장이 가능합니다.
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
