"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// 흑백 → 컬러 트랜지션 래퍼 (슬라이드 10, 11에서 사용)
type Props = {
  active: boolean;
  children: ReactNode;
  duration?: number;
  className?: string;
};

export default function GrayscaleToColor({
  active,
  children,
  duration = 1.2,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ filter: "grayscale(100%) brightness(0.55)" }}
      animate={
        active
          ? { filter: "grayscale(0%) brightness(1)" }
          : { filter: "grayscale(100%) brightness(0.55)" }
      }
      transition={{ duration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
