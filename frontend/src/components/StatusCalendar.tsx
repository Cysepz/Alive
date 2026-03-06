import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  bitmap: number; 
}

const StatusCalendar: React.FC<Props> = ({ bitmap }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="bg-white/70 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50 w-72 aspect-square flex flex-col justify-between relative overflow-hidden">
      
      {/* 月份標題 */}
      <div className="relative z-10 flex justify-between items-center px-1">
        <h3 className="text-2xl font-serif font-black text-gray-800 tracking-tighter">
          {currentMonth} <span className="text-sm font-medium text-gray-400 ml-0.5">月</span>
        </h3>
        <div className="w-2 h-2 rounded-full bg-[#79c4e0]/30"></div>
      </div>
      
      {/* 日曆網格 */}
      <div className="relative z-10 grid grid-cols-7 gap-y-1 gap-x-1 text-center flex-1 mt-4">
        {/* 修正 Key 重複問題：使用 index 作為唯一識別 */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={`header-${i}`} className="text-[9px] text-gray-300 font-black uppercase tracking-tighter self-center">{d}</span>
        ))}
        
        {days.map(d => {
          /**
           * 位元運算檢查邏輯：
           * 如果後端 1 號是第 0 位 (2^0)，5 號是第 4 位 (2^4 = 16)
           * 我們使用 (bitmap >> (d - 1)) & 1 來檢查該位元是否為 1
           */
          const isChecked = (bitmap >> (d - 1)) & 1;
          const isToday = d === today;
          const isPast = d < today;
          
          return (
            <div key={d} className="flex items-center justify-center">
              <div className={`
                relative w-8 h-8 flex items-center justify-center rounded-full text-[11px] transition-all duration-300
                ${(isPast || isChecked) ? 'bg-gray-100/60' : 'text-gray-400'} 
                ${isToday && !isChecked ? 'ring-2 ring-yellow-400/40 bg-yellow-50/50 animate-pulse' : ''}
              `}>
                <span className={`z-10 transition-opacity ${(isPast || isChecked) ? 'text-gray-400 opacity-40' : 'text-gray-400 font-medium'}`}>
                  {d}
                </span>

                {isChecked === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Check 
                      size={18} 
                      strokeWidth={4} 
                      className="text-[#79c4e0] drop-shadow-sm animate-in zoom-in duration-300" 
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusCalendar;