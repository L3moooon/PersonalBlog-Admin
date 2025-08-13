import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
const target = 'http://182.92.105.35:3000'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src"), //相对别名配置，使用@代替src
    },
  },
  server: {
    open: false,
    headers: {
      'Cross-Origin-Opener-Policy': 'cross-origin',
    },
    proxy: {
      '/': {
        target,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/web': ''
        // }
      },
      // '/home': {
      //   target, // 后端 API 地址
      //   changeOrigin: true, // 允许跨域
      //   // rewrite: (path) => path.replace(/^\/prod-api/, ''),
      // },
      // '/poem-api': {
      //   target: 'https://v1.jinrishici.com', // 目标API地址
      //   changeOrigin: true, // 开启跨域
      //   rewrite: (path) => path.replace(/^\/poem-api/, '') // 重写路径
      // }
    },
  },
  optimizeDeps: {
    include: ['highlight.js']
  }
})
