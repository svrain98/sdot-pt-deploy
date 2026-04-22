# sdot-pt2

**S-DOT 본선 발표 덱** — 제5회 육군 AI 아이디어 공모전

> Edge AI 기반 초경량 시맨틱 전송 체계
> 99% 데이터 감축, 제한된 전장 네트워크에서도 끊기지 않는 킬체인

Next.js 14 + Framer Motion 기반 21장 인터랙티브 슬라이드 덱. 18theses.com 스타일의 모노크롬 블랙 + 올리브 그린 팔레트.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

**발표 단축키**
- `→ / Space` 다음 스텝  ·  `←` 이전
- `F` 전체화면  ·  `P` Presenter HUD  ·  `G` 슬라이드 점프

---

## 발표 구성 (10분 + Q&A)

| 구간 | 시간 | 발표자 | 슬라이드 |
|---|---|---|---|
| **문제 제기** | 6' | 이선경 교관님 (육군정보통신학교) | S01 ~ S09 |
| **시연 · 기업발표** | 4' | 박민규 대표님 (모프시스템즈) | S10 ~ S21 |
| Q&A | — | 전원 | Jump bar(`G`)로 임의 점프 |

---

## 슬라이드 구성 (21장)

### 🟢 전반부 — 문제 제기 (이선경 교관님, 6')

| # | 제목 | 핵심 |
|---|---|---|
| 01 | S-DOT | 시맨틱 데이터 전송 기술 — 타이틀 |
| 02 | 발표자 소개 | 4인 팀 |
| 03 | 질문 | "더 많은 정보가 더 나은 결심을 만드는가?" |
| 04 | 전장 네트워크의 구조적 한계 | SAMS 인용 + 3가지 문제 |
| 05 | 전술 AI가 나아가는 방향 | Parameters 2025 + IEEE MILCOM 2024 |
| 06 | 영상이 아닌 '의미'를 전송한다 | 패러다임 전환 |
| 07 | S-DOT 시스템 개념도 | Edge · Network · C2 |
| 08 | 데모 구현 조건 | OSINT / MIL-STD-2525 / Palantir |
| 09 | 데모 시나리오: 아우디우카 전투 | 한 전투, 두 번의 시뮬레이션 |

### 🟢 후반부 — 시연 · 기업발표 (박민규 대표님, 4')

| # | 제목 | 핵심 |
|---|---|---|
| 10 | S-DOT 전체 파이프라인 | ISR · Foundry · AIP · Decision |
| 11 | Edge 확대 | 드론 영상 → 온톨로지 (61MB → 88B) |
| 12 | 파이프라인 복귀 ① | Edge ✓ |
| 13 | Foundry 확대 | 16 Object Types · Traceability |
| 14 | 파이프라인 복귀 ② | Foundry ✓ |
| 15 | AIP + 결심 확대 | 5단계 AI 분석 → 지휘관 결심 |
| 16 | KPI | Before → After · Mode A/B/COSE |
| 17 | 1파 시뮬레이션 | S-DOT 추천 = 실제 우크라 대응 |
| 18 | 2파 재진입 시뮬레이션 | Traceability 가 잡아낼까? |
| 19 | 2파 결과 · AIP Logic | Traceability + AI 타격 추천 |
| 20 | Next Step | 온톨로지 빅데이터 · LLM 통합 |
| 21 | 클로징 | 영상의 시대 → 온톨로지 빅데이터 |

> 부록 `SA1` (대역폭 비교)은 코드는 유지하되 배포에서 제외 (Q&A 대비 숨김).

---

## 기술 스택

- **Framework** Next.js 14.2 (App Router) · React 18 · TypeScript strict
- **Animation** Framer Motion 11 · Zustand 5 (slide/step 상태)
- **Styling** Tailwind CSS 3.4 · Pretendard Variable (한/영 통일)
- **Media**
  - 영상: Cloudflare Stream (HLS `.m3u8`) + hls.js
  - 사진: Cloudflare Images (발표자) + 로컬 PNG (파이프라인)

---

## 주요 명령어

```bash
npm run dev            # 개발 서버
npm run build          # 프로덕션 빌드
npm run lint           # ESLint
```

---

## 배포

- **개인 레포**: [GoGetShitDone/sdot-pt2](https://github.com/GoGetShitDone/sdot-pt2)
- **조직 레포**: [DefenseStartupAlliance/sdot-pt](https://github.com/DefenseStartupAlliance/sdot-pt)
- Vercel 자동 배포 (main 푸시 시)

---

## 팀

| 이름 | 소속 | 역할 |
|---|---|---|
| 이선경 | 육군정보통신학교 AI교관 | 아이디어 제안 |
| 박민규 | 모프시스템즈 CEO | 프로젝트 리드 |
| 박윤서 | 모프시스템즈 엔지니어 | 시스템 개발 |
| 최강근 | 익시드테크 CEO | 전술 지원 및 개발 |

자세한 설계·규칙은 [CLAUDE.md](./CLAUDE.md) 참조.
