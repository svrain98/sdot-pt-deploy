"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDeckStore } from "@/lib/store";
import { SLIDE_META } from "@/lib/slide-meta";
import { SLIDES } from "@/components/slides";
import PresenterHUD from "@/components/deck/PresenterHUD";
import SlideJumpBar from "@/components/deck/SlideJumpBar";
import PipelineZoomStage, { getPipelineMode } from "@/components/effects/PipelineZoomStage";

// 뷰포트를 1920×1080 기준으로 스케일 피팅 (발표용 공통 트릭)
function useStageScale() {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const update = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function Deck() {
  const scale = useStageScale();
  const stageRef = useRef<HTMLDivElement>(null);

  const currentSlide = useDeckStore((s) => s.currentSlide);
  const currentStep = useDeckStore((s) => s.currentStep);
  const setSlide = useDeckStore((s) => s.setSlide);
  const nextStep = useDeckStore((s) => s.nextStep);
  const prevStep = useDeckStore((s) => s.prevStep);
  const goNext = useDeckStore((s) => s.goNext);
  const goPrev = useDeckStore((s) => s.goPrev);
  const togglePresenter = useDeckStore((s) => s.togglePresenter);
  const toggleJumpBar = useDeckStore((s) => s.toggleJumpBar);
  const jumpBarOpen = useDeckStore((s) => s.jumpBarOpen);
  const startTimer = useDeckStore((s) => s.startTimer);
  const setTotalSlides = useDeckStore((s) => s.setTotalSlides);

  // 슬라이드 총 개수 초기화
  useEffect(() => {
    setTotalSlides(SLIDE_META.length);
  }, [setTotalSlides]);

  // 키보드 네비게이션 — 문서 참조: 기획서 § 핵심 설계 세부사항 2
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // JumpBar 열려 있을 때 1~9는 슬라이드 점프
      if (jumpBarOpen) {
        if (e.key >= "1" && e.key <= "9") {
          e.preventDefault();
          const idx = parseInt(e.key, 10) - 1;
          setSlide(idx);
          return;
        }
        if (e.key === "0") {
          e.preventDefault();
          setSlide(9);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          toggleJumpBar();
          return;
        }
      }

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          startTimer();
          nextStep(SLIDE_META[currentSlide]?.steps ?? 1);
          break;
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          prevStep();
          break;
        case "ArrowDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          setSlide(0);
          break;
        case "End":
          e.preventDefault();
          setSlide(SLIDE_META.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        case "p":
        case "P":
          e.preventDefault();
          togglePresenter();
          break;
        case "g":
        case "G":
          e.preventDefault();
          toggleJumpBar();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    currentSlide,
    jumpBarOpen,
    setSlide,
    nextStep,
    prevStep,
    goNext,
    goPrev,
    togglePresenter,
    toggleJumpBar,
    startTimer,
  ]);

  const meta = SLIDE_META[currentSlide];
  const SlideComponent = SLIDES[currentSlide];
  const pipelineMode = getPipelineMode(currentSlide);

  return (
    <>
      <div
        ref={stageRef}
        className="slide-stage"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/* 파이프라인 줌 persistent 레이어 — S10~S15 에서만 mount */}
        {pipelineMode && <PipelineZoomStage mode={pipelineMode} />}

        {SlideComponent && meta && (
          <SlideComponent
            active={true}
            step={currentStep}
            meta={meta}
          />
        )}
      </div>

      <PresenterHUD />
      {jumpBarOpen && <SlideJumpBar />}

      {/* 좌하단 미니 힌트 — 발표 시작 전에만 보임 */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-40 text-[10px] uppercase tracking-[0.2em] text-fg-dim">
        ← → Space · F Fullscreen · P HUD · G Jump
      </div>
    </>
  );
}
