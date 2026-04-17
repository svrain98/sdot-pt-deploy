import type { SlideMeta } from "@/types/slide";

// 19장 슬라이드 메타데이터 카탈로그 — 발표 Flow·시간·발표자 배정의 단일 소스
export const SLIDE_META: SlideMeta[] = [
  { id: "S01", number: 1, title: "S-DOT", subtitle: "시맨틱 데이터 전송 기술", presenter: "instructor", duration: "25s", steps: 1, notes: "타이틀. 메인 영상 배경." },
  { id: "S02", number: 2, title: "발표자 소개", subtitle: "팀 소개", presenter: "instructor", duration: "15s", steps: 1, notes: "4명 사진+소개." },
  { id: "S03", number: 3, title: "질문", subtitle: "", presenter: "instructor", duration: "10s", steps: 1, notes: "순수 블랙 + 질문. 3~4초 침묵 유도." },
  { id: "S04", number: 4, title: "전장 네트워크의 구조적 한계", subtitle: "SAMS 인용 + 3가지 문제", presenter: "instructor", duration: "1'30\"", steps: 3, notes: "SAMS 인용바 + 3카드." },
  { id: "S05", number: 5, title: "전술 AI가 나아가는 방향", subtitle: "Parameters + IEEE MILCOM", presenter: "instructor", duration: "55s", steps: 2, notes: "2열 논문 인용 카드." },
  { id: "S06", number: 6, title: "영상이 아닌 '의미'를 전송한다", subtitle: "패러다임 전환", presenter: "instructor", duration: "1'00\"", steps: 2, notes: "Before→After 타이포." },
  { id: "S07", number: 7, title: "S-DOT 시스템 개념도", subtitle: "Edge · Network · C2", presenter: "instructor", duration: "1'00\"", steps: 3, notes: "3레이어 카드." },
  { id: "S08", number: 8, title: "데모 구현 조건", subtitle: "구현 범위 및 제한사항", presenter: "instructor", duration: "1'00\"", steps: 1, notes: "3열 카드: 데이터/교리/C4I." },
  { id: "S09", number: 9, title: "데모 시나리오: 아우디우카 전투", subtitle: "같은 축선, 두 번의 실패", presenter: "instructor", duration: "1'10\"", steps: 2, notes: "타임라인 바 + 좌우 분할." },
  { id: "S10", number: 10, title: "드론 영상 → RDF Triple", subtitle: "시맨틱 변환 프로세스", presenter: "ceo", duration: "1'30\"", steps: 2, notes: "좌 드론 피드 / 우 RDF 타이핑." },
  { id: "S11", number: 11, title: "Before → After", subtitle: "815.7 KB → 48 B", presenter: "ceo", duration: "1'00\"", steps: 2, notes: "압축 게이지 + 카운트업." },
  { id: "S12", number: 12, title: "KPI", subtitle: "Mode A / B / COSE 비교", presenter: "ceo", duration: "1'30\"", steps: 2, notes: "4 KPICard + BarChart." },
  { id: "S13", number: 13, title: "러시아, 공격 준비 사격 개시", subtitle: "Avdiivka Day 1", presenter: "ceo", duration: "1'30\"", steps: 2, notes: "영상 배경 + 타임라인 + RDF 카드." },
  { id: "S14", number: 14, title: "1파→2파 반복의 이유", subtitle: "러시아 C2 한계 vs 우크라이나 S-DOT", presenter: "ceo", duration: "1'30\"", steps: 2, notes: "SplitCompare." },
  { id: "S15", number: 15, title: "같은 축선, 같은 전차 40대", subtitle: "AI 권고 — Yes / No", presenter: "ceo", duration: "1'30\"", steps: 3, notes: "흑백→컬러 + Decision Card." },
  { id: "S16", number: 16, title: "Video Streaming → Semantic", subtitle: "패러다임 비교", presenter: "ceo", duration: "1'00\"", steps: 1, notes: "ComparisonTable." },
  { id: "S17", number: 17, title: "Next Step", subtitle: "앞으로 필요한 것", presenter: "ceo", duration: "2'00\"", steps: 1, notes: "3열 상세 카드 + 결론." },
  { id: "S18", number: 18, title: "클로징", subtitle: "감사합니다", presenter: "ceo", duration: "30s", steps: 1, notes: "영상 배경 + 클로징 메시지." },
  { id: "SA1", number: 19, title: "붙임: 대역폭 비교", subtitle: "이론적 요구량 vs 실제 전술망", presenter: "none", duration: "", steps: 2, notes: "질의응답 대비 부록." },
];
