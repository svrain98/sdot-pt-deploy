"use client";

import { AnimatePresence, motion } from "framer-motion";
import PlaceholderMedia from "./PlaceholderMedia";
import { IMAGE, VIDEO } from "@/lib/assets";

// S-DOT 파이프라인 줌 스테이지
// ─ Deck 레벨에서 persistent 하게 mount 되어 슬라이드 10~15 사이를 연속된 장면으로 연출.
// ─ mode 에 따라 4박스 overview 이미지를 scale/translate 로 zoom,
//   zoom 상태에서는 상세 이미지를 overlay 로 fade-in.
// ─ 슬라이드 전환 = 장면 전환이 아닌 "확대 ↔ 복귀" 로 보이게 하는 게 목적.
//
// 2026-04-19 업데이트
// ─ 상단 chrome 과 겹치지 않도록 전체 stage 를 아래로 shift (CHROME_OFFSET_PX)
// ─ Edge 확대 overlay 는 정지 이미지 대신 drone_semantic.mp4 영상을 재생
// ─ AIP 상세 이미지는 너무 길어서 축소 대신 세로 스크롤 지원 (contentMode: "scrollY")

export type PipelineMode = "overview" | "edge" | "foundry" | "aip";

// 상단 chrome(S-DOT · 슬라이드 카운터 @ top:80px) 과 겹치지 않도록 stage 전체를 내림
const CHROME_OFFSET_PX = 120;

// 각 모드별 줌 타깃 (overview 이미지 기준 % 좌표)
// ※ 24" 16:9 모니터(~53×30cm) 기준으로 cm 단위 보정:
//   edge    → 5cm 좌(-9.4%), 3cm 상(-10%) 이동
//   foundry → 2cm 좌(-3.8%) 추가 이동
//   aip     → 3cm 우(+5.7%) + 3cm 우(+5.7%) 추가 = 총 +11.4% 이동
const MODE_TRANSFORM: Record<
  PipelineMode,
  { scale: number; originX: string; originY: string }
> = {
  overview: { scale: 1.0, originX: "50%", originY: "50%" },
  edge: { scale: 2.8, originX: "3%", originY: "40%" },
  foundry: { scale: 2.8, originX: "33.7%", originY: "50%" },
  // AIP + 결심 출력 → 오른쪽 두 박스 동시 확대 (box 3+4 중앙, 누적 +11.4%)
  aip: { scale: 1.85, originX: "86.4%", originY: "50%" },
};

// 각 줌 모드에서 fade-in 되는 상세 콘텐츠 메타
// contentMode:
//   - "video"   : PlaceholderMedia(kind=video) 로 영상 loop 재생 (edge)
//   - "image"   : fit=contain 단순 이미지 (foundry)
//   - "scrollY" : 긴 세로 이미지 — 스크롤 가능한 컨테이너 안에 full-width 로 렌더 (aip)
type OverlayMeta = {
  src: string;
  slot: string;
  caption: string;
  contentMode: "video" | "image" | "scrollY";
  initialHoldMs?: number; // 영상 전용 — 첫 프레임 hold (ms)
};
const OVERLAY_META: Record<Exclude<PipelineMode, "overview">, OverlayMeta> = {
  edge: {
    src: VIDEO.DRONE_SEMANTIC,
    slot: "S11_drone_semantic_video",
    caption: "Edge · 드론 영상 → 온톨로지 데이터 (Gemini 2.5 Flash VLM)",
    contentMode: "video",
    // 슬라이드 11 진입 시 첫 프레임에서 2초 멈췄다가 재생 — "찰나의 정지" 연출
    initialHoldMs: 2000,
  },
  foundry: {
    src: IMAGE.PIPELINE_FOUNDRY,
    slot: "S13_pipeline_foundry",
    caption: "Foundry Ontology · 16 Object Types 연결 그래프",
    contentMode: "image",
  },
  aip: {
    src: IMAGE.PIPELINE_AIP,
    slot: "S15_pipeline_aip",
    caption: "AIP Logic 5단계 + 지휘관 결심 지원",
    contentMode: "scrollY",
  },
};

type Props = {
  mode: PipelineMode;
};

