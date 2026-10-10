import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const AnnouncementBar = () => {
  const announcements = [
    {
      icon: Zap,
      text: '⚡ FLASH SALE: Free Worldwide Express Shipping on orders over $75!',
    },
    {
      icon: Sparkles,
      text: '🔥 TikTok Viral Innovations: Use code "TAKEIT15" for an extra 15% OFF!',
    },
    {
      icon: ShieldCheck,
      text: '🛡️ 30-Day Money-Back Guarantee + 24/7 Priority Support on all orders',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="bg-slate-950 text-white text-xs py-2 px-4 transition-colors relative z-40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2 font-medium tracking-wide">
        <CurrentIcon className="w-3.5 h-3.5 text-brand-orange shrink-0 animate-pulse" />
        <span className="truncate transition-opacity duration-300">
          {announcements[currentIndex].text}
        </span>
      </div>
    </div>
  );
};
