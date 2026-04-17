import type { ComponentType } from "react";
import type { SlideProps } from "@/types/slide";

import S01_Title from "./S01_Title";
import S02_Presenters from "./S02_Presenters";
import S03_Question from "./S03_Question";
import S04_Problem from "./S04_Problem";
import S05_TacticalAI from "./S05_TacticalAI";
import S06_Paradigm from "./S06_Paradigm";
import S07_Concept from "./S07_Concept";
import S08_DemoConditions from "./S08_DemoConditions";
import S09_DemoScenario from "./S09_DemoScenario";
import S10_SemanticPipeline from "./S10_SemanticPipeline";
import S11_Compression from "./S11_Compression";
import S12_KPI from "./S12_KPI";
import S13_Avdiivka from "./S13_Avdiivka";
import S14_RU_vs_UA from "./S14_RU_vs_UA";
import S15_Decision from "./S15_Decision";
import S16_Comparison from "./S16_Comparison";
import S17_NextStep from "./S17_NextStep";
import S18_Closing from "./S18_Closing";
import SA1_Appendix_Bandwidth from "./SA1_Appendix_Bandwidth";

// 슬라이드 인덱스 (0-based) 와 일치하는 컴포넌트 배열
export const SLIDES: ComponentType<SlideProps>[] = [
  S01_Title,
  S02_Presenters,
  S03_Question,
  S04_Problem,
  S05_TacticalAI,
  S06_Paradigm,
  S07_Concept,
  S08_DemoConditions,
  S09_DemoScenario,
  S10_SemanticPipeline,
  S11_Compression,
  S12_KPI,
  S13_Avdiivka,
  S14_RU_vs_UA,
  S15_Decision,
  S16_Comparison,
  S17_NextStep,
  S18_Closing,
  SA1_Appendix_Bandwidth,
];
