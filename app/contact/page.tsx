// app/contact/page.tsx
import Navbar from "../Navbar";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      
      {/* 🌌 背景：維持 fixed 確保往下滾動時，底圖能完美填滿畫面 */}
      <div className="fixed inset-0 z-0">
        <img
          src="/hero-photo.JPG" 
          alt="Background"
          className="w-full h-full object-cover blur-md opacity-90 scale-105" 
        />
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      {/* 🧭 導覽列 */}
      <Navbar isLarge />

      {/* 
        🃏 聯絡我玻璃卡片安全容器 
        ⚡ 關鍵修改：用 min-h-screen + flex-col，並設定超大的頂部安全距離 (pt-48) 
      */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 pt-48 pb-16 md:pt-32 md:pb-12">
        
        {/* 
          卡片本體 
          ⚡ 關鍵修改：加上 `m-auto`。空間夠就完美置中，空間不夠就自然往下延伸，絕對不撞 LOGO！
        */}
        <div className="w-full max-w-4xl m-auto bg-black/20 backdrop-blur-3xl border border-white/20 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col gap-8 md:gap-10">
          
          {/* 💬 上方區塊 */}
          <div className="text-center flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-widest drop-shadow-lg">
              聯絡我
            </h1>
            <p className="text-white/90 text-[15px] md:text-lg leading-relaxed font-light tracking-wide drop-shadow-md max-w-xl">
              謝謝您的瀏覽。<br/>
              有旁白配音需求，歡迎與我聯繫。
            </p>
          </div>

          {/* ➖ 分隔線 */}
          <div className="w-2/3 md:w-1/3 h-[1px] mx-auto bg-white/20 rounded-full"></div>

          {/* 📞 下方區塊：2x2 聯絡資訊網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full max-w-3xl mx-auto">
            
            {/* 1. 名字 */}
            <div className="flex items-center gap-4 bg-white/10 p-3 md:p-4 rounded-2xl border border-white/20">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center shadow-[0_4px_12px_rgba(250,204,21,0.4)] shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-white/60 text-[10px] md:text-[11px] font-bold tracking-widest mb-1">NAME</p>
                <p className="text-white text-[15px] md:text-lg font-medium tracking-widest">許庭豪 (AHAO XU)</p>
              </div>
            </div>

            {/* 2. Email */}
            <a href="mailto:ahaoedit@gmail.com" className="flex items-center gap-4 bg-white/10 p-3 md:p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center shadow-[0_4px_12px_rgba(250,204,21,0.4)] shrink-0 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
              </div>
              <div>
                <p className="text-white/60 text-[10px] md:text-[11px] font-bold tracking-widest mb-1">EMAIL</p>
                <p className="text-white text-[15px] md:text-lg font-medium tracking-wider">ahaoedit@gmail.com</p>
              </div>
            </a>

            {/* 3. LINE ID */}
            <div className="flex items-center gap-4 bg-white/10 p-3 md:p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-1 group">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#06C755] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(6,199,85,0.4)] shrink-0 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-white/60 text-[10px] md:text-[11px] font-bold tracking-widest mb-1">LINE ID</p>
                <p className="text-white text-[15px] md:text-lg font-medium tracking-wider">smell0123</p>
              </div>
            </div>

            {/* 4. Phone */}
            <a href="tel:0983390086" className="flex items-center gap-4 bg-white/10 p-3 md:p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center shadow-[0_4px_12px_rgba(250,204,21,0.4)] shrink-0 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42 .959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-white/60 text-[10px] md:text-[11px] font-bold tracking-widest mb-1">PHONE</p>
                <p className="text-white text-[15px] md:text-lg font-medium tracking-wider">0983390086</p>
              </div>
            </a>

          </div>
        </div>
      </div>

    </main>
  );
}