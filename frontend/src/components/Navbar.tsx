import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-12 py-5 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Logo 區域 */}
      <Link to="/" className="flex items-center group">
        <div className="text-3xl font-light tracking-tighter text-[#79c4e0] flex items-center">
          <span className="text-4xl font-serif">A</span>live
          <div className="ml-2 relative">
             <span className="text-yellow-400 text-2xl">☀️</span>
             {/* 模擬心電圖小線條 */}
             <div className="absolute -left-4 top-1/2 w-4 h-[2px] bg-[#79c4e0]/40"></div>
          </div>
        </div>
      </Link>

      {/* 按鈕區域 */}
      <div className="flex items-center gap-8">
        <Link 
          to="/register" 
          className="text-gray-600 hover:text-[#79c4e0] font-medium transition-colors"
        >
          註冊
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-[#79c4e0] text-white rounded-full hover:bg-[#68b3cf] transition-all shadow-md active:scale-95"
        >
          登入
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;