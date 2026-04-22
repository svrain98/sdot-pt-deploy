import type { SlideMeta } from "@/types/slide";

// 22장 슬라이드 메타데이터 — 본편 21장 + 부록 1장
// 전반부 S01~S09: 교관님 담당 (도입·문제·솔루션 개요)
// 후반부 S10~S21: 개발자 담당 (파이프라인 줌·시연·시나리오·마무리)
// 부록 SA1: 질의응답 대비 (대역폭 비교)
export const SLIDE_META: SlideMeta[] = [
  // ───── 전반부 (교관님) ─────
  { id: "S01", number: 1, title: "S-DOT", subtitle: "시맨틱 데이터 전송 기술", presenter: "instructor", duration: "25s", steps: 1, notes: "타이틀. 메인 영상 배경." },
  { id: "S02", number: 2, title: "발표자 소개", subtitle: "팀 소개", presenter: "instructor", duration: "15s", steps: 1, notes: "4인 사진 카드." },
  { id: "S03", number: 3, title: "질문", subtitle: "지휘관에게 더 많은 정보가 전달될수록", presenter: "instructor", duration: "10s", steps: 1, notes: "순수 블랙 + 2문단 순차 등장." },
  { id: "S04", number: 4, title: "전장 네트워크의 구조적 한계", subtitle: "SAMS 인용 + 3가지 문제", presenter: "instructor", duration: "1'30\"", steps: 4, notes: "타이틀+SAMS → 카드 순차 활성화." },
  { id: "S05", number: 5, title: "전술 AI가 나아가는 방향", subtitle: "Parameters + IEEE MILCOM", presenter: "instructor", duration: "55s", steps: 3, notes: "step0: 좌카드 / step1: 우카드 / step2: 결론." },
  { id: "S06", number: 6, title: "영상이 아닌 '의미'를 전송한다", subtitle: "패러다임 전환", presenter: "instructor", duration: "1'00\"", steps: 2, notes: "Before→After 타이포 + 3줄 설명." },
  { id: "S07", number: 7, title: "S-DOT 시스템 개념도", subtitle: "Edge · Network · C2", presenter: "instructor", duration: "1'00\"", steps: 4, notes: "step0~2: L1~L3 / step3: 하단 파이프라인." },
  { id: "S08", number: 8, title: "데모 구현 조건", subtitle: "구현 범위 및 제한사항", presenter: "instructor", duration: "1'00\"", steps: 2, notes: "step0: 4조건 / step1: 하단 가능성 메시지." },
  { id: "S09", number: 9, title: "데모 시나리오: 아우디우카 전투", subtitle: "한 전투, 두 번의 시뮬레이션", presenter: "instructor", duration: "1'10\"", steps: 2, notes: "타임라인 + 좌우 분할 + 질문 박스." },
  // ───── 후반부 (개발자) — 파이프라인 줌 시퀀스 ─────
  { id: "S10", number: 10, title: "S-DOT 전체 파이프라인", subtitle: "ISR · Foundry · AIP · Decision", presenter: "ceo", duration: "30s", steps: 1, notes: "4박스 overview." },
  { id: "S11", number: 11, title: "Edge 확대: 드론 영상 → 온톨로지", subtitle: "VLM 기반 온톨로지 변환", presenter: "ceo", duration: "50s", steps: 1, notes: "Box 1 줌인 + drone_semantic.mp4. 61MB→88B." },
  { id: "S12", number: 12, title: "전체 파이프라인으로 복귀", subtitle: "다음: Foundry 온톨로지", presenter: "ceo", duration: "10s", steps: 1, notes: "줌아웃. Box 1 ✓ 표시." },
  { id: "S13", number: 13, title: "Foundry 확대: 온톨로지 빅데이터", subtitle: "16 Object Types · Traceability", presenter: "ceo", duration: "50s", steps: 1, notes: "Box 2 줌인 + foundry 그래프." },
  { id: "S14", number: 14, title: "전체 파이프라인으로 복귀", subtitle: "다음: AIP Logic", presenter: "ceo", duration: "10s", steps: 1, notes: "줌아웃. Box 1·2 ✓ 표시." },
  { id: "S15", number: 15, title: "AIP + 결심 확대", subtitle: "5단계 분석 → 지휘관 결심", presenter: "ceo", duration: "50s", steps: 1, notes: "Box 3·4 동시 줌인 + AIP 5단계." },
  { id: "S16", number: 16, title: "KPI", subtitle: "Before → After · Mode A / B / COSE", presenter: "ceo", duration: "30s", steps: 2, notes: "4 KPICard + BarChart." },
  { id: "S17", number: 17, title: "1파 시뮬레이션 · 아우디우카", subtitle: "S-DOT 추천 = 실제 우크라이나 대응", presenter: "ceo", duration: "55s", steps: 3, notes: "step0 정지 → step1 영상 → step2 3-beat 카드." },
  { id: "S18", number: 18, title: "2파 재진입 시뮬레이션", subtitle: "Traceability 가 잡아낼까?", presenter: "ceo", duration: "40s", steps: 3, notes: "step0 정지 → step1 영상 0~4초 → step2 3-card 셋업." },
  { id: "S19", number: 19, title: "2파 시뮬레이션 결과 · AIP Logic", subtitle: "Traceability + AI 타격 추천", presenter: "ceo", duration: "55s", steps: 3, notes: "step0 정지 → step1 영상 4초~ → step2 3-step 파이프라인." },
  { id: "S20", number: 20, title: "Next Step", subtitle: "온톨로지 빅데이터 · LLM 통합", presenter: "ceo", duration: "45s", steps: 1, notes: "3 pillar + 결론 배너." },
  { id: "S21", number: 21, title: "클로징", subtitle: "영상의 시대에서 온톨로지 빅데이터로", presenter: "ceo", duration: "25s", steps: 1, notes: "메인 영상 배경 + 대형 카피 + 감사합니다." },
  // ───── 부록 (현재 미배포) ─────
  // { id: "SA1", number: 22, title: "붙임: 대역폭 비교", subtitle: "이론적 요구량 vs 실제 전술망", presenter: "none", duration: "", steps: 2, notes: "질의응답 대비 부록." },
];
