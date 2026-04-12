"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

// 좌→우 파이프라인 다이어그램
// SVG stroke-dasharray 그리기 애니메이션 + 스태거 노드 페이드인
export type Node = {
  id: string;
  label: string;
  sublabel?: string;
};

type Props = {
  nodes: Node[];
  active: boolean;
  className?: string;
};

const NODE_W = 180;
const NODE_H = 72;
const GAP = 60; // 노드 간 수평 간격
const ARROW_SIZE = 8;
const DIAGRAM_H = 120;

export default function DataFlow({ nodes, active, className }: Props) {
  if (nodes.length === 0) return null;

  const totalW = nodes.length * NODE_W + (nodes.length - 1) * GAP;
  // 세로 중앙
  const cy = DIAGRAM_H / 2;
  const nodeTop = cy - NODE_H / 2;

  return (
    <div className={clsx("w-full overflow-x-auto", className)}>
      <div style={{ minWidth: totalW, height: DIAGRAM_H, position: "relative" }}>
        {/* SVG 연결선 레이어 */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: totalW,
            height: DIAGRAM_H,
            overflow: "visible",
          }}
          aria-hidden="true"
        >
          <defs>
            {/* 화살표 마커 */}
            <marker
              id="arrow-head"
              markerWidth={ARROW_SIZE}
              markerHeight={ARROW_SIZE}
              refX={ARROW_SIZE - 1}
              refY={ARROW_SIZE / 2}
              orient="auto"
            >
              <path
                d={`M0,0 L0,${ARROW_SIZE} L${ARROW_SIZE},${ARROW_SIZE / 2} Z`}
                fill="var(--accent)"
              />
            </marker>
          </defs>

          {/* 노드 간 연결선 */}
          {nodes.slice(0, -1).map((_, idx) => {
            const x1 = idx * (NODE_W + GAP) + NODE_W; // 현재 노드 오른쪽 끝
            const x2 = (idx + 1) * (NODE_W + GAP); // 다음 노드 왼쪽 끝
            const lineLen = x2 - x1 - ARROW_SIZE; // 마커 크기만큼 여백

            return (
              <motion.line
                key={idx}
                x1={x1}
                y1={cy}
                x2={x2 - ARROW_SIZE + 2}
                y2={cy}
                stroke="var(--accent)"
                strokeWidth={1.5}
                markerEnd="url(#arrow-head)"
                strokeDasharray={lineLen}
                initial={{ strokeDashoffset: lineLen }}
                animate={{ strokeDashoffset: active ? 0 : lineLen }}
                transition={{
                  duration: 0.5,
                  delay: active ? idx * 0.18 + 0.2 : 0,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </svg>

        {/* 노드 카드 */}
        {nodes.map((node, idx) => (
          <motion.div
            key={node.id}
            style={{
              position: "absolute",
              left: idx * (NODE_W + GAP),
              top: nodeTop,
              width: NODE_W,
              height: NODE_H,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{
              duration: 0.4,
              delay: active ? idx * 0.18 : 0,
              ease: "easeOut",
            }}
          >
            <div
              className="flex h-full flex-col items-center justify-center rounded-lg border border-accent bg-bg-panel px-3"
              style={{ width: NODE_W, height: NODE_H }}
            >
              <span className="text-[16px] font-semibold text-fg text-center leading-tight">
                {node.label}
              </span>
              {node.sublabel && (
                <span className="mt-1 text-[15px] text-fg-dim text-center leading-tight">
                  {node.sublabel}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
