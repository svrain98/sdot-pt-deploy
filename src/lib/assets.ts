// 에셋 경로 상수
// 로컬: public/ 파일, 배포: Cloudflare Stream HLS URL

// Cloudflare Stream HLS URL (배포용)
// .m3u8 URL은 HlsVideo 컴포넌트에서 hls.js로 재생
export const VIDEO = {
  MAIN: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/e9258b292e4120ea99dfac71be7a588b/manifest/video.m3u8",
  MAIN_02: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/b89186f83b057747091ec97ad55fb5ec/manifest/video.m3u8",
  PALANTIR_OBJECT: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/6381ae76719fb5ec750c0796b4a80b3c/manifest/video.m3u8",
  PALANTIR_DASHBOARD: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/49e924a0a939c83417c63fac93d70e2d/manifest/video.m3u8",
  S03_GLITCH: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/d011a41ae7288ce82fe0dfa07ed28172/manifest/video.m3u8",
  S06_DRONE_FEED: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/8f3231dd7c8e0a3220a3126fbd50868f/manifest/video.m3u8",
  S09_NIGHT_SURVEILLANCE: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/69599729a7f2381f11ed5af551932aea/manifest/video.m3u8",
  S10_UA_DASHBOARD: "https://customer-8tsjql0rhg5ugd98.cloudflarestream.com/572f2bde3a063d690e0e4d891ecf2795/manifest/video.m3u8",
} as const;

export const IMAGE = {
  // sdot-slide 학술 차트
  FIG1_SIZE_COMPARISON: "/images/figures/fig1.png",
  FIG2_COMPRESSION_RATIO: "/images/figures/fig2.png",
  FIG5_TX_TIME_KPI: "/images/figures/fig5.png",
  FIG6_ENTROPY: "/images/figures/fig6.png",
  FIG7_RADAR: "/images/figures/fig7.png",
  FIG8_ARCHITECTURE: "/images/figures/fig8.png",
  // sdot-edge YOLO 탐지 결과 썸네일
  THUMB_EVT_001: "/images/thumbnails/evt_001.jpg",
  THUMB_EVT_002: "/images/thumbnails/evt_002.jpg",
  THUMB_EVT_003: "/images/thumbnails/evt_003.jpg",
  // 팔란티어 레퍼런스
  PALANTIR_OBJECTS: "/images/palantir_objects.png",
  MON_GRAPH: "/images/mon_graph.svg",
  // 사용자 별도 프론트 스크린샷
  DECISION_CARD_UI: "/images/decision_card_ui.png",
  RU_C2_STILL: "/images/ru_c2_still.png",
  UA_SDOT_DASHBOARD: "/images/ua_sdot_dashboard.png",
} as const;

export const DATA = {
  COMPRESSION_STATS: "/data/compression_stats.json",
  TRIPLES_SAMPLE: "/data/triples_sample.jsonld",
  DECISION_POINTS: "/data/decision_points.json",
  C2_STATUS: "/data/c2_status.json",
} as const;

// RDF triple 타이핑 연출용 fallback 샘플
export const FALLBACK_TRIPLES = [
  { s: "unit:RU-2S19-Msta", p: "rdf:type", o: "mil:SelfPropelledHowitzer" },
  { s: "unit:RU-2S19-Msta", p: "detection:thermal", o: "qty:18" },
  { s: "unit:RU-2S19-Msta", p: "geo:location", o: "geo:37.6912,48.1507" },
  { s: "unit:RU-2S19-Msta", p: "activity:phase", o: "activity:prep-fire" },
  { s: "unit:RU-2S19-Msta", p: "time:observed", o: "2023-10-10T04:00:00Z" },
  { s: "unit:RU-2S19-Msta", p: "threat:level", o: "threat:high" },
];

// 슬라이드 07 압축 수치
export const COMPRESSION_DEMO = {
  rawBytes: 835_200,
  semanticBytes: 48,
  ratio: 17_401,
};

// 슬라이드 08 KPI
export const KPI_HEADLINE = [
  { label: "압축률", value: "278,383", unit: ":1", color: "cyan" },
  { label: "페이로드", value: "74", unit: "Bytes", color: "green" },
  { label: "전송시간", value: "94", unit: "ms @9.6kbps", color: "amber" },
  { label: "무결성", value: "100", unit: "%", color: "red" },
] as const;
