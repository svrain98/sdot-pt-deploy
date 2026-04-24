"use client";

import clsx from "clsx";
import HlsVideo from "./HlsVideo";

// 슬라이드 배경 레이어 — HLS/로컬 영상 loop + dim overlay + 선택적 흑백
// startSeconds/endSeconds 로 한 영상의 특정 구간만 loop 재생 가능
// (예: 슬라이드 18 — scenario_part2.mp4 의 0~4초)
type Props = {
  slot?: string;
  src?: string;
  caption?: string;
  grayscale?: boolean;
  dim?: number;
  className?: string;
  startSeconds?: number;
  endSeconds?: number;
  initialHoldMs?: number;
  // sideMask: 한쪽 면에만 진한 overlay 를 그라디언트로 깔고 반대편은 영상 노출
  // (텍스트 가독성 + 영상 가시성을 동시에 확보)
  sideMask?: "left" | "right" | "top" | "bottom" | "none";
  sideMaskWidth?: string; // 예: "55%"
  sideMaskStrength?: number; // 0~1 — 그라디언트 시작부 검정 불투명도
  // step 기반 영상 제어 (S17/S18 리허설 플로우)
  paused?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  // 재생 속도 배율 (1 = 기본)
  playbackRate?: number;
};

export default function MediaBackground({
  src,
  grayscale = false,
  dim = 0.6,
  className,
  startSeconds,
  endSeconds,
  initialHoldMs,
  sideMask = "none",
  sideMaskWidth = "55%",
  sideMaskStrength = 0.78,
  paused,
  loop,
  onEnded,
  playbackRate,
}: Props) {
  return (
    <div className={clsx("absolute inset-0", className)}>
      {src ? (
        <HlsVideo
          src={src}
          startSeconds={startSeconds}
          endSeconds={endSeconds}
          initialHoldMs={initialHoldMs}
          paused={paused}
          loop={loop}
          onEnded={onEnded}
          playbackRate={playbackRate}
          style={grayscale ? { filter: "grayscale(100%) brightness(0.7)" } : undefined}
        />
      ) : (
        <div className="h-full w-full bg-black" />
      )}
      {/* 기본 uniform dim — 아주 옅게 유지 */}
      {dim > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${dim})` }}
        />
      )}
      {/* 한쪽 방향 그라디언트 mask — 텍스트 영역만 진한 블랙 */}
      {sideMask !== "none" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: buildGradient(sideMask, sideMaskWidth, sideMaskStrength),
          }}
        />
      )}
    </div>
  );
}

function buildGradient(
  dir: "left" | "right" | "top" | "bottom",
  width: string,
  strength: number,
): string {
  const toKeyword: Record<string, string> = {
    left: "to right",
    right: "to left",
    top: "to bottom",
    bottom: "to top",
  };
  return `linear-gradient(${toKeyword[dir]}, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength}) 20%, rgba(0,0,0,0) ${width})`;
}
