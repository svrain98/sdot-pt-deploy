"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 13 — 한계와 필요성: 완성이 아닌 필요성을 제안합니다
const GAPS = [
  {
    num: "01",
    title: "실 전장 데이터",
    en: "Real Battlefield Dataset",
    body: "이번 시연은 공개 OSINT(우크라이나 아우디우카) + 아카이브 영상 기반. 실 군 환경 데이터셋으로 학습·검증해야 mAP 0.85 목표 달성.",
    need: "국방데이터센터 · 사격장 획득 영상 공유 필요",
  },
  {
    num: "02",
    title: "C4I 실 연동",
    en: "ATCIS · KVMF Binding",
    body: "현재 RDF → JSON-LD → CBOR 까지 구현. ATCIS/KJCCS 실 연동은 보안구역 접근 권한 미확보로 보류.",
    need: "국방상호운용성센터 · KVMF 표준 협의 필요",
  },
  {
    num: "03",
    title: "온톨로지 표준화",
    en: "Military Ontology Standard",
    body: "MIL-STD-2525D 심볼은 표준화되었으나 행위·의도(intent) 온톨로지는 군·국방부 단위 합의 부재.",
    need: "육군 전투실험단 · 국방과학연구소 공동 정의 필요",
  },
];

export default function S13_Gaps({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
            Honest Gaps · 제안의 완성도가 아닌 필요성
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.3] text-fg">
            지금 없는 것 and
            <br />
            <span className="text-accent">앞으로 필요한 것</span>
          </h2>
        </div>

        {/* 3개 갭 카드 */}
        <div className="mt-10 grid flex-1 grid-cols-3 gap-8">
          {GAPS.map((g, i) => (
            <motion.div
              key={g.num}
              initial={{ opacity: 0, y: 40 }}
              animate={
                active && step >= i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative flex flex-col bg-bg-panel rounded-card border border-border p-8"
            >
              {/* 워터마크 숫자 */}
              <div className="absolute right-6 top-4 text-[96px] font-extrabold leading-none text-accent/10">
                {g.num}
              </div>

              {/* 영문 서브타이틀 */}
              <div className="text-[15px] font-medium uppercase tracking-label text-accent">
                {g.en}
              </div>

              {/* 카드 제목 */}
              <h3 className="mt-2 text-[24px] font-bold leading-tight text-fg">
                {g.title}
              </h3>

              {/* 본문 */}
              <p className="mt-6 flex-1 text-[15px] leading-[1.65] text-fg-muted">
                {g.body}
              </p>

              {/* 필요 사항 */}
              <div className="mt-6 border-t border-border pt-4 text-[16px] font-medium text-accent">
                → {g.need}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 인용 */}
        <div className="mt-8 border-t border-border pt-5 text-center text-[20px] text-fg-muted">
          &ldquo;기술이 완성되어 있기 때문이 아니라,{" "}
          <span className="font-bold text-accent">
            반드시 필요한 기술이기 때문에
          </span>{" "}
          — 함께 만들어 가야 합니다.&rdquo;
        </div>
      </div>
    </SlideFrame>
  );
}
