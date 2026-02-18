import React, { useState, useEffect } from 'react';
import StatusCalendar from '../components/StatusCalendar';
import CheckInOverlay from '../components/CheckInOverlay';

const HomePage: React.FC = () => {
  const [bitmap, setBitmap] = useState<string>(localStorage.getItem('alive_bitmap') || "0".repeat(31));
  const todayIndex = new Date().getDate() - 1;
  const [hasCheckedIn, setHasCheckedIn] = useState(bitmap[todayIndex] === '1');

  const handleCheckIn = () => {
    const newBitmap = bitmap.substring(0, todayIndex) + "1" + bitmap.substring(todayIndex + 1);
    setBitmap(newBitmap);
    localStorage.setItem('alive_bitmap', newBitmap);
    setHasCheckedIn(true);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (!hasCheckedIn) {
      document.body.style.overflow = 'hidden';
    }
  }, [hasCheckedIn]);

  return (
    <div className="h-full w-full bg-[#f5f5f7] selection:bg-[#79c4e0]/30 font-sans overflow-y-auto custom-scrollbar">
      {!hasCheckedIn && <CheckInOverlay onCheckIn={handleCheckIn} />}

      <main className={`max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 transition-all duration-1000 ${!hasCheckedIn ? 'blur-3xl scale-95 pointer-events-none' : 'blur-0 scale-100'}`}>
        
        {/* 左側：側邊欄 (Sidebar) */}
        <aside className="md:w-[280px] space-y-6 flex-shrink-0">
          <StatusCalendar bitmap={bitmap} />
          
          <div className="bg-white/70 backdrop-blur-md p-7 rounded-[2.5rem] shadow-sm border border-white/50">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 text-center md:text-left">Continuous</p>
            <p className="text-[#1a6b9a] text-4xl font-black tracking-tighter text-center md:text-left">15 <span className="text-sm font-medium text-gray-300">Days</span></p>
          </div>

          <div className="bg-[#fef9c3]/40 p-7 rounded-[2.5rem] border border-yellow-100/50 shadow-sm">
            <p className="text-yellow-900/50 text-sm leading-relaxed font-medium italic">
              「冷知識：在關島，每一分鐘都會經過 60 秒。」
            </p>
          </div>
        </aside>

        {/* 右側：主動態流 (Main Feed) */}
        <section className="flex-1 space-y-8">
          {/* 發佈狀態框 */}
          <div className="bg-white rounded-[2rem] shadow-sm p-3 pl-6 flex items-center gap-4 border border-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 shadow-inner" />
            <input 
              type="text" 
              placeholder="分享今天的平安..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-600 font-medium" 
            />
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold active:scale-95 transition-all shadow-lg shadow-gray-200">
              發佈
            </button>
          </div>

          {/* 貼文內容卡片 */}
          <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-white p-10 space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#79c4e0]/10 flex items-center justify-center shadow-inner text-xl">👤</div>
              <div>
                <h5 className="font-bold text-gray-800 text-lg tracking-tight">Alive User</h5>
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">2 hours ago</p>
              </div>
            </div>
            
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              username 還活著
            </p>
            
            <div className="pt-4 border-t border-gray-50 flex justify-start">
              <button className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors">
                <span className="text-lg">❤️</span>
                <span className="text-xs font-bold">12</span>
              </button>
            </div>
          </div>
        </section>

      </main>
      {/* 為了美觀，可以在底部加一個 spacer */}
      <div className="h-10" />
    </div>
  );
};

export default HomePage;