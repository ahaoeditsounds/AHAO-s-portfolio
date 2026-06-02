// app/page.tsx
import Link from 'next/link';
import { getFeaturedWorks } from '@/lib/notion'; 
import FeaturedSection from './FeaturedSection'; 
import Navbar from './Navbar'; 

export default async function HomePage() {
  let featuredWorks = [];
  let errorMsg = null;

  try {
    featuredWorks = await getFeaturedWorks();
  } catch (error) {
    console.error("Notion 抓取失敗：", error);
    errorMsg = "暫時無法載入作品集資料，請檢查您的環境變數與 Notion 設定。";
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* 導覽列 */}
      <Navbar />

      {/* 🚀 修正 1：將原本的 min-h-[75vh] md:min-h-[85vh] 縮減為 60vh / 65vh，讓背景圖區域變精巧 */}
      <header className="relative w-full min-h-[60vh] md:min-h-[65vh] overflow-hidden flex items-center justify-center bg-slate-900">
        <img 
          src="/hero-photo.jpg" 
          alt="AHAO XU Photography Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/30 z-10" />
        <div 
          className="absolute -bottom-2 left-0 w-full h-[17rem] z-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.99) 8%, rgba(255, 255, 255, 0.92) 20%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0.45) 65%, rgba(255, 255, 255, 0.15) 85%, transparent 100%)`
          }}
        />

        <div className="relative z-20 max-w-3xl mx-auto px-6 pt-16 pb-12 text-center text-white">
          
          <p className="font-jinxuan text-sm md:text-base lg:text-lg text-slate-100 max-w-xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            我是許庭豪 AHAO XU。<br className="hidden md:inline" />
            以聲音表演、影像敘事，反映情緒。
          </p>
          
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/audio" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-2.5 rounded-lg shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5">
              聲音作品
            </Link>
            <Link href="/video" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-2.5 rounded-lg shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5">
              影音作品
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 修正 2：將原本的 -mt-24 md:-mt-16 改為 -mt-32 md:-mt-24，把作品區塊更用力往上拉！ */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative z-20 -mt-32 md:-mt-24">
        {errorMsg && <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm text-center">{errorMsg}</div>}
        {!errorMsg && featuredWorks.length === 0 && <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">目前 Notion 資料庫中沒有勾選「Featured」的作品，或是尚未填寫資料。</div>}
        {!errorMsg && featuredWorks.length > 0 && <FeaturedSection initialWorks={featuredWorks} />}
      </section>

      <footer className="text-center py-12 text-xs text-slate-400 border-t border-slate-100 mt-20 bg-slate-50">
        &copy; 2026 AHAO XU. Powered by Next.js & Notion API.
      </footer>
    </div>
  );
}