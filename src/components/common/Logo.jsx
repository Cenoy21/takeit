import React from 'react';

export const Logo = ({
  variant = 'default', // 'default' (dark text) | 'light' (white text)
  size = 'md', // 'sm' | 'md' | 'lg'
  showBadge = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic "TakeIt" Vector Icon */}
      <div
        className={`${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-tr from-brand-orange via-orange-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/25 flex items-center justify-center relative overflow-hidden group`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white p-1.5"
        >
          {/* Stylized geometric Tote Bag + Forward Acceleration Arrow for "takeit" */}
          <rect
            x="7"
            y="12"
            width="26"
            height="22"
            rx="6"
            fill="white"
            fillOpacity="0.2"
          />
          <path
            d="M14 12V9C14 6.79086 15.7909 5 18 5H22C24.2091 5 26 6.79086 26 9V12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Forward energetic "take" motion arrow */}
          <path
            d="M15 23L24 23M24 23L20 19M24 23L20 27"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle electric speed spark */}
          <circle cx="28" cy="16" r="1.5" fill="#fef08a" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${textSizes[size] || textSizes.md} font-black tracking-tight ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            take<span className="text-brand-orange">it</span>
          </span>
          {showBadge && (
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 tracking-wider">
              Direct
            </span>
          )}
        </div>
        <span
          className={`text-[10px] tracking-wider uppercase font-semibold ${
            isLight ? 'text-slate-400' : 'text-slate-400'
          } hidden sm:block mt-0.5`}
        >
          Viral Lifestyle Inventions
        </span>
      </div>
    </div>
  );
};
