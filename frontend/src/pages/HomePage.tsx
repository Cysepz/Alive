import React from 'react';

const HomePage: React.FC = () => {
  return (
    /* 使用 min-h-[80vh] 確保內容區塊有足夠高度，不被 Footer 擠壓 */
    <div className="relative min-h-[calc(100vh-80px)] bg-white flex flex-col font-sans overflow-x-hidden">
      
      {/* 裝飾性背景：右上方淡藍色漸層，增加空間深度感 */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#79c4e0]/5 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 grow flex flex-col md:flex-row items-center px-8 md:px-16 lg:px-24 py-12 md:py-0 max-w-7xl mx-auto w-full gap-12 lg:gap-24">
        
        {/* --- 左側文字內容區 --- */}
        <div className="md:w-3/5 space-y-10 order-2 md:order-1">
          <div className="space-y-6">            
            <article className="text-gray-600 space-y-8">
              <p className="text-lg md:text-xl leading-[2.2] text-justify font-light tracking-wide">
                選擇不婚不生的人越來越多，「獨居」不再只是高齡者的課題，
                而是這一整個世代都可能面對的日常。近年在韓國、日本等地出現的
                <span className="relative inline-block px-1 mx-1 font-normal text-gray-800 italic">
                  「孤獨死」
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-red-100 -z-10" />
                </span>
                新聞，也不斷提醒我們：自由選擇一個人生活的人，並不等於不需要被在乎。
              </p>
              
              <p className="text-lg md:text-xl leading-[2.2] text-justify font-light tracking-wide">
                <span className="text-2xl font-semibold text-[#79c4e0] tracking-tighter mr-2">Alive</span> 
                想做的，是為這樣的生活多鋪一層溫柔的安全網 — 讓忠誠選擇陪自己過日子的人，到最後一刻不必孤獨。
              </p>
            </article>
          </div>

          {/* 增加一個引導按鈕，增加畫面的平衡感 */}
          <div className="pt-4">
            <button className="px-8 py-3 bg-white border border-[#79c4e0] text-[#79c4e0] rounded-full hover:bg-[#79c4e0] hover:text-white transition-all duration-300 shadow-sm active:scale-95">
              了解更多服務內容
            </button>
          </div>
        </div>

        {/* --- 右側插圖區 --- */}
        <div className="md:w-2/5 flex justify-center items-center order-1 md:order-2">
          <div className="relative w-full group">
            {/* 圖片後方的光暈裝飾 */}
            <div className="absolute inset-0 bg-[#79c4e0]/10 rounded-full scale-90 blur-2xl group-hover:scale-100 transition-transform duration-700" />
            
            <img 
              src="/path-to-your-illustration.png" 
              alt="Alive Illustration" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.05)] transform group-hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>

      </main>

      {/* 底部裝飾線 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
    </div>
  );
};

export default HomePage;