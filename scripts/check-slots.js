#!/usr/bin/env node
/**
 * sdot-pt 슬롯 검사 — 어떤 에셋이 아직 채워지지 않았는지 출력.
 * 사용법: npm run assets:check
 */

const fs = require("fs");
const path = require("path");

const PT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_ROOT = path.join(PT_ROOT, "public");

// slot id → 기대 경로 매핑 (src/lib/assets.ts 와 동기)
const SLOTS = [
  { slot: "S01_bg_drone_recon", file: "videos/04_recon.mp4" },
  { slot: "S03_video_glitch", file: "videos/05_night.mp4" },
  { slot: "S06_raw_drone_feed", file: "videos/08_strike.mp4" },
  { slot: "S06_detection_thumb_1", file: "images/thumbnails/evt_001.jpg" },
  { slot: "S06_detection_thumb_2", file: "images/thumbnails/evt_002.jpg" },
  { slot: "S06_detection_thumb_3", file: "images/thumbnails/evt_003.jpg" },
  { slot: "S07_fig1_size_comparison", file: "images/figures/fig1.png" },
  { slot: "S07_fig2_compression_ratio", file: "images/figures/fig2.png" },
  { slot: "S08_fig5_tx_time_kpi", file: "images/figures/fig5.png" },
  { slot: "S08_fig7_radar", file: "images/figures/fig7.png" },
  { slot: "S09_bg_night_surveillance", file: "videos/05_night.mp4" },
  { slot: "S10_ru_c2_still", file: "images/ru_c2_still.png" },
  { slot: "S10_ua_sdot_dashboard", file: "images/ua_sdot_dashboard.png" },
  { slot: "S11_decision_card_ui", file: "images/decision_card_ui.png" },
  { slot: "S11_palantir_objects", file: "images/palantir_objects.png" },
  { slot: "S11_mon_graph", file: "images/mon_graph.svg" },
  { slot: "S14_bg_fire_direction", file: "videos/06_fire.mp4" },
];

let filled = 0;
let missing = [];

for (const { slot, file } of SLOTS) {
  const full = path.join(PUBLIC_ROOT, file);
  if (fs.existsSync(full)) {
    filled++;
  } else {
    missing.push({ slot, file });
  }
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  sdot-pt slot status`);
console.log(`  ${filled} / ${SLOTS.length} filled`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

if (missing.length === 0) {
  console.log("  ✓ 모든 슬롯이 실물 에셋으로 채워졌습니다!");
  process.exit(0);
}

console.log(`\n  ⚠ 미교체 슬롯 ${missing.length}개:`);
for (const m of missing) {
  console.log(`    ✕ ${m.slot.padEnd(30)} → public/${m.file}`);
}
console.log("\n  bash scripts/copy-assets.sh 로 자동 복사 가능한 것 먼저 시도하세요.");
process.exit(1);
