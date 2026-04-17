"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 03 — 극적 침묵 유도 슬라이드: 순수 검정 배경 + 질문 텍스트만
// showChrome={false} — 헤더, 페이지 번호, S-DOT 로고 없음
export default function S03_Question({ meta, active }: SlideProps) {
  return (
    <SlideFrame meta={meta} showChrome={false}>
      <div className="flex h-full w-full items-center justify-center bg-black">
        <motion.p
          className="text-[56px] font-bold text-fg leading-[1.4] text-center max-w-[900px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 2.5 }}
        >
          지휘관에게 전장의 모든 정보가
          <br />
          빠짐없이 전달될수록
          <br />
          더 나은 지휘결심이 가능한가?
        </motion.p>
      </div>
    </SlideFrame>
  );
}
