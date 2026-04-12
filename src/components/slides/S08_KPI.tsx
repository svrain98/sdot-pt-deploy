"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import KPICard from "@/components/charts/KPICard";
import BarChart from "@/components/charts/BarChart";
import type { SlideProps } from "@/types/slide";

// 08 — KPI 패널: 4개 핵심 KPI + 포맷 비교 BarChart
export default function S08_KPI({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[15px] font-medium uppercase tracking-label text-accent">
              Key Performance Indicators · 9 Formats Benchmarked
            </div>
            <h2 className="mt-4 text-[64px] font-black tracking-heading leading-[1.05] text-fg">
              KPI — Mode A · Mode B ·{" "}
              <span className="text-accent">COSE Sealed</span>
            </h2>
          </div>
          <div className="text-[20px] font-medium uppercase tracking-label text-fg-dim">
            best: Mode B + COSE · 74 B · 94 ms
          </div>
        </div>

        {/* 상단 4개 KPI 카드 */}
        <div className="mt-8 grid grid-cols-4 gap-5">
          <KPICard
            label="압축률"
            value={278383}
            unit=":1"
            active={active && step >= 0}
            format={(v) => Math.round(v).toLocaleString("ko-KR")}
          />
          <KPICard
            label="페이로드"
            value={74}
            unit="Bytes"
            active={active && step >= 0}
          />
          <KPICard
            label="전송시간"
            value={94}
            unit="ms @9.6kbps"
            active={active && step >= 0}
          />
          <KPICard
            label="무결성"
            value={100}
            unit="%"
            active={active && step >= 0}
          />
        </div>

        {/* 하단 포맷 비교 BarChart */}
        <motion.div
          className="mt-8 flex-1 bg-bg-panel rounded-card border border-border p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={active && step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6 text-[15px] font-medium uppercase tracking-label text-fg-dim">
            Format Size Comparison
          </div>
          <BarChart
            items={[
              { label: "Mode B (Opaque)", value: 74, tone: "accent" },
              { label: "Mode A (URN)", value: 106, tone: "accent" },
              { label: "Turtle", value: 547, tone: "muted" },
              { label: "JSON-LD", value: 757, tone: "muted" },
              { label: "N-Triples", value: 895, tone: "dim" },
            ]}
            unit="Bytes"
            active={active && step >= 1}
          />
        </motion.div>
      </div>
    </SlideFrame>
  );
}
