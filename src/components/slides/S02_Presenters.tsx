"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import PlaceholderMedia from "@/components/effects/PlaceholderMedia";
import type { SlideProps } from "@/types/slide";

// 02 — 발표자 소개: 4인 카드 그리드
const PRESENTERS = [
  { slot: "S02_presenter_1", name: "이선경", org: "육군정보통신학교 교관", role: "아이디어 제안", photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/4f15ed96-eca9-4f23-aeae-44118c53cb00/public" },
  { slot: "S02_presenter_2", name: "박민규", org: "모프시스템즈 CEO", role: "프로젝트 리드", photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/1c31db4c-f986-47a6-b42d-d3a2e536ad00/public" },
  { slot: "S02_presenter_3", name: "박윤서", org: "모프시스템즈 엔지니어", role: "시스템 개발", photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/51ff16c7-6213-42a3-0ec3-b1c018f1a000/public" },
  { slot: "S02_presenter_4", name: "최강근", org: "익시드테크 CEO", role: "전술 지원 및 개발", photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/9646b1c2-e984-4e6c-6a1c-bbc9afa41e00/public" },
];

export default function S02_Presenters({ meta, active, step }: SlideProps) {
  return (
    <SlideFrame meta={meta} showChrome={true}>
      <div className="flex h-full w-full flex-col px-[140px] pt-[140px] pb-[120px]">
        {/* 헤더 */}
        <div>
          <div className="inline-block border border-accent/50 px-3 py-1.5 rounded-card text-[20px] font-medium uppercase tracking-label text-accent">
            TEAM · 발표 팀 소개
          </div>
          <h2 className="mt-4 text-[64px] font-black tracking-heading text-fg leading-[1.1]">
            발표자 소개
          </h2>
        </div>

        {/* 4인 카드 그리드 */}
        <div className="mt-14 grid flex-1 grid-cols-4 gap-6">
          {PRESENTERS.map((p, i) => (
            <motion.div
              key={p.slot}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-bg-panel rounded-card border border-border p-6 flex flex-col"
            >
              {/* 사진 영역 — 3:4 세로 프로필 */}
              <div className="relative w-full overflow-hidden rounded-card bg-bg-elevated" style={{ aspectRatio: "3/4" }}>
                <img
                  src={p.photo}
                  alt={`${p.name} 프로필`}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* 이름 */}
              <p className="mt-5 text-[24px] font-bold text-fg">{p.name}</p>
              {/* 소속 */}
              <p className="mt-1 text-[20px] text-fg-muted">{p.org}</p>
              {/* 역할 */}
              <p className="mt-1 text-[20px] text-accent">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
