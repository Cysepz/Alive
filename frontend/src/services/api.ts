// comment: github action 卡住，只是 for 測試觸發
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
    CHECK_IN: `${API_BASE}/user/check-in`,
    GET_RECORD: `${API_BASE}/user/get-record`,
    GET_PROFILE: `${API_BASE}/user/get-profile`,
  }
};

export default api;
