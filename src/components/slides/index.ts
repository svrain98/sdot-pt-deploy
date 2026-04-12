import type { ComponentType } from "react";
import type { SlideProps } from "@/types/slide";

import S01_Title from "./S01_Title";
import S02_Problem from "./S02_Problem";
import S03_Bandwidth from "./S03_Bandwidth";
import S04_Paradigm from "./S04_Paradigm";
import S05_Concept from "./S05_Concept";
import S06_SemanticPipeline from "./S06_SemanticPipeline";
import S07_Compression from "./S07_Compression";
import S08_KPI from "./S08_KPI";
import S09_Avdiivka_Wave1 from "./S09_Avdiivka_Wave1";
import S10_RU_vs_UA from "./S10_RU_vs_UA";
import S11_Wave2_Decision from "./S11_Wave2_Decision";
import S12_Comparison from "./S12_Comparison";
import S13_Gaps from "./S13_Gaps";
import S14_Closing from "./S14_Closing";

// 슬라이드 인덱스 (0-based) 와 일치하는 컴포넌트 배열
export const SLIDES: ComponentType<SlideProps>[] = [
  S01_Title,
  S02_Problem,
  S03_Bandwidth,
  S04_Paradigm,
  S05_Concept,
  S06_SemanticPipeline,
  S07_Compression,
  S08_KPI,
  S09_Avdiivka_Wave1,
  S10_RU_vs_UA,
  S11_Wave2_Decision,
  S12_Comparison,
  S13_Gaps,
  S14_Closing,
];
