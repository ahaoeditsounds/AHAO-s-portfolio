// app/layout.tsx
import React from "react";
import { Geist, Geist_Mono } from "next/font/google"; 
import localFont from "next/font/local"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🚀 金萱體三兄弟：統一命名為 --font-jinxuan，並且綁定對應的重量
const jinxuan = localFont({
  src: [
    {
      path: "../public/fonts/jf-jinxuan-book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/jf-jinxuan-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/jf-jinxuan-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jinxuan",
  display: "swap",
});

export const metadata = {
  title: "許庭豪 AHAO XU",
  description: "許庭豪 AHAO XU 的個人聲音網站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      {/* 🔥 在這裡直接加上 font-jinxuan，強迫所有子元素全部繼承金萱體！ */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jinxuan.variable} font-jinxuan antialiased`}
      >
        {children}
      </body>
    </html>
  );
}