export default function PipelineZoomStage({ mode }: Props) {
  const t = MODE_TRANSFORM[mode];
  const overlay = mode === "overview" ? null : OVERLAY_META[mode];

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-bg-slide"
      // 상단 chrome 이 차지하는 영역만큼 stage 전체를 아래로 내려서
      // overview 이미지가 chrome 의 가로 라인과 겹치지 않게 한다.
      style={{ paddingTop: CHROME_OFFSET_PX }}
    >
      {/* (1) 4박스 파이프라인 overview — 항상 한 번만 마운트 되고 scale 만 애니메이션 */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 flex items-center justify-center"
        style={{
          top: CHROME_OFFSET_PX,
          transformOrigin: `${t.originX} ${t.originY}`,
        }}
        animate={{ scale: t.scale }}
        transition={{
          duration: 1.1,
          // ease-out-expo 느낌 — 시작은 빠르고 끝은 부드럽게
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <PlaceholderMedia
          slot="S10_pipeline_overview"
          kind="image"
          src={IMAGE.PIPELINE_OVERVIEW}
          caption="S-DOT 전체 파이프라인 — ISR · Foundry · AIP · Decision Support (4단계)"
          fit="contain"
        />
      </motion.div>

      {/* (2) zoom 상태일 때 해당 박스의 상세 컨텐츠를 fade-in overlay */}
      {/*    zoom 애니메이션이 ~0.55초에 도달한 뒤 overlay 가 뜨도록 delay.
            결과 배경은 순수 블랙 — 뒤의 줌된 pipeline 이미지를 완전히 가림 */}
      <AnimatePresence mode="wait">
        {overlay && (
          <motion.div
            key={mode}
            className="absolute left-0 right-0 bottom-0 flex items-center justify-center bg-black"
            style={{ top: CHROME_OFFSET_PX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.55, // zoom in 과 겹치지 않고 도착 후 덧입혀지는 타이밍
            }}
          >
            <OverlayContent overlay={overlay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* (3) 상단 chrome 영역 보호 — overview 확대(scale 2.8)로 이미지가 위로 삐져나오는 걸
             항상 순수 블랙으로 덮어 S-DOT 타이틀바 근처의 파이프라인 fragment 잘림 방지.
             DOM 순서상 마지막이라 같은 stacking context 내 위에 그려지고,
             pointer-events-none 으로 상단 chrome 의 클릭성은 유지 */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 bg-black"
        style={{ height: CHROME_OFFSET_PX }}
      />
    </div>
  );
}

function OverlayContent({ overlay }: { overlay: OverlayMeta }) {
  // scrollY 모드 — 긴 AIP 이미지를 축소하지 않고 세로 스크롤로 전체 보기
  //   globals.css 의 `* { scrollbar-width: none }` 가 스크롤바를 전역으로 숨기고
  //   있어서, .aip-scroll 클래스로 스크롤바를 다시 살린다.
  //   pointer-events 는 SlideFrame(transparent) 가 none 으로 내려보내서 wheel 이
  //   이 div 까지 전달되는 상태.
  if (overlay.contentMode === "scrollY") {
    return (
      <div
        className="aip-scroll relative h-[90%] w-[88%] overflow-y-auto overflow-x-hidden rounded-card border border-border bg-black"
      >
        {/* 실제 파일이 없을 땐 PlaceholderMedia 가 SVG 폴백을 그리므로 fit="cover" 로 컨테이너 채우기 */}
        <img
          src={overlay.src}
          alt={overlay.caption}
          className="block w-full h-auto"
          onError={(e) => {
            // 이미지 로드 실패 시 placeholder fallback — PlaceholderMedia 흉내
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const parent = (e.currentTarget as HTMLImageElement).parentElement;
            if (parent && !parent.querySelector(".fallback-ph")) {
              const ph = document.createElement("div");
              ph.className = "fallback-ph";
              ph.style.cssText =
                "min-height:100%;width:100%;display:flex;align-items:center;justify-content:center;color:#758c58;font-family:monospace;font-size:14px;letter-spacing:0.2em;";
              ph.textContent = `[IMAGE NEEDED] ${overlay.slot}`;
              parent.appendChild(ph);
            }
          }}
        />
        {/* 스크롤 힌트 — 우측 하단에 살짝 깜빡이는 화살표 */}
        <div className="pointer-events-none sticky bottom-4 ml-auto mr-4 w-fit animate-pulse rounded-full border border-accent/60 bg-black/80 px-3 py-1 font-mono text-[14px] tracking-label text-accent">
          ↓ scroll
        </div>
      </div>
    );
  }

  // video / image — 기존 88% 박스 안에 contain 배치
  return (
    <div className="relative h-[88%] w-[88%]">
      <PlaceholderMedia
        slot={overlay.slot}
        kind={overlay.contentMode === "video" ? "video" : "image"}
        src={overlay.src}
        caption={overlay.caption}
        fit="contain"
        initialHoldMs={overlay.initialHoldMs}
      />
    </div>
  );
}

// 슬라이드 인덱스(0-based) → mode 매핑.
// Deck.tsx 에서 호출 — null 이면 파이프라인 레이어를 unmount.
// S09(데모 시나리오)가 KPI 뒤로 이동하면서 S10~S15 가 index 8~13 으로 당겨짐
export function getPipelineMode(slideIndex: number): PipelineMode | null {
  switch (slideIndex) {
    case 8:  // S10: 전체 파이프라인 overview
      return "overview";
    case 9:  // S11: Edge 확대
      return "edge";
    case 10: // S12: 복귀
      return "overview";
    case 11: // S13: Foundry 확대
      return "foundry";
    case 12: // S14: 복귀
      return "overview";
    case 13: // S15: AIP + 결심 확대
      return "aip";
    default:
      return null;
  }
}
