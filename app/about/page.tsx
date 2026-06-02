// app/about/page.tsx
import Link from 'next/link';
import Navbar from '../Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden flex flex-col">
      
      <header className="relative w-full h-[35vh] min-h-[280px] overflow-hidden flex bg-slate-900">
        <img 
          src="/hero-photo.JPG" 
          alt="AHAO XU Photography Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/30 z-10" />
        <div 
          className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.99) 8%, rgba(255, 255, 255, 0.92) 20%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0.45) 65%, rgba(255, 255, 255, 0.15) 85%, transparent 100%)` }}
        />
        <Navbar />
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-20">
        
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-bold font-jinxuan text-slate-900 tracking-wide relative pl-4 border-l-8 border-yellow-400 inline-block">
            關於我
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
          
          {/* 💻 電腦版專屬：左側大頭像 */}
          <div className="hidden md:block relative group">
            <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500"></div>
            <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative">
              <img src="/avatar.jpg" alt="AHAO XU Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="font-jinxuan text-slate-700 leading-loose">
            
            {/* ==========================================
                📱 手機版專屬：頭部名片區塊
            ========================================== */}
            <div className="flex md:hidden justify-between items-start gap-6 mb-8">
              
              <div className="flex-1 pt-1 flex flex-col">
                <h2 className="font-bold text-slate-900 mb-4 leading-tight">
                  <span className="text-[22px]">許庭豪</span><br />
                  <span className="text-[13px] text-slate-700 tracking-widest inline-block">AHAO XU</span>
                </h2>
                
                <div className="flex flex-col items-start gap-3.5">
                  <span className="inline-block px-2.5 py-0.5 border border-slate-200 bg-white text-slate-500 rounded-full text-[11px] font-medium tracking-widest">
                    配音員
                  </span>
                  
                  <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 mt-0.5">
                    <a href="mailto:ahaoedit@gmail.com" className="text-slate-500 hover:text-amber-500 transition text-[13px] flex items-center gap-1.5 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      Email
                    </a>
                    
                    {/* 🚀 替代方案：使用乾淨、保證不破圖的線條對話框，與 Email 風格完美統一 */}
                    <a href="https://line.me/ti/p/G9U5EsLsNe" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-600 transition text-[13px] flex items-center gap-1.5 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      LINE
                    </a>
                  </div>
                </div>

                <div className="mt-[42px] mb-1">
                  <div className="w-[95%] h-[1px] bg-slate-100"></div>
                </div>
              </div>

              <div className="w-36 sm:w-40 shrink-0 relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-xl transform translate-x-1.5 translate-y-1.5 shadow-sm"></div>
                <img src="/avatar.jpg" alt="AHAO XU Profile" className="relative z-10 w-full aspect-[4/5] object-cover rounded-xl shadow-md border border-slate-200" />
              </div>
            </div>

            {/* ==========================================
                💻 電腦版專屬：頭部區塊
            ========================================== */}
            <div className="hidden md:block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">許庭豪 AHAO XU</h2>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-block px-3 py-1 border border-slate-200 bg-white text-slate-500 rounded-full text-[11px] font-medium tracking-widest">
                  配音員
                </span>
                <a href="mailto:ahaoedit@gmail.com" className="text-slate-400 hover:text-amber-500 transition text-[13px] flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Email
                </a>
                
                {/* 🚀 電腦版同步替換：線條對話框 */}
                <a href="https://line.me/ti/p/G9U5EsLsNe" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition text-[13px] flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  LINE
                </a>
              </div>
            </div>

            {/* 共用自我介紹文字 */}
            <div className="space-y-5 text-[15.5px] md:text-base text-justify">
              <p>
                曾以影音維生。因為喜歡聲音，轉換跑道進修配音。<br className="hidden md:inline" />
                <strong>現主要承接「廣告配音」業務</strong>，不過若有影音需求亦可聯繫。
              </p>
              <p>興趣攝影，以零碎的片段編織成具有張力的故事。</p>
            </div>

            <div className="mt-10 bg-amber-50/60 border border-amber-100/80 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0"></span><p className="font-bold text-slate-800 text-[14.5px] tracking-wide">天籟國際文創配音班 15 期</p></div>
              <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0"></span><p className="font-bold text-slate-800 text-[14.5px] tracking-wide">聲柒柒廣告配音班 28 期</p></div>
            </div>

            <hr className="border-slate-100 my-10" />

            <p className="text-[13px] text-slate-400 leading-[2.2]">
              <span className="font-bold text-slate-500 text-[14px] block mb-3">工作經歷：</span>
              一件襯衫 新媒體平台 - 剪輯師/攝影助理<br />
              Harry Image Studio - 剪輯師<br />
              HC Studio - 剪輯師<br />
              加樂影像 - 剪輯師<br />
              貳月婚紗 - 攝影師合作剪輯師<br />
              白璃生醫有限公司 - 影音製作人<br />
              鏡電視股份有限公司 - 鏡新聞記者
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 text-xs text-slate-400 border-t border-slate-100 bg-slate-50 mt-auto">
        &copy; 2026 AHAO XU. Powered by Next.js & Notion API.
      </footer>
    </div>
  );
}