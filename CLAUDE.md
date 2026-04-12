# sdot-pt — 제5회 육군 AI 공모전 본선 발표 덱

## 개요
S-DOT(Edge AI 기반 초경량 시맨틱 전송 체계) 본선 발표용 **인터랙티브 웹 슬라이드 덱**.
14장 슬라이드·20분 발표(5+10+5)를 한 Next.js 앱으로 커버한다. PPT 대신 HTML 덱을 쓰는 이유는
압축률 카운트업, RDF Triple 타이핑, 흑백→컬러 트랜지션 같은 데이터 스토리 연출이 필요하기 때문.

## 기술 스택
- **Framework**: Next.js 14.2.x (App Router, src/)
- **UI**: React 18.x (**React 19 금지** — 모노레포 공통 규칙)
- **Animation**: Framer Motion 11.x
- **State**: Zustand 5.x (현재 슬라이드·스텝·Presenter HUD)
- **Styling**: Tailwind CSS 3.x (**v4 금지**) + CSS 변수 + Noto Sans/Serif KR
- **TypeScript**: strict mode, `@/*` path alias

## 디렉토리 구조
```
src/
├── app/
│   ├── layout.tsx        # Noto 폰트 로드, 다크 배경 고정
│   ├── page.tsx          # <Deck /> 마운트
│   └── globals.css       # 슬라이드 프레임 · 코너마크 · 그리드 · 스캔라인
├── components/
│   ├── deck/             # Deck, SlideFrame, PresenterHUD, SlideJumpBar
│   ├── effects/          # PlaceholderMedia, GrayscaleToColor, TypingRDF,
│   │                     # CountUp, CompressionBar, MediaBackground,
│   │                     # SplitCompare, StaggeredKPI
│   └── slides/           # S01_Title ~ S14_Closing + index.ts
├── lib/
│   ├── store.ts          # Zustand 덱 상태
│   ├── slide-meta.ts     # 14장 메타데이터 (제목·발표자·시간·스텝)
│   └── assets.ts         # 이미지·영상·데이터 경로 상수
└── types/
    └── slide.ts

public/
├── videos/               # 드론 MP4 (scripts/copy-assets.sh 로 복사)
├── images/
│   ├── figures/          # sdot-slide 학술 차트 6개
│   ├── thumbnails/       # sdot-edge YOLO 탐지 썸네일 3개
│   └── _placeholders/    # SVG 플레이스홀더 fallback
└── data/                 # triples.jsonld, decision_points.json 등

scripts/
├── copy-assets.sh        # 형제 프로젝트 에셋 자동 복사
└── check-slots.js        # 미교체 slot 검사 리포트
```

## 발표 Flow (20분)
| Segment | 시간 | 발표자 | 슬라이드 |
|---|---|---|---|
| 문제 제기 | 5분 | 교관님 이선경 | S01~S05 |
| 시연·기업발표 | 10분 | 대표님 최강근 | S06~S14 |
| Q&A | 5분 | — | Jump bar 로 임의 점프 |

## 키보드 단축키
| 키 | 동작 |
|---|---|
| `→` / `PgDn` / `Space` | 다음 스텝 (스텝 끝이면 다음 슬라이드) |
| `←` / `PgUp` / `Backspace` | 이전 스텝 |
| `↓` / `↑` | 강제 슬라이드 이동 (스텝 무시) |
| `Home` / `End` | 처음/끝 |
| `F` | 전체화면 토글 |
| `P` | Presenter HUD 토글 |
| `G` | 슬라이드 점프 바 열기 |
| `1~9` / `0` | (점프 바 열림) 해당 슬라이드로 |
| `Esc` | 점프 바 닫기 |

## 에셋 워크플로우
1. `bash scripts/copy-assets.sh` 로 형제 프로젝트의 차트·영상·데이터 자동 복사
2. 아직 없는 에셋은 `<PlaceholderMedia />` 가 SVG 플레이스홀더로 자동 폴백
3. `npm run assets:check` 로 미교체 slot 목록 확인
4. 실물 준비되는 대로 `public/` 해당 경로에 파일 드롭만 하면 자동 교체

**수동 교체 필요 slot** (별도 프론트 스크린샷):
- `public/images/ru_c2_still.png` (S10 좌측)
- `public/images/ua_sdot_dashboard.png` (S10 우측)
- `public/images/decision_card_ui.png` (S11 배경 옵션)

## 검증
```bash
npm install           # 최초 1회
npm run dev           # http://localhost:3000 — 키보드 네비 확인
npm run build         # 빌드 에러 0
npm run lint          # 린트 에러 0
npm run assets:check  # 에셋 slot 상태
```

## 코딩 규칙
- 소스코드 주석: **한국어**
- Git 커밋 메시지: **영어**
- 본문 언어: **한국어 + 영어 기술 용어** (RDF, YOLO, COP 등 유지)
- 슬라이드 추가 시 반드시:
  1. `src/components/slides/SXX_Name.tsx` 작성
  2. `src/lib/slide-meta.ts` 에 메타 엔트리 추가
  3. `src/components/slides/index.ts` 의 `SLIDES` 배열에 추가
- 영상·이미지 신규 slot 추가 시:
  1. `src/lib/assets.ts` 에 경로 상수 추가
  2. `scripts/check-slots.js` 의 `SLOTS` 배열에 추가
  3. `scripts/copy-assets.sh` 에 복사 명령 추가 (자동 복사 가능한 경우)

## 참조
- `../sdot-slide/assets/figures/semantic_format/` — 학술 차트 원본
- `../sdot-edge/sessions/2026-04-11_1329_phase5_final_colors/` — 최신 디바이스 테스트 결과
- `../sdot-decision_db/raw/` — 아우디우카 Day 1 시나리오 데이터
- `../sdot-clip/` — 아우디우카 전투 ISR 영상 11개
- `../sample_slide_style/Sample_basic/slide01.html` — 다크 프레임 스타일 원본
- `../docs/제5회 육군 인공지능 아이디어 공모전 본선 진출 공모작(민간 공지용).pdf`
- `../docs/AI 아이디어공모전 PT(최종).pdf` — 교관님 기존 PT
