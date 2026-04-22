"use client";

import { create } from "zustand";

type DeckState = {
  currentSlide: number; // 0-indexed
  currentStep: number; // click-to-reveal 단계 (0-indexed)
  totalSlides: number;
  presenterMode: boolean;
  jumpBarOpen: boolean;
  timerStartedAt: number | null; // 경과시간 타이머 시작 timestamp (ms)
  bgVideoPaused: boolean; // V 키로 배경 영상 일시정지 토글

  setSlide: (index: number) => void;
  nextStep: (maxSteps: number) => void; // 스텝이 남으면 스텝++, 아니면 다음 슬라이드
  prevStep: () => void;
  goNext: () => void; // 강제 다음 슬라이드 (스텝 무시)
  goPrev: () => void;
  togglePresenter: () => void;
  toggleJumpBar: () => void;
  toggleBgVideo: () => void;
  startTimer: () => void;
  resetTimer: () => void;
  setTotalSlides: (n: number) => void;
};

export const useDeckStore = create<DeckState>((set, get) => ({
  currentSlide: 0,
  currentStep: 0,
  totalSlides: 14,
  presenterMode: false,
  jumpBarOpen: false,
  timerStartedAt: null,
  bgVideoPaused: false,

  setSlide: (index) => {
    const total = get().totalSlides;
    const clamped = Math.max(0, Math.min(total - 1, index));
    set({ currentSlide: clamped, currentStep: 0, jumpBarOpen: false });
  },

  nextStep: (maxSteps) => {
    const { currentStep, currentSlide, totalSlides } = get();
    if (currentStep < maxSteps - 1) {
      set({ currentStep: currentStep + 1 });
    } else if (currentSlide < totalSlides - 1) {
      set({ currentSlide: currentSlide + 1, currentStep: 0 });
    }
  },

  prevStep: () => {
    const { currentStep, currentSlide } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    } else if (currentSlide > 0) {
      set({ currentSlide: currentSlide - 1, currentStep: 0 });
    }
  },

  goNext: () => {
    const { currentSlide, totalSlides } = get();
    if (currentSlide < totalSlides - 1) {
      set({ currentSlide: currentSlide + 1, currentStep: 0 });
    }
  },

  goPrev: () => {
    const { currentSlide } = get();
    if (currentSlide > 0) {
      set({ currentSlide: currentSlide - 1, currentStep: 0 });
    }
  },

  togglePresenter: () => set((s) => ({ presenterMode: !s.presenterMode })),
  toggleJumpBar: () => set((s) => ({ jumpBarOpen: !s.jumpBarOpen })),
  toggleBgVideo: () => set((s) => ({ bgVideoPaused: !s.bgVideoPaused })),

  startTimer: () => {
    if (get().timerStartedAt === null) {
      set({ timerStartedAt: Date.now() });
    }
  },
  resetTimer: () => set({ timerStartedAt: null }),

  setTotalSlides: (n) => set({ totalSlides: n }),
}));
