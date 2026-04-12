"use client";

import clsx from "clsx";
import { SLIDE_META } from "@/lib/slide-meta";
import { useDeckStore } from "@/lib/store";

// G 키로 토글되는 점프 바 — 숫자 키 1~9/0 으로 슬라이드 선택
export default function SlideJumpBar() {
  const currentSlide = useDeckStore((s) => s.currentSlide);
  const setSlide = useDeckStore((s) => s.setSlide);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-md"
      onClick={() => useDeckStore.getState().toggleJumpBar()}
    >
      <div
        className="max-h-[80vh] w-[1080px] overflow-y-auto rounded-lg border border-border-subtle bg-bg-panel p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[14px] font-black uppercase tracking-[0.25em] text-accent-cyan">
            Slide Jump
          </h2>
          <span className="text-[14px] text-fg-dim">
            Number keys 1–9/0 · Esc to close · Click to jump
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SLIDE_META.map((meta, idx) => {
            const isCurrent = idx === currentSlide;
            const hotkey = idx < 9 ? String(idx + 1) : idx === 9 ? "0" : "";
            return (
              <button
                key={meta.id}
                onClick={() => setSlide(idx)}
                className={clsx(
                  "flex items-center gap-3 rounded border px-4 py-3 text-left transition-colors",
                  isCurrent
                    ? "border-accent-cyan bg-accent-cyan/10"
                    : "border-border-subtle bg-black/40 hover:border-accent-cyan/50"
                )}
              >
                <div className="w-8 font-mono text-[18px] font-black text-fg">
                  {String(meta.number).padStart(2, "0")}
                </div>
                {hotkey && (
                  <div className="flex h-6 w-6 items-center justify-center rounded border border-border-subtle font-mono text-[14px] text-fg-muted">
                    {hotkey}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-[16px] font-bold text-fg">
                    {meta.title}
                  </div>
                  {meta.subtitle && (
                    <div className="text-[14px] text-fg-muted">
                      {meta.subtitle}
                    </div>
                  )}
                </div>
                <div className="w-16 text-right text-[14px] text-fg-dim">
                  {meta.duration}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
