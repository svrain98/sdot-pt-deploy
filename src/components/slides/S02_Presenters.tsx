"use client";

import { motion } from "framer-motion";
import SlideFrame from "@/components/deck/SlideFrame";
import type { SlideProps } from "@/types/slide";

// 02 - 발표자 소개: 4인 카드 그리드 (실제 사진 사용)
const PRESENTERS = [
  {
    name: "이선경",
    org: "육군정보통신학교 AI교관",
    role: "아이디어 제안",
    photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/5af328a4-0212-446d-54c1-cee5d3f32300/public",
  },
  {
    name: "박민규",
    org: "모프시스템즈 CEO",
    role: "프로젝트 리드",
    photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/ef0c5467-ddd7-4e43-4fc6-ec39640d9700/public",
  },
  {
    name: "박윤서",
    org: "모프시스템즈 엔지니어",
    role: "시스템 개발",
    photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/f176d884-18c6-453b-4159-b7610438a600/public",
  },
  {
    name: "최강근",
    org: "익시드테크 CEO",
    role: "전술 지원 및 개발",
    photo: "https://imagedelivery.net/csS3I11UbX4B6HoDdrP-iA/bfe4858f-a736-4a15-d0a7-5a2242bdaa00/public",
  },
];

export default function S02_Presenters({ meta, active }: SlideProps) {
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
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-bg-panel rounded-card border border-border p-6 flex flex-col"
            >
              {/* 사진 영역 */}
              <div
                className="relative w-full overflow-hidden rounded-card bg-bg-elevated"
                style={{ aspectRatio: "3/4" }}
              >
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={`${p.name} 프로필`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-[48px] text-fg-dim opacity-20">?</span>
                  </div>
                )}
              </div>
              {/* 이름 */}
              <p className="mt-5 text-[26px] font-bold text-fg">{p.name}</p>
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
