import React, { useState } from 'react';
import { formatCurrency } from '../../utils/currencyFormatter';
import { ShieldCheck, Tag } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OrderSummary = ({
  items = [],
  subtotal = 0,
  shippingFee = 0,
  isFreeShipping = false,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const { addToast } = useToast();

  const handleApply = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'TAKEIT15') {
      onApplyPromo({ code: 'TAKEIT15', discountPercent: 15 });
      addToast('Promo code TAKEIT15 applied! 15% discount unlocked 🎉', 'success');
      setPromoInput('');
    } else if (code === 'TAKEIT10') {
      onApplyPromo({ code: 'TAKEIT10', discountPercent: 10 });
      addToast('Promo code TAKEIT10 applied! 10% discount unlocked 🎉', 'success');
      setPromoInput('');
    } else {
      addToast('Invalid promo code. Try "TAKEIT15" or "TAKEIT10"', 'error');
    }
  };

  const promoDiscountAmount = appliedPromo
    ? Number(((subtotal * appliedPromo.discountPercent) / 100).toFixed(2))
    : 0;

  const total = Number((subtotal - promoDiscountAmount + shippingFee).toFixed(2));

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
        <span className="text-xs font-semibold text-slate-500">
          {items.reduce((acc, i) => acc + i.quantity, 0)} Items
        </span>
      </div>

      {/* Item Previews */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3 pt-3 first:pt-0">
            <div className="relative w-14 h-14 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {item.selectedColor} {item.selectedBundle?.name ? `• ${item.selectedBundle.name}` : ''}
              </p>
            </div>
            <div className="text-xs font-extrabold text-slate-900 shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Box */}
      <div className="pt-2">
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl border border-emerald-200 font-semibold">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>Promo <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)</span>
            </div>
            <button
              onClick={onRemovePromo}
              className="text-xs text-rose-500 hover:text-rose-700 underline font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Discount code (e.g. TAKEIT15)"
                className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange placeholder:normal-case font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-slate-800">{formatCurrency(subtotal)}</span>
        </div>

        {promoDiscountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Promo Discount ({appliedPromo.code})</span>
            <span>-{formatCurrency(promoDiscountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Shipping & Handling</span>
          {isFreeShipping ? (
            <span className="font-bold text-emerald-600 uppercase text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
              FREE Express Tracked
            </span>
          ) : (
            <span className="font-bold text-slate-800">{formatCurrency(shippingFee)}</span>
          )}
        </div>

        <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-extrabold text-slate-900">
          <span>Total USD</span>
          <span className="text-xl text-slate-950">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Encrypted 256-Bit SSL Checkout Guarantee</span>
      </div>
    </div>
  );
};
