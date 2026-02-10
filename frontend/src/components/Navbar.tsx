import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LogoImg from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  // 定義樣式
  const activeStyles = "bg-[#79c4e0] text-white shadow-md";
  const inactiveStyles = "text-gray-600 hover:text-[#79c4e0] hover:bg-gray-50";

  return (
    <nav className="sticky top-0 h-20 z-50 flex justify-between items-center px-12 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Logo 區域 */}
      <Link to="/" className="flex items-center group">
        <div className="flex items-center gap-3">
            <img 
              src={LogoImg} 
              alt="Alive Logo" 
              className="w-20 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
        </div>
      </Link>

      {/* 按鈕區域 */}
      <div className="flex items-center gap-8">
        <Link 
          to="/get-start?mode=register" 
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 active:scale-95 ${
            mode === 'register' ? activeStyles : inactiveStyles
          }`}
        >
          註冊
        </Link>
        <Link 
          to="/get-start?mode=login" 
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 active:scale-95 ${
            mode === 'login' || !mode ? activeStyles : inactiveStyles
          }`}
        >
          登入
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;