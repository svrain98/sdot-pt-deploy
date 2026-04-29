"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 05 — AI 기반 임무형 지휘: 의미 기반 전송
// steps: 2

const CASES = [
  {
    label: "SemFil-P",
    sub: "MILCOM 2024 | 세계 최대 군 통신 학술대회",
    cause: "시맨틱 필터링",
    effect: "전술망 트래픽 대폭 절감",
  },
  {
    label: "NGC2 · AIDP",
    sub: "미 육군 | AI 기반 차세대 지휘통제 실증 프로그램",
    cause: "AI가 핵심 데이터 선별",
    effect: "결심 지원",
  },
  {
    label: "Maven Smart System",
    sub: "미 국방부 | AI 드론 영상 자동 분석",
    cause: "드론 영상 분석 12시간",
    effect: "1분 미만 단축",
  },
];

export default function S05_TacticalAI({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">

        {/* ① 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            CHALLENGE · 한계 및 도전과제
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            데이터의 홍수: {" "}
            <span className="text-accent">핵심 선별의 필요성</span>
          </h2>
        </div>

        {/* ② 중단 2열 */}
        <motion.div
          className="mt-3 flex-1 grid grid-cols-2 gap-14 min-h-0"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* 좌 — 배지 박스 + 인용(박스 없음) + 출처 */}
          {/* <div className="flex flex-col justify-start gap-5"> */}
          <div className="flex flex-col justify-start gap-5 pt-14">
            {/* 배지만 박스 */}
            <div className="inline-flex items-center gap-4 border border-accent/40 rounded-card px-5 py-3 self-start">
              <span className="text-[22px] font-semibold tracking-wide text-accent uppercase">
                PARAMETERS 2025
              </span>
              <span className="w-px h-4 bg-fg-muted/60" />
              <span className="text-[22px] text-fg-muted">
                미 육군 전쟁대학 공식 학술저널
              </span>
            </div>

            {/* 인용 + 해석 — 박스 없이 배경 위에 직접 */}
            <div className="border-l-4 border-accent pl-6">
              {/* 학술 인용 */}
              <p className="text-[38px] text-fg leading-[1.55] font-medium">
                &ldquo;더 많은 정보가 더 나은 결심을 보장하지 않는다&rdquo;
              </p>
              {/* 발표자 해석 */}
              <p className="mt-3 text-[34px] text-fg-muted leading-[1.5]">
                AI 기반 핵심 정보 선별·정제(Data Curation)가<br />
                지휘 결심을 가능하게 한다
              </p>
            </div>

            {/* 출처 — 박스 없이 */}
            <p className="text-[18px] text-fg-dim leading-[1.5]">
              Matei &amp; Reed, &ldquo;Mission Command&apos;s Asymmetric Advantage
              Through AI-Driven Data Management&rdquo;
            </p>
          </div>

          {/* 우 — 그래프 */}
          <div className="flex flex-col min-h-0 items-center justify-center">
            <div className="w-[84%] flex flex-col overflow-hidden">
              <svg
                viewBox="0 0 280 200"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "hidden" }}
              >
                <defs>
                  <pattern id="s05h" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(239,108,108,0.55)" strokeWidth="1.5" />
                  </pattern>
                  <clipPath id="s05oc">
                    <path d="M 190,36 C 230,36 270,130 330,180 L 330,185 L 190,185 Z" />
                  </clipPath>
                  <clipPath id="s05cc">
                    <rect x="0" y="0" width="280" height="200" />
                  </clipPath>
                </defs>

                {/* === 축: 클립 없음 === */}
                {/* Y축 */}
                <line x1="50" y1="28" x2="50" y2="185" stroke="rgb(110,110,110)" strokeWidth="1.5" />
                <path d="M 50,28 L 46,36 L 54,36 Z" fill="rgb(110,110,110)" />
                {/* X축 */}
                <line x1="50" y1="185" x2="272" y2="185" stroke="rgb(110,110,110)" strokeWidth="1.5" />
                <path d="M 272,185 L 264,181 L 264,189 Z" fill="rgb(110,110,110)" />

                {/* 축 라벨 */}
                <text x="2" y="50" fill="rgb(165,165,165)" fontSize="11" fontWeight="500" textAnchor="start">
                  결심의 질
                </text>
                <text x="260" y="198" fill="rgb(165,165,165)" fontSize="11" fontWeight="500" textAnchor="end">
                  정보의 양
                </text>

                {/* === 커브·채우기·빗금: 클립 적용 === */}
                <g clipPath="url(#s05cc)">
                  {/* 정상 영역 */}
                  <path d="M 50,185 C 95,185 130,48 190,36 L 190,185 Z" fill="rgba(163,194,99,0.17)" />
                  {/* 과부하 영역 */}
                  <path d="M 190,36 C 230,36 270,130 330,180 L 330,185 L 190,185 Z" fill="rgba(239,108,108,0.14)" />
                  {/* 빗금 */}
                  <rect x="0" y="0" width="360" height="210" fill="url(#s05h)" clipPath="url(#s05oc)" />

                  {/* 메인 곡선 */}
                  <path
                    d="M 50,185 C 95,185 130,42 190,36 C 235,32 275,130 330,178"
                    fill="none" stroke="rgb(228,228,228)" strokeWidth="2.5" strokeLinecap="round"
                  />

                  {/* 피크 점선 */}
                  <line x1="190" y1="36" x2="190" y2="185" stroke="rgb(163,194,99)" strokeWidth="1.5" strokeDasharray="5,4" />
                  <circle cx="190" cy="36" r="5" fill="rgb(163,194,99)" />

                  {/* 정보 과부하 박스 */}
                  <rect x="200" y="120" width="68" height="38" rx="3"
                    fill="rgba(18,18,18,0.85)" stroke="rgb(239,108,108)" strokeWidth="1.3" />
                  <text x="234" y="138" fill="rgb(239,108,108)" fontSize="12" fontWeight="700" textAnchor="middle">
                    정보
                  </text>
                  <text x="234" y="150" fill="rgb(239,108,108)" fontSize="12" fontWeight="700" textAnchor="middle">
                    과부하
                  </text>
                </g>
              </svg>

              {/* 그래프 하단 캡션 */}
              <div className="text-right mt-3">
                <p className="text-[20px] text-fg-muted mt-1">
                  Eppler &amp; Mengis, 2004
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ③ 실증 사례 3열 — 처음엔 흐리게(0.15), step 1에 선명 (S04 방식) */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 14 }}
          animate={active
            ? { opacity: step >= 1 ? 1 : 0.15, y: 0 }
            : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CASES.map((item) => (
            <div key={item.label} className="bg-bg-panel rounded-card border border-border p-8 flex flex-col">
              <h3 className="text-[32px] font-bold text-accent leading-none">{item.label}</h3>
              <p className="mt-2 text-[24px] text-fg-dim">{item.sub}</p>
              <p className="mt-4 text-[28px] text-fg-muted leading-[1.5]">
                {item.cause}{" "}
                <span className="font-bold text-accent">→</span> {item.effect}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </SlideFrame>
  );
}
