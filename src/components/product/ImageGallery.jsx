import React, { useState } from 'react';

export const ImageGallery = ({ images = [], title = '', badge = null }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                selectedIndex === idx
                  ? 'border-brand-orange ring-2 ring-brand-orange/20 shadow-md scale-95'
                  : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
              }`}
              aria-label={`View image thumbnail ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Display with Hover Zoom */}
      <div
        className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 cursor-crosshair group shadow-sm"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Zoom Overlay Window */}
        {isZoomed && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-150 hidden lg:block"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundSize: '220%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {/* Top Badges */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-orange text-white shadow-md">
              {badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-md pointer-events-none lg:block hidden">
          Hover to Zoom
        </div>
      </div>
    </div>
  );
};
