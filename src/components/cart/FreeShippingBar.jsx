import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { calculateShippingRemaining } from '../../utils/calculateDiscounts';
import { formatCurrency } from '../../utils/currencyFormatter';

export const FreeShippingBar = ({ subtotal = 0, className = '' }) => {
  const { remaining, progress, isQualified } = calculateShippingRemaining(subtotal);

  return (
    <div className={`bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-3.5 rounded-xl border border-orange-200/60 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-2">
        {isQualified ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-emerald-700 font-bold">
              Congratulations! You unlocked FREE Worldwide Express Shipping!
            </span>
          </>
        ) : (
          <>
            <Truck className="w-4 h-4 text-brand-orange shrink-0 animate-bounce" />
            <span>
              Add <strong className="text-brand-orange">{formatCurrency(remaining)}</strong> more to unlock <span className="underline decoration-brand-orange underline-offset-2">FREE Worldwide Express Shipping!</span>
            </span>
          </>
        )}
      </div>

      <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden relative">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            isQualified
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
        <span>$0</span>
        <span className="font-semibold text-slate-700">Free Express at $75</span>
      </div>
    </div>
  );
};
