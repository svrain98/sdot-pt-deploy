#!/usr/bin/env bash
# sdot-pt 발표 에셋 자동 복사 스크립트
# 사용법: bash scripts/copy-assets.sh [--force]
#
# 복사 대상:
#   1. sdot-slide 학술 차트 PNG  → public/images/figures/
#   2. sdot-edge 세션 triples.jsonld + thumbnails  → public/data/ + public/images/thumbnails/
#   3. sdot-clip MP4 (경량 재인코딩 옵션)  → public/videos/
#   4. sdot-decision_db raw JSON  → public/data/
#   5. 팔란티어 오브젝트 배치도 + mon-graph SVG  → public/images/

set -euo pipefail

# 경로 설정 — sdot 모노레포 루트 기준
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SDOT_ROOT="$(cd "$PT_ROOT/.." && pwd)"

SRC_SLIDE="$SDOT_ROOT/sdot-slide/assets/figures/semantic_format"
SRC_EDGE_SESSION="$SDOT_ROOT/sdot-edge/sessions/2026-04-11_1329_phase5_final_colors"
SRC_CLIP="$SDOT_ROOT/sdot-clip"
SRC_DECISION_RAW="$SDOT_ROOT/sdot-decision_db/raw"
SRC_SLIDE_DATA="$SDOT_ROOT/sdot-slide/data"
SRC_PALANTIR="$SDOT_ROOT/팔란티어 오브젝트 배치도.png"
SRC_MONGRAPH="$SDOT_ROOT/monocle-graph-components__graph__17qrwj1 mon-graph.svg"

DEST_FIG="$PT_ROOT/public/images/figures"
DEST_THUMB="$PT_ROOT/public/images/thumbnails"
DEST_VIDEO="$PT_ROOT/public/videos"
DEST_DATA="$PT_ROOT/public/data"
DEST_IMG="$PT_ROOT/public/images"

mkdir -p "$DEST_FIG" "$DEST_THUMB" "$DEST_VIDEO" "$DEST_DATA" "$DEST_IMG"

FORCE=0
if [[ "${1:-}" == "--force" ]]; then FORCE=1; fi

cp_if_newer() {
  local src="$1"; local dst="$2"
  if [[ ! -f "$src" ]]; then
    echo "  ⚠ skip (missing): $src"
    return 0
  fi
  if [[ $FORCE -eq 1 || ! -f "$dst" || "$src" -nt "$dst" ]]; then
    cp "$src" "$dst"
    echo "  ✓ $(basename "$dst")"
  else
    echo "  = $(basename "$dst") (up-to-date)"
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  sdot-pt Asset Copier"
echo "  PT_ROOT: $PT_ROOT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "→ [1/5] sdot-slide 학술 차트"
cp_if_newer "$SRC_SLIDE/fig1_size_comparison.png" "$DEST_FIG/fig1.png"
cp_if_newer "$SRC_SLIDE/fig2_compression_ratio.png" "$DEST_FIG/fig2.png"
cp_if_newer "$SRC_SLIDE/fig5_tx_time_kpi.png" "$DEST_FIG/fig5.png"
cp_if_newer "$SRC_SLIDE/fig6_entropy_comparison.png" "$DEST_FIG/fig6.png"
cp_if_newer "$SRC_SLIDE/fig7_radar_eval_axes.png" "$DEST_FIG/fig7.png"
cp_if_newer "$SRC_SLIDE/fig8_architecture.png" "$DEST_FIG/fig8.png"

echo ""
echo "→ [2/5] sdot-edge 세션 artifacts"
cp_if_newer "$SRC_EDGE_SESSION/triples.jsonld" "$DEST_DATA/triples_sample.jsonld"
# 썸네일은 glob 패턴 처리 (evt_001~003 선별)
if [[ -d "$SRC_EDGE_SESSION/thumbnails" ]]; then
  idx=1
  for f in "$SRC_EDGE_SESSION/thumbnails"/evt_001_*.jpg \
           "$SRC_EDGE_SESSION/thumbnails"/evt_002_*.jpg \
           "$SRC_EDGE_SESSION/thumbnails"/evt_003_*.jpg; do
    if [[ -f "$f" ]]; then
      cp_if_newer "$f" "$DEST_THUMB/evt_$(printf '%03d' $idx).jpg"
      idx=$((idx + 1))
    fi
  done
else
  echo "  ⚠ skip: sdot-edge thumbnails directory not found"
fi

echo ""
echo "→ [3/5] sdot-clip 영상 (원본 복사, 필요 시 ffmpeg 재인코딩)"
# 대용량 영상 주의 — 필요한 것만 복사 (약 400MB)
cp_if_newer "$SRC_CLIP/04_전역정찰.mp4" "$DEST_VIDEO/04_recon.mp4"
cp_if_newer "$SRC_CLIP/05_야간_감시및타격.mp4" "$DEST_VIDEO/05_night.mp4"
cp_if_newer "$SRC_CLIP/06_전역정찰_화력유도.mp4" "$DEST_VIDEO/06_fire.mp4"
cp_if_newer "$SRC_CLIP/08-2_전차정찰-드론타격(드론타격).mp4" "$DEST_VIDEO/08_strike.mp4"

echo ""
echo "→ [4/5] sdot-decision_db + sdot-slide data"
cp_if_newer "$SRC_DECISION_RAW/decision_points.json" "$DEST_DATA/decision_points.json"
cp_if_newer "$SRC_DECISION_RAW/c2_status.json" "$DEST_DATA/c2_status.json"
cp_if_newer "$SRC_SLIDE_DATA/semantic_format_poc_2026-04-10.json" "$DEST_DATA/compression_stats.json"

echo ""
echo "→ [5/5] 팔란티어 레퍼런스 이미지"
cp_if_newer "$SRC_PALANTIR" "$DEST_IMG/palantir_objects.png"
cp_if_newer "$SRC_MONGRAPH" "$DEST_IMG/mon_graph.svg"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. 누락된 에셋은 <PlaceholderMedia /> 가 자동 폴백."
echo "  수동 교체 필요:"
echo "    - public/images/ru_c2_still.png        (S10 좌측)"
echo "    - public/images/ua_sdot_dashboard.png  (S10 우측)"
echo "    - public/images/decision_card_ui.png   (S11 배경 옵션)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
