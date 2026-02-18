import React from 'react';

interface Props {
  onCheckIn: () => void;
}

const CheckInOverlay: React.FC<Props> = ({ onCheckIn }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-white/40 transition-all">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-blue-50 text-center max-w-sm mx-6 animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-6">☀️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">早安！Alive</h2>
        <p className="text-gray-400 mb-10 leading-relaxed font-light">
          在開始這一天之前，<br/>請先回報平安。
        </p>
        <button 
          onClick={onCheckIn}
          className="w-full py-4 bg-[#1a6b9a] text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-[#155a82] active:scale-95 transition-all"
        >
          我平安無事
        </button>
      </div>
    </div>
  );
};

export default CheckInOverlay;