import axios from 'axios';

// 1. 建立 Axios 實例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials: true, // 關鍵：允許跨域攜帶 Cookie
});

// 2. 集中管理 API 路徑
const API_BASE = '/api';
export const API_ROUTES = {
  AUTH: {
    SIGNUP: `${API_BASE}/user/register`,
    LOGIN: `${API_BASE}/auth/login`,
    LOGOUT: `${API_BASE}/auth/logout`,
  },
  USER: {
    GETCALENDAR: `${API_BASE}/user/`
  }
};

export default api;