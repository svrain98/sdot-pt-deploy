"use client";

import { useRef, useEffect } from "react";
import Hls from "hls.js";
import clsx from "clsx";

// HLS(.m3u8) + 일반 영상(.mp4/.mov) 모두 지원하는 비디오 컴포넌트
// Cloudflare Stream URL은 HLS로, 로컬 파일은 네이티브로 재생
type Props = {
  src: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  startSeconds?: number; // 영상 시작 위치 (초)
  style?: React.CSSProperties;
};

export default function HlsVideo({
  src,
  className,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  startSeconds,
  style,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = src.includes(".m3u8");

    if (isHls && Hls.isSupported()) {
      // HLS.js 사용
      const hls = new Hls({
        enableWorker: true,
        startPosition: startSeconds ?? -1,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (isHls && video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari 네이티브 HLS
      video.src = src;
      const onLoaded = () => {
        if (startSeconds) video.currentTime = startSeconds;
        if (autoPlay) video.play().catch(() => {});
      };
      video.addEventListener("loadedmetadata", onLoaded);
      return () => video.removeEventListener("loadedmetadata", onLoaded);
    } else {
      // 일반 mp4/mov — 로컬 파일
      video.src = src;
      const onLoaded = () => {
        if (startSeconds) video.currentTime = startSeconds;
        if (autoPlay) video.play().catch(() => {});
      };
      video.addEventListener("loadedmetadata", onLoaded);
      return () => video.removeEventListener("loadedmetadata", onLoaded);
    }
  }, [src, startSeconds, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={clsx("h-full w-full object-cover", className)}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      style={style}
    />
  );
}
