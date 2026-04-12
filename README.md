# sdot-pt

**S-DOT 본선 발표 덱** — 제5회 육군 AI 아이디어 공모전

Next.js 14 + Framer Motion 기반 14장 인터랙티브 슬라이드 덱.

## Quick Start

```bash
npm install
bash scripts/copy-assets.sh   # 형제 프로젝트 에셋 자동 복사
npm run dev                   # http://localhost:3000
# F 키 → 전체화면 · 화살표 → 슬라이드 네비 · P 키 → Presenter HUD
```

## 주요 명령어

```bash
npm run dev            # 개발 서버
npm run build          # 프로덕션 빌드
npm run lint           # ESLint
npm run assets         # 에셋 자동 복사
npm run assets:check   # 미교체 slot 검사
```

## 발표 Flow (20분)

| 구간 | 시간 | 발표자 | 슬라이드 |
|---|---|---|---|
| 문제 제기 | 5' | 교관님 이선경 | S01~S05 |
| 시연·기업발표 | 10' | 대표님 최강근 | S06~S14 |
| Q&A | 5' | — | (Jump bar) |

## 기술 스택

- Next.js 14.2 · React 18 · TypeScript strict
- Framer Motion 11 · Tailwind CSS 3.4 · Zustand 5
- Noto Sans/Serif KR + JetBrains Mono
- **no build required at runtime** — `npm run dev` 하나로 발표

자세한 설계·규칙은 [CLAUDE.md](./CLAUDE.md) 참조.
