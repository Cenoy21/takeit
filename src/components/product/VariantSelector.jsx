import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';

export const VariantSelector = ({
  colors = [],
  selectedColor,
  onSelectColor,
  bundles = [],
  selectedBundle,
  onSelectBundle,
  basePrice,
  className = '',
}) => {
  return (
    <div className={`space-y-5 ${className}`}>
      {/* Color Swatch Selection */}
      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Color Finish: <span className="text-brand-orange font-semibold normal-case ml-1">{selectedColor}</span>
            </label>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              In Stock & Ready to Ship
            </span>
          </div>

          <div className="flex items-center gap-3">
            {colors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onSelectColor(color)}
                  className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-inner shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-semibold">{color.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white ml-0.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bundle Deals Selector (Key CRO AOV booster!) */}
      {bundles.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>Select Quantity & Unlock Instant Bundle Savings</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {bundles.map((bundle) => {
              const isSelected = selectedBundle?.id === bundle.id;
              const discountedUnit = bundle.discountPercent > 0
                ? basePrice * (1 - bundle.discountPercent / 100)
                : basePrice;
              const bundleTotal = discountedUnit * bundle.qty;

              return (
                <div
                  key={bundle.id}
                  onClick={() => onSelectBundle(bundle)}
                  className={`cursor-pointer relative rounded-xl p-3 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-orange bg-orange-50/50 shadow-md ring-2 ring-brand-orange/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Top Badge */}
                  {bundle.tag && bundle.tag !== 'Standard' && (
                    <span className="absolute -top-2.5 right-2 bg-gradient-to-r from-brand-orange to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {bundle.tag}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{bundle.name}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-sm font-extrabold text-slate-900">
                        {formatCurrency(bundleTotal)}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {formatCurrency(discountedUnit)} / each
                      </div>
                    </div>
                  </div>

                  {bundle.discountPercent > 0 && (
                    <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 rounded px-1.5 py-0.5 inline-block self-start">
                      Save {bundle.discountPercent}% OFF
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
