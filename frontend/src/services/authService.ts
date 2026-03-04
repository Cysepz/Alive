import api, { API_ROUTES } from "./api";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface SignupRequest {
  account: string;
  username: string;
  birthday: string;
  address: string;
  situation: string;
  phone: string;
}

export const authService = {
  getOAuth2Url: (platform: string) => {
    const baseWithoutApi = API_BASE.replace(/\/api$/, '');
    console.log(baseWithoutApi);
        return `${baseWithoutApi}/oauth2/authorization/${platform}`;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },

  signup: async (data: SignupRequest) => {
    const response = await api.post(API_ROUTES.AUTH.SIGNUP, data);
    console.log(response);
    return response.data; // 通常回傳後端的成功訊息或 User 物件
  }
};