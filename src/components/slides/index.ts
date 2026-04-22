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
// 파이프라인 줌 시퀀스 (개발자 수정본)
import S10_PipelineOverview from "./S10_PipelineOverview";
import S11_EdgeZoom from "./S11_EdgeZoom";
import S12_PipelineReturn1 from "./S12_PipelineReturn1";
import S13_FoundryZoom from "./S13_FoundryZoom";
import S14_PipelineReturn2 from "./S14_PipelineReturn2";
import S15_AIPZoom from "./S15_AIPZoom";
import S16_KPI from "./S16_KPI";
import S17_Scenario1 from "./S17_Scenario1";
import S18_InfoGap from "./S18_InfoGap";
import S19_Scenario2 from "./S19_Scenario2";
import S20_NextStep from "./S20_NextStep";
import S21_Closing from "./S21_Closing";
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
  S10_PipelineOverview,
  S11_EdgeZoom,
  S12_PipelineReturn1,
  S13_FoundryZoom,
  S14_PipelineReturn2,
  S15_AIPZoom,
  S16_KPI,
  S17_Scenario1,
  S18_InfoGap,
  S19_Scenario2,
  S20_NextStep,
  S21_Closing,
  SA1_Appendix_Bandwidth,
];
