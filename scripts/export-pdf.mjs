// S-DOT 슬라이드 덱 → PDF 내보내기
//
// 사용법:
//   1) 터미널 A: npm run dev           (http://localhost:3000 띄워두기)
//   2) 터미널 B: npm run export:pdf     ← 이 스크립트 실행
//
// 동작:
//   - Puppeteer 로 1920×1080 헤드리스 Chrome 기동
//   - window.__deckStore 를 직접 조작해 각 슬라이드의 "최종 step" 상태로 점프
//   - 영상 슬라이드(S17/S18/S19)는 <video> 를 최종 프레임으로 seek 후 pause
//     → 다음 슬라이드로 넘어가기 직전 상태 그대로 캡처
//   - 각 슬라이드를 PNG 로 저장 → pdf-lib 로 결합 → public/sdot-deck.pdf 생성

import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEV_URL = process.env.DECK_URL || "http://localhost:3000";
const OUT_PDF = path.resolve(ROOT, "public", "sdot-deck.pdf");
const DEBUG_DIR = path.resolve(ROOT, ".pdf-cache");

const WIDTH = 1920;
const HEIGHT = 1080;
const SCALE = 2;

// src/lib/slide-meta.ts 의 steps 필드와 동기화 필요
// 현재 본편 21장 (부록 SA1 미배포)
const STEPS_PER_SLIDE = [
  1, // S01 타이틀
  1, // S02 발표자 소개
  1, // S03 질문
  4, // S04 네트워크 구조적 한계
  3, // S05 전술 AI 방향
  2, // S06 의미 전송 패러다임
  4, // S07 시스템 개념도
  2, // S08 데모 구현 조건
  1, // S10 전체 파이프라인
  1, // S11 Edge 확대
  1, // S12 복귀
  1, // S13 Foundry 확대
  1, // S14 복귀
  1, // S15 AIP + 결심
  2, // S16 KPI
  2, // S09 데모 시나리오
  3, // S17 1파 시뮬레이션      ← 영상
  3, // S18 2파 재진입 시뮬레이션 ← 영상
  3, // S19 2파 결과 · AIP      ← 영상
  1, // S20 Next Step
  1, // S21 클로징
];

// 영상이 있는 슬라이드 인덱스 (0-based) 와 캡처할 최종 프레임 시각(초)
//   null = video.duration - 0.05 (자연 끝 프레임)
//   숫자 = 해당 초 지점 (endSeconds 지정 슬라이드)
const VIDEO_SEEK_TARGETS = {
  16: null, // S17
  17: 3.0, // S18 (endSeconds=3)
  18: null, // S19
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDeckReady(page) {
  await page.waitForFunction(
    () => {
      const s = window.__deckStore;
      if (!s) return false;
      return s.getState().totalSlides > 1;
    },
    { timeout: 30000 },
  );
}

async function gotoSlideFinalStep(page, slideIndex, steps) {
  await page.evaluate(
    ({ i, s }) => {
      const store = window.__deckStore;
      // 한 번 리셋 후 최종 step 으로
      store.setState({ currentSlide: i, currentStep: 0 });
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          store.setState({
            currentSlide: i,
            currentStep: Math.max(0, s - 1),
          });
          resolve();
        });
      });
    },
    { i: slideIndex, s: steps },
  );
}

// 모든 Web Animations API 애니메이션이 끝날 때까지 폴링.
// framer-motion 도 내부적으로 WAAPI 를 활용하므로 대부분의 fade-in/slide 가 잡힘.
async function waitForAnimationsSettled(page, maxWaitMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const stillAnimating = await page.evaluate(() => {
      try {
        const anims = document.getAnimations
          ? document.getAnimations()
          : [];
        // running 상태 + endTime 미달 인 것만 카운트
        return anims.some((a) => {
          try {
            return (
              a.playState === "running" || a.playState === "pending"
            );
          } catch {
            return false;
          }
        });
      } catch {
        return false;
      }
    });
    if (!stillAnimating) return;
    await new Promise((r) => setTimeout(r, 150));
  }
}

