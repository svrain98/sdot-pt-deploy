"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

// 815.7 KB → 48 B 압축 게이지 애니메이션 (슬라이드 07)
type Props = {
  rawBytes: number;
  semanticBytes: number;
  ratio: number;
  active: boolean;
};

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function CompressionBar({
  rawBytes,
  semanticBytes,
  ratio,
  active,
}: Props) {
  const afterWidth = Math.max(0.5, (semanticBytes / rawBytes) * 100);

  return (
    <div className="w-full">
      {/* 상단: raw vs semantic 라벨 */}
      <div className="mb-6 flex items-baseline justify-between font-mono">
        <div>
          <div className="text-[15px] uppercase tracking-[0.2em] text-fg-muted">
            Raw Payload
          </div>
          <div className="text-[44px] font-black leading-none text-fg-muted">
            {formatBytes(rawBytes)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[15px] uppercase tracking-[0.2em] text-accent">
            S-DOT Semantic
          </div>
          <div className="text-[44px] font-black leading-none text-accent">
            {formatBytes(semanticBytes)}
          </div>
        </div>
      </div>

      {/* 게이지 막대 */}
      <div className="relative h-12 w-full overflow-hidden rounded border border-border-subtle bg-black">
        {/* raw = full width 회색 막대 */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-fg-dim"
          initial={{ width: "100%" }}
          animate={{ width: active ? `${afterWidth}%` : "100%" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        {/* semantic = 아주 작은 악센트 마커 */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${afterWidth}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4, delay: active ? 1.4 : 0 }}
        />
      </div>

      {/* 하단: 압축률 카운트업 */}
      <div className="mt-8 text-center">
        <div className="text-[15px] uppercase tracking-[0.3em] text-fg-muted">
          Compression Ratio
        </div>
        <div className="font-mono text-[110px] font-black leading-none text-accent">
          <CountUp to={ratio} active={active} duration={1800} />
          <span className="text-[44px] text-fg-muted"> : 1</span>
        </div>
      </div>
    </div>
  );
}
