import React from 'react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "社福專線",
      links: ["緊急救護專線 119", "長照服務專線 1966", "衛福部福利專線 1957", "張老師輔導專線 1980", "生命線協談專線 1995", "各縣市民服務專線 1999", "自殺防治諮詢專線 1925"]
    },
    {
      title: "社福機構與專線",
      links: ["衛生福利部社會安全網-關懷e起來", "衛生福利部社區照顧關懷據點服務入口網", "財團法人華山社會福利慈善事業基金會", "財團法人雙福社會福利慈善事業基金會", "財團法人老人五老基金會", "社團法人中華民國老人福利關懷協會", "社團法人方舟協會"]
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 bg-[#1a6b9a] text-white transition-all duration-700 ease-in-out transform translate-y-[calc(100%-48px)] hover:translate-y-0 group shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
      
      {/* 1. 隱形觸發層：確保滑鼠在縮減條上方時就能觸發 */}
      <div className="absolute -top-2 left-0 w-full h-2 cursor-pointer"></div>

      {/* 2. 主要內容區：平時被推到下方，hover 時才顯示 */}
      <div className="max-w-7xl mx-auto px-12 pt-16 pb-8 grid grid-cols-1 md:grid-cols-3 gap-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">
              {section.title}
            </h3>
            <ul className="space-y-3 text-blue-50/80 text-sm">
              {section.links.map((link, i) => (
                <li key={i} className="hover:text-white transition-colors cursor-default">{link}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* 聯絡開發者 */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">聯絡開發者</h3>
          <div className="space-y-4 text-blue-50/80 text-sm">
            <div>
              <p className="text-[10px] uppercase opacity-50">Email</p>
              <a href="mailto:cysepz@gmail.com" className="hover:text-white">cysepz@gmail.com</a>
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-50">LinkedIn</p>
              <a href="https://linkedin.com/in/cysepz/" target="_blank" rel="noreferrer" className="hover:text-white">linkedin.com/in/cysepz/</a>
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-50">Phone</p>
              <p>(+886) 04-7350859</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 版權條：
          - 平時透過 absolute 定位在 Footer 的「頂部」作為拉環
          - Hover 時透過 translate-y 回歸到內容的最下方 (底部)
      */}
      <div className="h-[48px] w-full border-t border-white/10 px-12 bg-[#1a6b9a]
                    absolute top-0 left-0 
                    group-hover:relative group-hover:top-auto
                    flex items-center transition-all duration-700">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-blue-200/60 text-[10px] tracking-widest">
          <p className="flex items-center gap-2">
            &copy; {new Date().getFullYear()} Alive Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">隱私權政策</span>
            <span className="hover:text-white cursor-pointer transition-colors">服務條款</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;