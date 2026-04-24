"use client";

import { useRef, useEffect } from "react";
import Hls from "hls.js";
import clsx from "clsx";
import { useDeckStore } from "@/lib/store";

// HLS(.m3u8) + 일반 영상(.mp4/.mov) 모두 지원하는 비디오 컴포넌트
// Cloudflare Stream URL은 HLS로, 로컬 파일은 네이티브로 재생
// startSeconds / endSeconds 로 특정 구간만 반복 재생하도록 할 수 있음
// (예: 슬라이드 18 — scenario_part2.mp4 의 0~4초만 loop)
// initialHoldMs : 영상 첫 프레임에서 일정 시간 멈춘 뒤 재생 시작 (예: S11 edge — 2000ms)
// paused       : 외부 step 상태로 영상을 pause/resume 제어 (S17/S18 리허설 플로우)
// onEnded      : 영상이 자연히 끝났을 때 호출 (loop=false 일 때만 의미 있음)
// 전역 `bgVideoPaused` 상태 (store) 를 구독 → V 키로 일시정지/재생 토글
type Props = {
  src: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  startSeconds?: number; // 영상 시작 위치 (초)
  endSeconds?: number;   // 영상 종료 위치 (초) — loop=true 면 startSeconds 로 되감기
  initialHoldMs?: number; // 마운트 직후 영상을 초기 프레임에서 멈추는 시간 (ms)
  style?: React.CSSProperties;
  // 이 영상이 전역 V 키 일시정지 토글을 따를지 여부 (기본 true — 배경 영상은 대부분 따름)
  respectGlobalPause?: boolean;
  // 외부에서 step-based pause/resume 제어 (S17/S18 리허설 플로우).
  // true 면 현재 프레임에서 멈춤. false 로 돌아오면 재생 재개.
  paused?: boolean;
  // 영상이 자연히 끝났을 때 호출 (loop=false + endSeconds 미설정 시).
  onEnded?: () => void;
  // 재생 속도 배율 (1 = 기본). 예: 1.5 → 1.5배속
  playbackRate?: number;
};

export default function HlsVideo({
  src,
  className,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  startSeconds,
  endSeconds,
  initialHoldMs,
  style,
  respectGlobalPause = true,
  paused = false,
  onEnded,
  playbackRate,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const bgVideoPaused = useDeckStore((s) => s.bgVideoPaused);
  // paused/onEnded 는 매 렌더마다 바뀔 수 있으므로 ref 로 최신값 유지 — 비디오 setup effect 을
  // src/startSeconds 에만 묶어두기 위함.
  const pausedRef = useRef(paused);
  const onEndedRef = useRef(onEnded);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = src.includes(".m3u8");
    let holdTimer: number | undefined;

    // 시작 재생 로직 — initialHoldMs 가 있으면 해당 시간 동안 멈춘 후 play
    // paused=true 면 재생하지 않고 첫 프레임에서 멈춘 상태로 유지
    const startPlay = () => {
      if (!autoPlay) return;
      if (pausedRef.current) {
        // 외부에서 이미 pause 요구 — 첫 프레임 노출만
        video.pause();
        return;
      }
      if (initialHoldMs && initialHoldMs > 0) {
        // 처음 프레임에서 멈춘 상태로 노출 — pause 후 setTimeout 으로 재생
        video.pause();
        holdTimer = window.setTimeout(() => {
          if (!pausedRef.current) video.play().catch(() => {});
        }, initialHoldMs);
      } else {
        video.play().catch(() => {});
      }
    };

    // endSeconds 처리 — 재생 위치가 endSeconds 를 넘으면 되감기(loop) 또는 일시정지
    // loop=false 이고 endSeconds 가 있으면 멈춤 + onEnded 호출
    const onTimeUpdate = () => {
      if (endSeconds == null) return;
      if (video.currentTime >= endSeconds) {
        if (loop) {
          video.currentTime = startSeconds ?? 0;
          if (autoPlay && !pausedRef.current) video.play().catch(() => {});
        } else {
          video.pause();
          onEndedRef.current?.();
        }
      }
    };

    // 네이티브 ended 이벤트 (endSeconds 없이 파일 끝까지 재생된 경우)
    const onNativeEnded = () => {
      onEndedRef.current?.();
    };

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
        startPlay();
      });
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onNativeEnded);

      return () => {
        if (holdTimer) window.clearTimeout(holdTimer);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onNativeEnded);
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (isHls && video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari 네이티브 HLS
      video.src = src;
      const onLoaded = () => {
        if (startSeconds) video.currentTime = startSeconds;
        startPlay();
      };
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onNativeEnded);
      return () => {
        if (holdTimer) window.clearTimeout(holdTimer);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onNativeEnded);
      };
    } else {
      // 일반 mp4/mov — 로컬 파일
      video.src = src;
      const onLoaded = () => {
        if (startSeconds) video.currentTime = startSeconds;
        startPlay();
      };
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onNativeEnded);
      return () => {
        if (holdTimer) window.clearTimeout(holdTimer);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onNativeEnded);
      };
    }
  }, [src, startSeconds, endSeconds, autoPlay, loop, initialHoldMs]);

  // 전역 bgVideoPaused 토글 반영
  useEffect(() => {
    if (!respectGlobalPause) return;
    const video = videoRef.current;
    if (!video) return;
    if (bgVideoPaused) {
      video.pause();
    } else if (!pausedRef.current) {
      // 외부 step pause 가 걸려있지 않을 때만 자동재생 복구
      video.play().catch(() => {});
    }
  }, [bgVideoPaused, respectGlobalPause]);

  // 외부 paused prop 반영 — step 기반 재생/정지
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) {
      video.pause();
    } else {
      // 전역 V 키 pause 가 걸려있지 않을 때만 재생
      if (!bgVideoPaused) video.play().catch(() => {});
    }
  }, [paused, bgVideoPaused]);

  // 재생 속도 반영 — src 가 바뀌면 element 가 재생성되므로 매 렌더마다 동기화
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (typeof playbackRate === "number" && playbackRate > 0) {
      video.playbackRate = playbackRate;
    } else {
      video.playbackRate = 1;
    }
  }, [playbackRate, src]);

  return (
    <video
      ref={videoRef}
      className={clsx("h-full w-full object-cover", className)}
      muted={muted}
      loop={loop && endSeconds == null /* endSeconds 가 있으면 수동 loop */}
      playsInline={playsInline}
      style={style}
    />
  );
}
