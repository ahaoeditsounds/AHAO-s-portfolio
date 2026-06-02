// app/audio/page.tsx
import Navbar from '../Navbar';
import { getAudioWorks } from '@/lib/notion'; 
import AudioGrid from './AudioGrid';

export default async function AudioWorksPage() {
  let audioWorks: any[] = []; // 加上 any[] 避免 TS 報錯
  let errorMsg = null;

  try {
    audioWorks = await getAudioWorks();
  } catch (error) {
    console.error("Notion 聲音作品抓取失敗：", error);
    errorMsg = "暫時無法載入聲音作品資料，請稍後再試。";
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden flex flex-col">
      
      {/* 🌟 Header 區塊 */}
      <header className="relative w-full h-[35vh] min-h-[280px] overflow-hidden flex bg-slate-900">
        <img 
          src="/hero-photo.jpg" 
          alt="AHAO XU Voice Works Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/30 z-10" />
        <div 
          className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.99) 8%, rgba(255, 255, 255, 0.92) 20%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0.45) 65%, rgba(255, 255, 255, 0.15) 85%, transparent 100%)` }}
        />
        <Navbar />
      </header>

      {/* 🌟 主要內容區塊 */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-20">
        
        {/* 標題置左與招牌黃色粗邊框 (已刪除英文附標) */}
        <div className="mb-10 text-left flex items-center border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold font-jinxuan text-slate-900 tracking-wide relative pl-4 border-l-8 border-yellow-400 inline-block">
            聲音作品
          </h1>
        </div>

        {/* 錯誤或空狀態提示 */}
        {errorMsg && <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm text-center">{errorMsg}</div>}
        {!errorMsg && audioWorks.length === 0 && <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">目前 Notion 資料庫中沒有類別為「audio」的作品。</div>}

        {/* 🚀 呼叫互動網格元件 */}
        {!errorMsg && audioWorks.length > 0 && <AudioGrid initialWorks={audioWorks} />}
        
      </main>

      <footer className="text-center py-12 text-xs text-slate-400 border-t border-slate-100 bg-slate-50 mt-auto">
        &copy; 2026 AHAO XU. Powered by Next.js & Notion API.
      </footer>
    </div>
  );
}