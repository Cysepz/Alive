// src/services/authService.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  getOAuth2Url: (platform: string) => {
    const baseWithoutApi = API_BASE.replace(/\/api$/, '');
    console.log(baseWithoutApi);
        return `${baseWithoutApi}/oauth2/authorization/${platform}`;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
};