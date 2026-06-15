// app/audio/AudioGrid.js
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// 🤖 智慧縮圖小幫手 (保留原狀)
function AutoThumbnail({ videoUrl, manualThumbnail, alt }) {
  const [thumbUrl, setThumbUrl] = useState(manualThumbnail || null);

  useEffect(() => {
    if (manualThumbnail) {
      setThumbUrl(manualThumbnail);
      return;
    }
    if (!videoUrl) return;

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let videoId = '';
      if (videoUrl.includes('v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
      } else if (videoUrl.includes('youtube.com/embed/')) {
        videoId = videoUrl.split('youtube.com/embed/')[1].split('?')[0];
      }
      if (videoId) setThumbUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else if (videoUrl.includes('vimeo.com')) {
      fetch(`https://vimeo.com/api/oembed.json?url=${videoUrl}`)
        .then(res => res.json())
        .then(data => { if (data && data.thumbnail_url) setThumbUrl(data.thumbnail_url); })
        .catch(err => console.error("Vimeo 封面抓取失敗：", err));
    }
  }, [videoUrl, manualThumbnail]);

  if (thumbUrl) {
    return (
      <img 
        src={thumbUrl} alt={alt} 
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
        onError={(e) => {
          if (thumbUrl.includes('maxresdefault')) setThumbUrl(thumbUrl.replace('maxresdefault', 'hqdefault'));
          else e.target.style.display = 'none';
        }} 
      />
    );
  }
  return <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 bg-slate-100 font-jinxuan">暫無封面</div>;
}

// 🎵 全新：專屬音波卡片元件
function WaveAudioCard({ work, playingId, setPlayingId }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !work.audioUrl) return;

    // 建立音波實體，設定長條狀的細節
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#cbd5e1',     // 尚未播放的音波顏色 (slate-300)
      progressColor: '#facc15', // 已經播放的音波顏色 (品牌黃)
      cursorColor: '#ca8a04',   // 游標顏色
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 36,               // 高度縮小，符合長條形與網格需求
      url: work.audioUrl,
    });

    ws.on('ready', () => setIsReady(true));
    ws.on('play', () => {
      setIsPlaying(true);
      setPlayingId(work.id); // 通知上層目前是我在播放
    });
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [work.audioUrl, work.id, setPlayingId]);

  // 💡 當有其他的卡片開始播放時，這張卡片自動暫停
  useEffect(() => {
    if (playingId !== work.id && isPlaying && wavesurferRef.current) {
      wavesurferRef.current.pause();
    }
  }, [playingId, work.id, isPlaying]);

  const togglePlay = () => {
    if (!work.audioUrl) {
      alert("此作品尚未在 Notion 填寫 AudioUrl 喔！");
      return;
    }
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause(); // 波形套件自帶智慧播放/暫停機制
    }
  };

  return (
    <div className="group relative bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-200 transition duration-300 flex flex-col h-full justify-between p-4 font-jinxuan">
      
      {/* 上方：標籤與標題區塊 */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] bg-yellow-400 text-slate-900 px-2 py-1 rounded font-bold shadow-sm">聲音表演</span>
          {work.duration && <span className="text-[10px] text-slate-500 font-mono font-bold">{work.duration}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mb-2 mt-3">
          {work.client && <span className="text-[10px] text-slate-500 font-bold mr-1">{work.client}</span>}
          {work.emotions?.map((emo, idx) => (
            <span key={idx} className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">{emo}</span>
          ))}
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition text-sm line-clamp-1 mb-4">{work.title}</h3>
      </div>

      {/* 下方：長條狀播放控制與音波圖 */}
      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 mt-auto">
        <button 
          onClick={togglePlay}
          disabled={!isReady}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition duration-300 shrink-0 ${
            isPlaying 
              ? 'bg-amber-500 text-white scale-95 shadow-inner' 
              : 'bg-slate-900 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 shadow-md'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        
        {/* 音波容器 (點擊即可跳轉時間段) */}
        <div className="flex-1 min-w-0 relative">
          {!isReady && (
            <div className="absolute inset-0 flex items-center">
              <span className="text-[10px] text-slate-400 animate-pulse">音波載入中...</span>
            </div>
          )}
          <div ref={containerRef} className="w-full cursor-pointer opacity-90 hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

    </div>
  );
}

// 🚀 主元件 AudioGrid
export default function AudioGrid({ initialWorks }) {
  const [playingId, setPlayingId] = useState(null); // 紀錄目前正在播放的 ID
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  
  // 標籤過濾邏輯 (保留原狀)
  const [selectedEmotion, setSelectedEmotion] = useState('全部');

  const allEmotions = useMemo(() => {
    const tags = new Set();
    initialWorks.forEach(work => {
      if (work.emotions && Array.isArray(work.emotions)) {
        work.emotions.forEach(emo => tags.add(emo));
      }
    });
    return ['全部', ...Array.from(tags)]; 
  }, [initialWorks]);

  const filteredWorks = useMemo(() => {
    if (selectedEmotion === '全部') return initialWorks;
    return initialWorks.filter(work => work.emotions?.includes(selectedEmotion));
  }, [initialWorks, selectedEmotion]);

  // 🎬 電影院視窗邏輯 (保留原狀)
  const openVideo = (videoUrl) => {
    if (!videoUrl) return;
    setPlayingId(null); // 開啟影片時，強制暫停所有純音檔
    setActiveVideoUrl(videoUrl);
  };
  const closeVideo = () => setActiveVideoUrl(null);

  const getEmbedInfo = (url) => {
    if (!url) return { url: '', isIframe: false };
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1`, isIframe: true };
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1`, isIframe: true };
    }
    if (url.includes('youtube.com/embed/')) {
      return { url: `${url.split('?')[0]}?autoplay=1`, isIframe: true };
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return { url: `https://player.vimeo.com/video/${videoId}?autoplay=1`, isIframe: true };
    }
    return { url, isIframe: false };
  };

  // 🎨 卡片渲染 (區分影片與全新音波卡片)
  const renderWorkCard = (work) => {
    const isAudioWithVideo = !!work.videoUrl || !!work.url;

    // 🌟 如果是純音檔，就呼叫全新的音波卡片
    if (!isAudioWithVideo) {
      return (
        <WaveAudioCard 
          key={work.id} 
          work={work} 
          playingId={playingId} 
          setPlayingId={setPlayingId} 
        />
      );
    }

    // 🎬 如果有影片連結，維持原本的影片方形卡片
    return (
      <div key={work.id} className="group relative bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-200 transition duration-300 flex flex-col">
        <div className="aspect-video w-full bg-slate-200 relative overflow-hidden cursor-pointer" onClick={() => openVideo(work.videoUrl || work.url)}>
          <AutoThumbnail videoUrl={work.videoUrl || work.url} manualThumbnail={work.thumbnailUrl} alt={work.title} />
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform scale-75 group-hover:scale-100">
              <span className="ml-1 text-2xl">▶</span>
            </div>
          </div>
          <span className="absolute top-3 left-3 text-[10px] bg-yellow-400 text-slate-900 px-2 py-1 rounded font-bold shadow-sm font-jinxuan z-10 hover:opacity-100">聲音表演</span>
          {work.duration && <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-mono font-bold shadow z-10 hover:opacity-100">{work.duration}</span>}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between bg-white font-jinxuan">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {work.client && <span className="text-[10px] text-slate-500 font-bold mr-1">{work.client}</span>}
              {work.emotions?.map((emo, idx) => (
                <span key={idx} className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">{emo}</span>
              ))}
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition text-sm line-clamp-1">{work.title}</h3>
          </div>
        </div>
      </div>
    );
  };

  const currentVideoInfo = activeVideoUrl ? getEmbedInfo(activeVideoUrl) : null;

  return (
    <div>
      {/* ✨ 標籤過濾器 UI 區塊 */}
      {allEmotions.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-8 font-jinxuan">
          {allEmotions.map(emo => (
            <button
              key={emo}
              onClick={() => setSelectedEmotion(emo)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 ${
                selectedEmotion === emo 
                  ? 'bg-yellow-400 text-slate-900 shadow-md transform scale-105' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              {emo}
            </button>
          ))}
        </div>
      )}

      {/* 🚀 網格排版 */}
      {filteredWorks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredWorks.map(renderWorkCard)}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center bg-slate-50 border border-slate-100 rounded-2xl">
          <span className="text-2xl mb-2">🎙️</span>
          <p className="text-slate-500 font-jinxuan text-sm">目前此分類下尚未新增作品。</p>
        </div>
      )}

      {/* 🎬 電影院彈出視窗 */}
      {activeVideoUrl && currentVideoInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={closeVideo}>
          <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden transform animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeVideo} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors flex items-center justify-center font-bold text-lg">✕</button>
            {currentVideoInfo.isIframe ? (
              <iframe src={currentVideoInfo.url} allow="autoplay; fullscreen; encrypted-media" className="w-full h-full border-0" />
            ) : (
              <video src={currentVideoInfo.url} controls autoPlay className="w-full h-full object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}