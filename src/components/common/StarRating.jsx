import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({
  rating = 5,
  reviewCount = null,
  size = 'sm',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizeMap[size] || sizeMap.sm;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = starIndex <= Math.round(rating);
          return (
            <Star
              key={starIndex}
              className={`${starSize} ${filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
            />
          );
        })}
      </div>

      {showText && (
        <span className="text-xs font-semibold text-slate-700 ml-0.5">
          {rating.toFixed(1)}
          {reviewCount !== null && (
            <span className="text-slate-500 font-normal ml-1">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
