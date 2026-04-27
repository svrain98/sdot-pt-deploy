"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

export default function S03_Question({ meta, active }: SlideProps) {
  return (
    <SlideFrame meta={meta} showChrome={false}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-black">
        {/* 첫 번째 문장 — 먼저 등장 */}
        <motion.p
          className="text-[72px] font-bold text-fg leading-[1.4] text-center max-w-[1400px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          지휘관에게 더 많은 정보가 전달될수록,
        </motion.p>
        {/* 두 번째 문장 — 1초 뒤 등장 */}
        <motion.p
          className="text-[72px] font-bold text-accent leading-[1.4] text-center max-w-[1400px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          더 나은 결심이 가능하다고 생각하십니까?
        </motion.p>
      </div>
    </SlideFrame>
  );
}