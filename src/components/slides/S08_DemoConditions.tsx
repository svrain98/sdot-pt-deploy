"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 08 — 데모 구현 조건: 구현 범위 및 제한사항
export default function S08_DemoConditions({ meta, active }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col items-center justify-center px-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent mb-6">
            Demo Conditions · 구현 범위
          </div>
          <h2 className="text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            데모 구현 조건
          </h2>
          <p className="mt-6 text-[28px] text-fg-muted">구현 범위 및 제한사항</p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
