import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 18theses.com 팔레트 — 모노크롬 블랙 + 단일 올리브 그린
        bg: {
          DEFAULT: "#000000",
          panel: "#222223",
          elevated: "#2d2d2e",
        },
        fg: {
          DEFAULT: "#f4f4e4",
          muted: "#d1d0c1",
          dim: "#6a6a5e",
        },
        border: {
          DEFAULT: "#333332",
          subtle: "rgba(244,244,228,0.08)",
        },
        accent: {
          DEFAULT: "#758c58",
          light: "#8fa870",
          dim: "#4a5a38",
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', '"Pretendard"', "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.03em",
        sub: "-0.02em",
        label: "0.08em",
      },
      borderRadius: {
        card: "20px",
        "card-lg": "30px",
      },
    },
  },
  plugins: [],
};

export default config;
