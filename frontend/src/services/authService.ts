import api, { API_ROUTES } from "./api";

const BASE_URL = api.defaults.baseURL || '';

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
    console.log(String(BASE_URL));
    return `${String(BASE_URL)}/oauth2/authorization/${platform}`;
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