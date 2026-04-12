"use client";

import clsx from "clsx";
import HlsVideo from "./HlsVideo";

// 슬라이드 배경 레이어 — HLS/로컬 영상 loop + dim overlay + 선택적 흑백
type Props = {
  slot?: string;
  src?: string;
  caption?: string;
  grayscale?: boolean;
  dim?: number;
  className?: string;
};

export default function MediaBackground({
  src,
  grayscale = false,
  dim = 0.6,
  className,
}: Props) {
  return (
    <div className={clsx("absolute inset-0", className)}>
      {src ? (
        <HlsVideo
          src={src}
          style={grayscale ? { filter: "grayscale(100%) brightness(0.7)" } : undefined}
        />
      ) : (
        <div className="h-full w-full bg-black" />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${dim})` }}
      />
    </div>
  );
}
