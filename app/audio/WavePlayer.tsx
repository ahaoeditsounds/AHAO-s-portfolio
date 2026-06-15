// app/audio/WavePlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface WavePlayerProps {
  title: string;
  url: string;
}

export default function WavePlayer({ title, url }: WavePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      // 🌟 針對白底排版優化的顏色設定
      waveColor: "#e2e8f0",      // 未播放的音波：淺灰 (slate-200)
      progressColor: "#facc15",  // 已播放的音波：品牌黃
      cursorColor: "#eab308",    // 游標：深一點的黃色
      barWidth: 2.5,
      barGap: 2.5,
      barRadius: 3,
      height: 48,                // 🌟 降低高度，讓播放器看起來更修長小巧
      url: url,
    });

    ws.on("ready", () => setIsReady(true));
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [url]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    // 🌟 改為白底實體卡片，並加上 hover 微微上浮的效果
    <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md p-4 md:p-5 rounded-2xl flex flex-col gap-4 transition-all hover:-translate-y-1">
      
      {/* 上半部：播放按鈕 + 標題 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          disabled={!isReady}
          className="w-12 h-12 shrink-0 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center hover:bg-yellow-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <h3 className="text-slate-800 font-bold text-base md:text-lg tracking-wide truncate">
          {title}
        </h3>
      </div>

      {/* 下半部：音波圖區塊 */}
      <div className="w-full px-1">
        <div ref={containerRef} className="w-full cursor-pointer"></div>
      </div>
      
    </div>
  );
}