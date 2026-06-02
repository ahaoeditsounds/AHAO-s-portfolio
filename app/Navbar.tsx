// app/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const checkboxRef = useRef<HTMLInputElement>(null);

  // 🔧 修復：每次換頁時，強制關閉手機選單
  // 這可以防止全螢幕透明遮罩殘留，造成首頁按鈕點擊失效
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  }, [pathname]);

  const links = [
    { name: "首頁", path: "/" },
    { name: "關於我", path: "/about" },
    { name: "聲音作品", path: "/audio" },
    { name: "影音作品", path: "/video" },
    { name: "聯絡我", path: "/contact" },
  ];

  return (
    <>
      {/* 💻 電腦版導覽列 */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-50">
        <nav className="max-w-6xl mx-auto pt-8 pb-6 px-12 flex justify-between items-center">
          <Link href="/" className="block">
            <img src="/logo.png" alt="AHAO XU" className="h-30 w-auto object-contain drop-shadow-md" />
          </Link>
          <div className="flex gap-8 text-sm font-semibold drop-shadow-md">
            {links.map((link) => {
              const isActive = pathname === link.path;
              
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className={`transition hover:-translate-y-0.5 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-white/90"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* 📱 手機版專屬 Logo */}
      <div className="md:hidden absolute top-8 left-6 z-50">
        <Link href="/" className="block active:scale-95 transition-transform">
          <img src="/logo.png" alt="AHAO XU" className="h-16 w-auto object-contain drop-shadow-md" />
        </Link>
      </div>

      {/* ========================================
          📱 手機版：零 JS (Zero-JS) 完美 X 動畫魔法
      ======================================== */}
      
      {/* 🔧 修復：加上 ref 以便在換頁時程式化重置 */}
      <input
        ref={checkboxRef}
        type="checkbox"
        id="mobile-menu"
        className="hidden peer"
      />

      <label
        htmlFor="mobile-menu"
        className="md:hidden fixed inset-0 z-[999997] bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-all duration-300"
      ></label>

      {/* 🚀 導覽列卡片：換成品牌黃色的玻璃質感 (bg-yellow-400/15 + 淡淡黃色邊框) */}
      <div className="md:hidden fixed bottom-36 right-6 z-[999998] flex flex-col p-2 rounded-2xl opacity-0 pointer-events-none translate-y-8 scale-90 origin-bottom-right peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:translate-y-0 peer-checked:scale-100 transition-all duration-300
                      bg-yellow-400/15 backdrop-blur-md border border-yellow-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
        {links.map((link) => {
          const isActive = pathname === link.path;
          
          return (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`text-[17px] font-jinxuan font-bold tracking-widest px-8 py-4 text-center rounded-xl hover:bg-white/20 hover:text-yellow-400 active:scale-95 transition-all duration-200 ${
                isActive ? "text-yellow-400 bg-white/10 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <label 
        htmlFor="mobile-menu"
        className="md:hidden fixed bottom-16 right-6 z-[999999] p-4 rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer active:scale-90 transition-all duration-300 pointer-events-auto
                   bg-slate-800/40 backdrop-blur-lg border border-white/30 hover:bg-slate-800/60
                   /* 🚀 按鈕核心：打勾時變成品牌黃色 (yellow-400) */
                   peer-checked:bg-yellow-400 peer-checked:border-yellow-300 peer-checked:shadow-[0_0_20px_rgba(250,204,21,0.6)]
                   /* 🚀 對比度魔法：當背景變黃色時，把白色的線條變成深灰色 (slate-900)，帥氣又清晰！ */
                   peer-checked:[&_span]:bg-slate-900
                   peer-checked:[&_.line-1]:translate-y-[8px] peer-checked:[&_.line-1]:rotate-45 
                   peer-checked:[&_.line-2]:opacity-0 peer-checked:[&_.line-2]:scale-x-0 
                   peer-checked:[&_.line-3]:-translate-y-[8px] peer-checked:[&_.line-3]:-rotate-45"
      >
        <div className="w-7 h-7 flex flex-col justify-center items-center gap-[6px] relative">
          <span className="line-1 w-6 h-[2px] bg-white rounded-full transition-colors transition-transform duration-300 origin-center"></span>
          <span className="line-2 w-6 h-[2px] bg-white rounded-full transition-colors transition-transform duration-300 origin-center"></span>
          <span className="line-3 w-6 h-[2px] bg-white rounded-full transition-colors transition-transform duration-300 origin-center"></span>
        </div>
      </label>
    </>
  );
}
