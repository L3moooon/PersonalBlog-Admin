import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
const target = 'http://localhost:3001/dev-api/'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src"), //相对别名配置，使用@代替src
    },
  },
  server: {
    // port: 5173,
    open: false,
    headers: {
      'Cross-Origin-Opener-Policy': 'cross-origin',
    },
    proxy: {
      // '/home': {
      //   target, // 后端 API 地址
      //   changeOrigin: true, // 允许跨域
      //   // rewrite: (path) => path.replace(/^\/prod-api/, ''),
      // },
    },
  },
})
