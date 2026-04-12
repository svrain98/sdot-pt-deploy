import type { ComponentType } from "react";

// 발표자 구분 — Presenter HUD 배지 및 색상에 사용
export type Presenter = "instructor" | "ceo" | "none";

// 슬라이드 메타데이터 (카탈로그용)
export type SlideMeta = {
  id: string; // "S01", "S02", ...
  number: number; // 1-indexed
  title: string; // 한국어 타이틀
  subtitle?: string;
  presenter: Presenter;
  duration: string; // "30s", "1'30\""
  steps: number; // click-to-reveal 단계 수 (1 = 단순 페이지)
  notes?: string; // Presenter HUD 노트
};

// 각 슬라이드 컴포넌트 공통 props
export type SlideProps = {
  active: boolean; // 현재 렌더 중인 슬라이드인지
  step: number; // 현재 click-to-reveal 스텝 (0-indexed)
  meta: SlideMeta;
};

export type SlideModule = {
  meta: SlideMeta;
  Component: ComponentType<SlideProps>;
};
