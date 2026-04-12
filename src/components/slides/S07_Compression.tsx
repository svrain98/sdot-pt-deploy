"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import CompressionBar from "@/components/effects/CompressionBar";
import { COMPRESSION_DEMO } from "@/lib/assets";
import type { SlideProps } from "@/types/slide";

// 07 — Before / After 압축 연출 (디바이스 테스트 결과)
export default function S07_Compression({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
              Device Test · Jetson Orin Nano
            </div>
            <h2 className="mt-3 text-[56px] font-black tracking-heading text-fg leading-[1.1]">
              Before →{" "}
              <span className="text-accent">After</span>
            </h2>
          </div>
          <div className="text-right text-[20px] font-medium uppercase tracking-label text-fg-dim">
            <div>Date 2026-04-11</div>
            <div>Session phase5_final_colors</div>
          </div>
        </div>

        <div className="mt-16 flex flex-1 items-center justify-center">
          <CompressionBar
            rawBytes={COMPRESSION_DEMO.rawBytes}
            semanticBytes={COMPRESSION_DEMO.semanticBytes}
            ratio={COMPRESSION_DEMO.ratio}
            active={active && step >= 1}
          />
        </div>

        <motion.div
          className="mt-6 flex items-center justify-center gap-6 border-t border-border pt-6 text-[20px] font-medium uppercase tracking-label"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-fg-muted">● JPEG 815.7 KB</span>
          <span className="text-fg-muted">→</span>
          <span className="text-fg-muted">● RDF/JSON-LD 48 B</span>
          <span className="text-fg-muted">→</span>
          <span className="text-accent">9.6 kbps 기준 전송시간 61 ms</span>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
