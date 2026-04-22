"use client";

import clsx from "clsx";
import { useState } from "react";
import HlsVideo from "./HlsVideo";

// 실물 에셋이 없을 때 자동으로 SVG placeholder 로 폴백하는 미디어 래퍼
// - realPath 파일이 서버에 있으면 그대로 렌더
// - 없으면 onError 발동 → SVG placeholder (다크 그리드 + 브라켓 + 캡션)

type Props = {
  slot: string; // "S01_bg_drone_recon" 등 식별자
  kind: "image" | "video";
  src?: string; // public/ 기준 경로. undefined 면 항상 placeholder
  caption: string; // "드론 정찰 영상 loop — sdot-clip/04_recon.mp4"
  grayscale?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  initialHoldMs?: number; // PipelineZoomStage 에서 전달 — 현재 미사용
};

export default function PlaceholderMedia({
  slot,
  kind,
  src,
  caption,
  grayscale = false,
  loop = true,
  muted = true,
  autoPlay = true,
  className,
  fit = "cover",
}: Props) {
  const [failed, setFailed] = useState(false);
  const useFallback = !src || failed;

  const filterStyle = grayscale ? { filter: "grayscale(100%) brightness(0.7)" } : undefined;
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  if (useFallback) {
    return (
      <PlaceholderSVG
        slot={slot}
        kind={kind}
        caption={caption}
        className={className}
        grayscale={grayscale}
      />
    );
  }

  if (kind === "video") {
    return (
      <HlsVideo
        className={clsx("h-full w-full", objectFit, className)}
        src={src!}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        style={filterStyle}
      />
    );
  }

  return (
    <img
      className={clsx("h-full w-full", objectFit, className)}
      src={src}
      alt={caption}
      style={filterStyle}
      onError={() => setFailed(true)}
    />
  );
}

// SVG 기반 다크 플레이스홀더 — 그리드 배경 + 모서리 브라켓 + 슬롯 ID + 캡션
function PlaceholderSVG({
  slot,
  kind,
  caption,
  className,
  grayscale,
}: {
  slot: string;
  kind: "image" | "video";
  caption: string;
  className?: string;
  grayscale?: boolean;
}) {
  const accent = grayscale ? "#666666" : "#758c58";
  return (
    <div
      className={clsx(
        "relative h-full w-full overflow-hidden bg-black",
        className
      )}
    >
      {/* 그리드 패턴 */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${slot}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id={`grid-lg-${slot}`}
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#0a0a0a" />
        <rect width="100%" height="100%" fill={`url(#grid-${slot})`} />
        <rect width="100%" height="100%" fill={`url(#grid-lg-${slot})`} />
      </svg>

      {/* 모서리 브라켓 */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g stroke={accent} strokeWidth="0.3" fill="none">
          <path d="M 2 2 L 8 2 M 2 2 L 2 8" />
          <path d="M 98 2 L 92 2 M 98 2 L 98 8" />
          <path d="M 2 98 L 8 98 M 2 98 L 2 92" />
          <path d="M 98 98 L 92 98 M 98 98 L 98 92" />
        </g>
      </svg>

      {/* 중앙 캡션 */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="max-w-[80%] text-center">
          <div
            className="mb-3 inline-block rounded border px-3 py-1 font-mono text-[11px] font-black uppercase tracking-[0.2em]"
            style={{ color: accent, borderColor: accent }}
          >
            [{kind === "video" ? "VIDEO" : "IMAGE"} NEEDED]
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-fg-dim">
            Slot ID
          </div>
          <div className="mb-3 font-mono text-[14px] font-bold text-fg">
            {slot}
          </div>
          <div className="text-[11px] leading-relaxed text-fg-muted">
            {caption}
          </div>
        </div>
      </div>

    </div>
  );
}
