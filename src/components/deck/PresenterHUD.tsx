"use client";

import { useEffect, useState } from "react";
import { useDeckStore } from "@/lib/store";
import { SLIDE_META } from "@/lib/slide-meta";

// 우하단 고정 패널 — P 키로 토글, 발표 중 숨김 가능
export default function PresenterHUD() {
  const presenterMode = useDeckStore((s) => s.presenterMode);
  const currentSlide = useDeckStore((s) => s.currentSlide);
  const currentStep = useDeckStore((s) => s.currentStep);
  const timerStartedAt = useDeckStore((s) => s.timerStartedAt);

  const [elapsed, setElapsed] = useState("00:00");

  useEffect(() => {
    if (timerStartedAt === null) {
      setElapsed("00:00");
      return;
    }
    const tick = () => {
      const diff = Math.floor((Date.now() - timerStartedAt) / 1000);
      const mm = String(Math.floor(diff / 60)).padStart(2, "0");
      const ss = String(diff % 60).padStart(2, "0");
      setElapsed(`${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timerStartedAt]);

  if (!presenterMode) return null;

  const meta = SLIDE_META[currentSlide];
  const next = SLIDE_META[currentSlide + 1];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] rounded-md border border-border-subtle bg-black/85 p-4 font-mono text-[11px] shadow-2xl backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
        <span className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-accent-cyan">
          Presenter HUD
        </span>
        <span className="text-[10px] text-fg-dim">P to toggle</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-fg-dim">
            Elapsed
          </div>
          <div className="text-[22px] font-black leading-none text-accent-green">
            {elapsed}
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-fg-dim">
            Slide
          </div>
          <div className="text-[22px] font-black leading-none text-fg">
            {String(currentSlide + 1).padStart(2, "0")}
            <span className="text-[12px] text-fg-dim"> / 14</span>
          </div>
        </div>
      </div>

      <div className="mb-2 border-t border-border-subtle pt-2">
        <div className="text-[9px] uppercase tracking-wider text-fg-dim">
          Now
        </div>
        <div className="mt-0.5 text-[12px] font-bold text-fg">
          {meta?.title}
        </div>
        <div className="mt-0.5 text-[10px] text-fg-muted">
          Step {currentStep + 1} / {meta?.steps} · {meta?.duration}
        </div>
      </div>

      {meta?.notes && (
        <div className="mb-2 rounded border border-border-subtle bg-white/5 p-2 font-sans text-[10px] leading-relaxed text-fg-muted">
          {meta.notes}
        </div>
      )}

      {next && (
        <div className="border-t border-border-subtle pt-2">
          <div className="text-[9px] uppercase tracking-wider text-fg-dim">
            Next
          </div>
          <div className="mt-0.5 text-[11px] text-fg-muted">
            {next.number}. {next.title}
          </div>
        </div>
      )}
    </div>
  );
}
