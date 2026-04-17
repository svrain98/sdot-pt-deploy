"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 17 — Next Step: 앞으로 필요한 것
export default function S17_NextStep({ meta, active }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col items-center justify-center px-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent mb-6">
            Next Step · 앞으로 필요한 것
          </div>
          <h2 className="text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            Next Step
          </h2>
          <p className="mt-6 text-[28px] text-fg-muted">앞으로 필요한 것</p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
