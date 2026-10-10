import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Lock, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { FreeShippingBar } from './FreeShippingBar';
import { CartItem } from './CartItem';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/currencyFormatter';
import { useNavigate } from 'react-router-dom';
import { useScrollLock } from '../../hooks/useScrollLock';

export const CartDrawer = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartSavings,
    cartTotalCount,
  } = useCart();

  const navigate = useNavigate();
  useScrollLock(isDrawerOpen);

  const handleCheckoutClick = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    closeDrawer();
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    closeDrawer();
    navigate('/catalog');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Slide-Over */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100/70 rounded-lg text-brand-orange">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Your Cart</h2>
                    <p className="text-xs text-slate-500">
                      {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Dynamic Progress */}
              <div className="p-4 border-b border-slate-100 bg-white">
                <FreeShippingBar subtotal={cartSubtotal} />
              </div>

              {/* Items List or Empty State */}
              <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-slate-100">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-orange mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Discover trending viral products today and take advantage of our limited-time discounts!
                    </p>
                    <Button
                      onClick={handleContinueShopping}
                      variant="primary"
                      size="sm"
                      className="mt-5"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Start Shopping Now
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItem
                      key={item.cartItemId}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                      onNavigate={closeDrawer}
                    />
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
                  {/* Savings Pill */}
                  {cartSavings > 0 && (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-lg border border-emerald-200/60 font-semibold">
                      <span>Total Savings Applied:</span>
                      <span>-{formatCurrency(cartSavings)}</span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-base font-bold text-slate-900">
                    <span>Subtotal</span>
                    <span className="text-lg">{formatCurrency(cartSubtotal)}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Taxes & shipping calculated securely at checkout.
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleCheckoutClick}
                      variant="primary"
                      size="lg"
                      className="w-full text-base font-bold shadow-lg shadow-orange-500/25"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      onClick={handleViewCartClick}
                      variant="secondary"
                      size="md"
                      className="w-full text-xs font-semibold"
                    >
                      View Detailed Cart
                    </Button>
                  </div>

                  {/* Trust Micro-Badges */}
                  <div className="pt-2 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>SSL 256-Bit</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-brand-orange" />
                      <span>30-Day Returns</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      <span>Buyer Protection</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
