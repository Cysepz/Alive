import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // 根據當前模式 (development/production) 載入變數
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: true, // 開啟區域網路監聽
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // 從 .env 取得
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});