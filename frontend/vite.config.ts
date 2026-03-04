import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // 根據當前模式 (development/production) 載入變數
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: '/',
    server: {
      host: true, // 開啟區域網路監聽
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080', // 從 .env 取得
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // 確保輸出目錄與 GitHub Action 設定一致
      outDir: 'dist',
      // 確保產生資產清單，有助於除錯
      manifest: true,
    },
  };
});