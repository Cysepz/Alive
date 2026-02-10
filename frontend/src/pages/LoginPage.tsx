import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSocialLogin = (platform: string) => {
    console.log(`正在透過 ${platform} 登入...`);
    window.location.href = authService.getOAuth2Url(platform);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-white selection:bg-[#79c4e0]/30">
      <div className="w-full max-w-sm space-y-3">
        <div className="text-center space-y-1.5">
          {/* 副標題：放在主標題上方，作為引導語，使用 Apple 標誌性的冷色調小字 */}
          <p className="text-[#79c4e0] text-[12px] font-semibold uppercase tracking-[0.25em]">
            Stay Alive • Stay Connected
          </p>
          {/* 裝飾線與 Slogan：讓視覺有個優雅的結束 */}
          <div className="pt-4 flex flex-col items-center">
            <div className="w-8 h-0.5 bg-gray-100 rounded-full mb-3" />
        </div>
      </div>
        
        {/* Google 登入 */}
        <button 
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-start px-6 py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group active:scale-[0.98]"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 mr-4" />
          <span className="text-gray-700 font-semibold">Continue with google</span>
        </button>

        {/* Facebook 登入 */}
        <button 
          onClick={() => handleSocialLogin('facebook')}
          className="w-full flex items-center justify-start px-6 py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-6 h-6 mr-4" />
          <span className="text-gray-700 font-semibold">Continue with Facebook</span>
        </button>

        {/* LINE 登入 */}       
        <button 
          onClick={() => handleSocialLogin('line')}
          className="w-full flex items-center justify-start px-6 py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
        >
          {/* <div className="w-5 h-5 bg-[#00B900] rounded-md flex items-center justify-center mr-4">
            <span className="text-white text-[8px] font-black">LINE</span>
          </div>
          <span className="text-gray-700 font-semibold text-sm">Continue with LINE</span> */}
                    <div className="w-6 h-6 bg-[#00B900] rounded flex items-center justify-center mr-4">
            <span className="text-white text-[9px] font-black">LINE</span>
          </div>
          <span className="text-gray-700 font-semibold">Continue with LINE</span>
        </button>

        {/* 手機簡訊登入 */}
        <button 
          className="w-full flex items-center justify-start px-6 py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-gray-700 font-semibold">使用手機簡訊繼續</span>
        </button>
        

        {/* 取消按鈕 */}
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-start px-6 py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="text-gray-700 font-semibold">取消</span>
        </button>
      </div>


    </div>
  );
};

export default LoginPage;