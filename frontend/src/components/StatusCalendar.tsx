import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  bitmap: string;
}

const StatusCalendar: React.FC<Props> = ({ bitmap }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="bg-white/70 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50 w-72 aspect-square flex flex-col justify-between relative overflow-hidden">
      
      {/* 月份標題區 */}
      <div className="relative z-10 flex justify-between items-center px-1">
        <h3 className="text-2xl font-serif font-black text-gray-800 tracking-tighter">
          {currentMonth} <span className="text-sm font-medium text-gray-400 ml-0.5">月</span>
        </h3>
        {/* 裝飾點 */}
        <div className="w-2 h-2 rounded-full bg-[#79c4e0]/30"></div>
      </div>
      
      {/* 日曆網格 */}
      <div className="relative z-10 grid grid-cols-7 gap-y-1 gap-x-1 text-center flex-1 mt-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <span key={d} className="text-[9px] text-gray-300 font-black uppercase tracking-tighter self-center">{d}</span>
        ))}
        
        {days.map(d => {
          const isChecked = bitmap[d - 1] === '1';
          const isToday = d === today;
          const isPast = d < today;
          
          return (
            <div key={d} className="flex items-center justify-center">
              <div className={`
                relative w-8 h-8 flex items-center justify-center rounded-full text-[11px] transition-all duration-300
                ${(isPast || isChecked) ? 'bg-gray-100/60' : 'text-gray-400'} 
                ${isToday && !isChecked ? 'ring-2 ring-yellow-400/40 bg-yellow-50/50 animate-pulse' : ''}
              `}>
                {/* 日期數字 - 將過去日期與打卡日期的樣式完全統一 */}
                <span className={`z-10 transition-opacity ${(isPast || isChecked) ? 'text-gray-400 opacity-40' : 'text-gray-400 font-medium'}`}>
                  {d}
                </span>

                {/* 藍色勾勾 - 僅在已打卡時顯示 */}
                {isChecked && (
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