// app/FeaturedSection.js
"use client";

import { useState, useEffect } from 'react';

// 🤖 智慧縮圖小幫手
function AutoThumbnail({ videoUrl, manualThumbnail, alt }) {
  const [thumbUrl, setThumbUrl] = useState(manualThumbnail || null);

  useEffect(() => {
    if (manualThumbnail) {
      setThumbUrl(manualThumbnail);
      return;
    }
    if (!videoUrl) return;

    // 🔧 修復：同時支援 watch?v=、youtu.be/、以及 embed/ 三種格式
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let videoId = '';
      if (videoUrl.includes('watch?v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
      } else if (videoUrl.includes('youtube.com/embed/')) {
        videoId = videoUrl.split('youtube.com/embed/')[1].split('?')[0];
      }
      if (videoId) {
        setThumbUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      }
    } 
    else if (videoUrl.includes('vimeo.com')) {
      fetch(`https://vimeo.com/api/oembed.json?url=${videoUrl}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.thumbnail_url) setThumbUrl(data.thumbnail_url);
        })
        .catch(err => console.error("Vimeo 封面抓取失敗：", err));
    }
  }, [videoUrl, manualThumbnail]);

  if (thumbUrl) {
    return (
      <img 
        src={thumbUrl} 
        alt={alt} 
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
        onError={(e) => {
          if (thumbUrl.includes('maxresdefault')) {
            setThumbUrl(thumbUrl.replace('maxresdefault', 'hqdefault'));
          } else {
            e.target.style.display = 'none';
          }
        }} 
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 bg-slate-100 font-jinxuan">
      純直連影片，暫無封面
    </div>
  );
}

export default function FeaturedSection({ initialWorks }) {
  const [playingId, setPlayingId] = useState(null);
  const [audioObject, setAudioObject] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const audioWorks = initialWorks.filter(w => w.category === 'audio');
  const videoWorks = initialWorks.filter(w => w.category === 'video');

  // 🎵 處理純音檔的播放邏輯
  const togglePlay = (workId, audioUrl) => {
    if (!audioUrl) {
      alert("此作品尚未在 Notion 填寫 AudioUrl 喔！");
      return;
    }
    
    if (playingId === workId && audioObject) {
      audioObject.pause();
      setPlayingId(null);
      return;
    }
    
    if (audioObject) {
      audioObject.pause();
    }

    const newAudio = new Audio(audioUrl);
    newAudio.play().catch(err => {
      console.error("播放失敗：", err);
      alert("音訊播放失敗，請檢查檔案路徑或格式。");
    });
    
    setPlayingId(workId);
    setAudioObject(newAudio);

    newAudio.onended = () => {
      setPlayingId(null);
      setAudioObject(null);
    };
  };

  useEffect(() => {
    return () => {
      if (audioObject) {
        audioObject.pause();
        audioObject.src = '';
      }
    };
  }, [audioObject]);

  // 🎬 處理電影院視窗的開啟邏輯
  const openVideo = (videoUrl) => {
    if (!videoUrl) {
      alert("此作品尚未在 Notion 填寫影片網址喔！");
      return;
    }
    if (audioObject) {
      audioObject.pause();
      setPlayingId(null);
    }
    setActiveVideoUrl(videoUrl);
  };

  const closeVideo = () => setActiveVideoUrl(null);

  // 🎬 解析 YouTube 或 Vimeo 網址，轉換成可嵌入的格式
  // 🔧 修復：同時支援 watch?v=、youtu.be/、以及已經是 embed/ 的網址
  const getEmbedInfo = (url) => {
    if (!url) return { url: '', isIframe: false };
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1].split('?')[0];
      }
      if (videoId) {
        return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1`, isIframe: true };
      }
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1].split('?')[0];
      return { url: `https://player.vimeo.com/video/${videoId}?autoplay=1`, isIframe: true };
    }
    return { url, isIframe: false };
  };

  // 🎨 卡片渲染函數
  const renderWorkCard = (work) => {
    const isAudioWithVideo = work.category === 'audio' && (work.videoUrl || work.url);
    const isVideoLayout = work.category === 'video' || isAudioWithVideo;

    return (
      <div key={work.id} className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-200 transition duration-300 flex flex-col">
        
        {/* ── 頂部媒體呈現區 ── */}
        {isVideoLayout ? (
          // 🔧 修復：移除 relative，改用獨立 z-index 結構，防止被 header 遮罩蓋住
          <div 
            className="aspect-video w-full bg-slate-200 overflow-hidden cursor-pointer relative z-10"
            onClick={() => openVideo(work.videoUrl || work.url)}
          >
            <AutoThumbnail videoUrl={work.videoUrl || work.url} manualThumbnail={work.thumbnailUrl} alt={work.title} />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition duration-300 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform scale-75 group-hover:scale-100">
                <span className="ml-1 text-2xl">▶</span>
              </div>
            </div>
            
            <span className={`absolute top-3 ${work.category === 'audio' ? 'left-3 bg-yellow-400 text-slate-900' : 'right-3 bg-slate-900 text-white'} text-[10px] px-2 py-1 rounded font-bold shadow-sm font-jinxuan z-10`}>
              {work.category === 'audio' ? '聲音表演' : '影音製作'}
            </span>
            
            {work.category === 'audio' && work.duration && (
              <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-mono font-bold shadow z-10">{work.duration}</span>
            )}
          </div>
        ) : (
          /* 🎧 純聲音區塊 */
          <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-yellow-50/50 p-4 flex flex-col justify-between relative z-10 border-b border-slate-100">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-yellow-400 text-slate-900 px-2 py-1 rounded font-bold shadow-sm font-jinxuan">聲音表演</span>
              {work.duration && <span className="text-[10px] text-slate-500 font-mono font-bold">{work.duration}</span>}
            </div>
            
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100 mt-auto">
              <button 
                onClick={() => togglePlay(work.id, work.audioUrl)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition duration-300 shrink-0 text-xs ${
                  playingId === work.id ? 'bg-amber-500 text-white scale-95 animate-pulse' : 'bg-slate-900 text-yellow-400 pl-0.5 hover:bg-yellow-400 hover:text-slate-900'
                }`}
              >
                {playingId === work.id ? '❚❚' : '▶'}
              </button>
              <div className="text-[11px] text-slate-500 font-medium truncate font-jinxuan">
                {playingId === work.id ? '試聽中...' : '點擊試聽'}
              </div>
            </div>
          </div>
        )}

        {/* ── 下半部文字描述區 ── */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-white font-jinxuan">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {work.client && (
                <span className="text-[10px] text-slate-500 font-bold mr-1">{work.client}</span>
              )}
              {work.category === 'video' && work.tags?.map((tag, idx) => (
                <span key={idx} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{tag}</span>
              ))}
              {work.category === 'audio' && work.emotions?.map((emo, idx) => (
                <span key={idx} className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">{emo}</span>
              ))}
            </div>

            <h3 className={`font-bold text-slate-900 group-hover:text-amber-600 transition ${work.category === 'audio' ? 'text-sm line-clamp-1' : 'text-base line-clamp-2'}`}>
              {work.title}
            </h3>
            {work.category !== 'audio' && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{work.description}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentVideoInfo = activeVideoUrl ? getEmbedInfo(activeVideoUrl) : null;

  return (
    <div>
      {/* 🌟 上半部：聲音表演 */}
      {audioWorks.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center mb-5 border-b border-slate-100 pb-2">
            <h3 className="text-lg font-bold text-slate-800 font-jinxuan tracking-wide relative pl-3 border-l-4 border-yellow-400">聲音表演</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {audioWorks.map(renderWorkCard)}
          </div>
        </div>
      )}

      {/* 🌟 下半部：影音製作 */}
      {videoWorks.length > 0 && (
        <div>
          <div className="flex items-center mb-5 border-b border-slate-100 pb-2">
            <h3 className="text-lg font-bold text-slate-800 font-jinxuan tracking-wide relative pl-3 border-l-4 border-yellow-400">影音製作</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {videoWorks.map(renderWorkCard)}
          </div>
        </div>
      )}

      {/* 🎬 電影院彈出視窗 (Lightbox Modal) */}
      {activeVideoUrl && currentVideoInfo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4" onClick={closeVideo}>
          <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
