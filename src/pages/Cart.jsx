import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FreeShippingBar } from '../components/cart/FreeShippingBar';
import { Button } from '../components/common/Button';
import { TrustBadges } from '../components/product/TrustBadges';
import { formatCurrency } from '../utils/currencyFormatter';
import { useSEO } from '../hooks/useSEO';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Cart = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartSavings,
    isFreeShipping,
    shippingFee,
  } = useCart();

  const navigate = useNavigate();
  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  useSEO({
    title: 'Your Cart | takeit™ Store',
    description: 'Review your selected items, apply promo vouchers, and checkout securely with express worldwide shipping.',
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'TAKEIT15') {
      setAppliedPromo({ code: 'TAKEIT15', discount: 15 });
      addToast('Promo TAKEIT15 applied! 15% discount unlocked 🎉', 'success');
      setPromoCode('');
    } else if (code === 'TAKEIT10') {
      setAppliedPromo({ code: 'TAKEIT10', discount: 10 });
      addToast('Promo TAKEIT10 applied! 10% discount unlocked 🎉', 'success');
      setPromoCode('');
    } else {
      addToast('Invalid promo code. Try "TAKEIT15"', 'error');
    }
  };

  const promoDiscountAmount = appliedPromo
    ? Number(((cartSubtotal * appliedPromo.discount) / 100).toFixed(2))
    : 0;

  const finalTotal = Number((cartSubtotal - promoDiscountAmount + shippingFee).toFixed(2));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 text-brand-orange flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Explore our viral trending collection with 30-day risk-free guarantees and fast shipping.
        </p>
        <div className="pt-4">
          <Link to="/catalog">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your selected products and checkout securely.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      {/* Free Shipping Dynamic Progress */}
      <FreeShippingBar subtotal={cartSubtotal} />

      {/* Main Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <Link to={`/product/${item.productId}`} className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </Link>

                  <div className="min-w-0">
                    <Link to={`/product/${item.productId}`} className="text-sm font-bold text-slate-900 hover:text-brand-orange transition-colors truncate block">
                      {item.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>Color: <strong className="text-slate-800">{item.selectedColor}</strong></span>
                      {item.selectedBundle?.tag && (
                        <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded font-medium text-[11px]">
                          {item.selectedBundle.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1 sm:hidden">
                      {formatCurrency(item.price)} each
                    </div>
                  </div>
                </div>

                {/* Quantity and Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <div className="text-sm font-extrabold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-300 hover:text-rose-500 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <Link to="/catalog" className="text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-6">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
            Order Summary
          </h3>

          {/* Promo code */}
          <div>
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl border border-emerald-200 font-semibold">
                <span>Code <strong>{appliedPromo.code}</strong> (-{appliedPromo.discount}%)</span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-rose-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (TAKEIT15)"
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none uppercase font-semibold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
            </div>

            {cartSavings > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Bundle Deals Savings</span>
                <span>-{formatCurrency(cartSavings)}</span>
              </div>
            )}

            {promoDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Promo Discount ({appliedPromo.code})</span>
                <span>-{formatCurrency(promoDiscountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>Worldwide Shipping</span>
              {isFreeShipping ? (
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase text-[10px]">
                  FREE Express Tracked
                </span>
              ) : (
                <span className="font-bold text-slate-900">{formatCurrency(shippingFee)}</span>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
              <span>Estimated Total</span>
              <span className="text-xl">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full text-base font-bold shadow-xl shadow-orange-500/25"
            onClick={() => navigate('/checkout')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Proceed to Checkout
          </Button>

          <div className="pt-2">
            <TrustBadges layout="grid" />
          </div>
        </div>
      </div>
    </div>
  );
};
