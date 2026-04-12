import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "S-DOT — 제5회 육군 AI 아이디어 공모전 본선 발표",
  description:
    "Edge AI 기반 초경량 시맨틱 전송 체계 (S-DOT) — 영상이 아닌 의미를 전송하다",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
