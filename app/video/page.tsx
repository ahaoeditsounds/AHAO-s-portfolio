// app/video/page.tsx
import Navbar from "../Navbar";

export default function VideoPage() {
  return (
    <main className="relative min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      
      {/* 🌌 背景：拿掉全螢幕漸層黑幕，直接將原圖套用模糊效果 (blur-md) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-photo.JPG" 
          alt="Background"
          className="w-full h-full object-cover blur-md opacity-90 scale-105" 
        />
        {/* 只留一層幾乎透明的暗色，確保白色文字不會在亮色背景中消失 */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 🧭 導覽列 */}
      <Navbar isLarge />

      {/* 🃏 逗趣提示卡片：增強毛玻璃、文字縮小 */}
      <div className="relative z-10 px-6 w-full max-w-sm mt-20">
        {/* 卡片底色改用微透的深色玻璃 (bg-black/20) 搭配超強模糊 (backdrop-blur-2xl) */}
        <div className="bg-black/20 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center transform transition-all duration-300 hover:scale-105 hover:border-white/40">
          
          {/* 顏文字：移除消耗效能的動畫，改為游標滑過時會微微放大的互動效果 */}
          <div className="text-3xl md:text-4xl mb-4 font-bold text-white tracking-widest drop-shadow-md transition-transform hover:scale-110 cursor-default">
            (ﾟдﾟ≡ﾟдﾟ)
          </div>
          
          {/* 文字整體縮小，並加上陰影確保閱讀清晰 */}
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
            影音頁面尚在製作中
          </h1>
          <p className="text-yellow-400 text-base md:text-lg font-medium tracking-wide mb-8 drop-shadow-md">
            寫網頁太累QQ
          </p>
          
          {/* YT 播放清單連結 */}
          <a 
            href="https://youtube.com/playlist?list=PLMWvYZDV55biVjrn-ENoiDSKORsBxITjo&si=FRKGbBVi6o6f5XK6" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] active:scale-95"
          >
            先去YouTube看看作品吧！
          </a>

        </div>
      </div>

    </main>
  );
}