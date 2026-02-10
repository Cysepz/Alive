import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  // 1. 自動捲動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      {/* 導覽列 */}
      <Navbar />

      {/* 2. 內容主區域 
          - pb-24: 這是重點！為底部的 Fixed Footer 預留呼吸空間。
          - 這樣 HomePage 的內容就不會被蓋住，且所有頁面保持一致。
      */}
      {/* <main className="flex-grow w-full pb-24 md:pb-32"> */}
        <main className="flex-1 flex flex-col min-h-0">
        <Outlet /> 
      </main>

      {/* 頁尾 (Fixed 定位) */}
      <Footer />
    </div>
  );
};

export default MainLayout;