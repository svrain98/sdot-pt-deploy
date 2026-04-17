"use client";

import SlideFrame from "@/components/deck/SlideFrame";
import ComparisonTable from "@/components/charts/ComparisonTable";
import type { SlideProps } from "@/types/slide";

// 12 — 기존 영상전송 vs S-DOT 비교표 (ComparisonTable 컴포넌트 사용)
export default function S12_Comparison({ meta, active }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            Differentiation · 기존 체계와의 차별성
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.05] text-fg">
            Video Streaming →{" "}
            <span className="text-accent">Semantic</span>
          </h2>
        </div>

        {/* 비교 테이블 */}
        <div className="mt-12 flex-1 flex flex-col justify-center">
          <ComparisonTable
            beforeLabel="기존 영상전송"
            afterLabel="S-DOT"
            rows={[
              {
                axis: "전송 대상",
                before: "영상 자체 (H.264/265)",
                after: "온톨로지 핵심 정보 (RDF Triple)",
              },
              {
                axis: "전송 방식",
                before: "픽셀 데이터 압축 전송",
                after: "의미 기반 시맨틱 전송",
              },
              {
                axis: "요구 대역폭",
                before: "수 Mbps 이상",
                after: "수 Kbps (9.6 Kbps)",
              },
              {
                axis: "생존성",
                before: "재밍·통신두절 취약",
                after: "전자전 생존성 확보",
              },
              {
                axis: "정보 형태",
                before: "비정형 (자동화 불가)",
                after: "구조화 (C4I 자동 연동)",
              },
            ]}
            active={active}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
