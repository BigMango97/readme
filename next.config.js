/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache")

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  mode: 'production', 
  disableDevLogs: true, //log닫기
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["btsimagebucket.s3.ap-northeast-2.amazonaws.com","dn-img-page.kakao.com"],
  },
})

module.exports = nextConfig
