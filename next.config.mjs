/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 발표용 정적 자산 전용 앱 — 이미지 최적화 끄고 원본 그대로 서빙
  images: { unoptimized: true },
};

export default nextConfig;