async function freezeVideos(page, slideIndex) {
  const seekTarget =
    slideIndex in VIDEO_SEEK_TARGETS ? VIDEO_SEEK_TARGETS[slideIndex] : null;

  await page.evaluate(async (target) => {
    const videos = Array.from(document.querySelectorAll("video"));
    await Promise.all(
      videos.map(
        (v) =>
          new Promise((resolve) => {
            const finalize = () => {
              try {
                v.pause();
              } catch {}
              resolve();
            };

            const ensureMeta = () =>
              new Promise((res) => {
                if (
                  v.readyState >= 1 &&
                  v.duration &&
                  !Number.isNaN(v.duration)
                ) {
                  res();
                  return;
                }
                const on = () => {
                  v.removeEventListener("loadedmetadata", on);
                  res();
                };
                v.addEventListener("loadedmetadata", on);
                setTimeout(() => {
                  v.removeEventListener("loadedmetadata", on);
                  res();
                }, 4000);
              });

            ensureMeta().then(() => {
              try {
                v.muted = true;
                v.pause();
                const dur = v.duration || 0;
                let seekTo;
                if (typeof target === "number") {
                  seekTo = Math.min(target, dur - 0.02);
                  if (Number.isNaN(seekTo) || seekTo < 0) seekTo = target;
                } else {
                  seekTo = Math.max(0, dur - 0.05);
                }

                const onSeeked = () => {
                  v.removeEventListener("seeked", onSeeked);
                  finalize();
                };
                v.addEventListener("seeked", onSeeked);
                v.currentTime = seekTo;
                // fallback — seek 이 끝나지 않으면 강제 진행
                setTimeout(() => {
                  v.removeEventListener("seeked", onSeeked);
                  finalize();
                }, 2500);
              } catch {
                finalize();
              }
            });
          }),
      ),
    );
  }, seekTarget);
}

async function main() {
  await fs.mkdir(DEBUG_DIR, { recursive: true });
  await fs.mkdir(path.dirname(OUT_PDF), { recursive: true });

  console.log(`▸ launching headless Chrome @ ${DEV_URL}`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--autoplay-policy=no-user-gesture-required",
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      "--mute-audio",
      "--no-sandbox",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: SCALE,
    });

    page.on("pageerror", (err) => console.error("page error:", err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error")
        console.error("browser err:", msg.text());
    });

    await page.goto(DEV_URL, { waitUntil: "networkidle0", timeout: 60000 });
    await waitForDeckReady(page);

    const slideCount = await page.evaluate(
      () => window.__deckStore.getState().totalSlides,
    );
    console.log(`▸ slide count = ${slideCount}`);

    if (slideCount !== STEPS_PER_SLIDE.length) {
      console.warn(
        `⚠️  STEPS_PER_SLIDE length(${STEPS_PER_SLIDE.length}) ≠ slideCount(${slideCount}). ` +
          `Check scripts/export-pdf.mjs — slide-meta.ts 와 동기화 필요.`,
      );
    }

    const pdfDoc = await PDFDocument.create();
    const pngPaths = [];

    for (let i = 0; i < slideCount; i++) {
      const steps = STEPS_PER_SLIDE[i] ?? 1;
      const hasVideo = i in VIDEO_SEEK_TARGETS;
      console.log(
        `▸ slide ${String(i + 1).padStart(2, "0")}/${slideCount}  steps=${steps}${
          hasVideo ? "  [video]" : ""
        }`,
      );

      await gotoSlideFinalStep(page, i, steps);

      // 1) 시간 기반 fade-in / stagger / 카드 reveal 이 끝날 때까지 충분히 대기
      //    (S01 1.8s+0.8s, S03 1.2s+0.4s, S11/S13/S15 1.45s+0.55s, S21 1.1s+0.9s 등 최대 ~2.6s)
      await sleep(3000);

      // 2) WAAPI 애니메이션이 남아있다면 추가 대기
      await waitForAnimationsSettled(page, 3000);

      // 3) 영상 프리즈 — 영상 슬라이드는 최종 프레임 / 그 외는 정지
      await freezeVideos(page, i);
      await sleep(hasVideo ? 600 : 200);

      const pngPath = path.join(
        DEBUG_DIR,
        `slide-${String(i + 1).padStart(2, "0")}.png`,
      );
      await page.screenshot({
        path: pngPath,
        type: "png",
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      });
      pngPaths.push(pngPath);
    }

    console.log(`▸ building PDF → ${OUT_PDF}`);
    for (const pth of pngPaths) {
      const bytes = await fs.readFile(pth);
      const img = await pdfDoc.embedPng(bytes);
      const pg = pdfDoc.addPage([WIDTH, HEIGHT]);
      pg.drawImage(img, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(OUT_PDF, pdfBytes);
    console.log(`✓ saved: ${OUT_PDF}`);
    console.log(`  (debug PNGs: ${DEBUG_DIR})`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
