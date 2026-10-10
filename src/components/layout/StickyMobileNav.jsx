import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const StickyMobileNav = () => {
  const { openDrawer, cartTotalCount } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 sm:hidden py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive ? 'text-brand-orange' : 'text-slate-500'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive ? 'text-brand-orange' : 'text-slate-500'
            }`
          }
        >
          <Compass className="w-5 h-5" />
          <span>Shop</span>
        </NavLink>

        <NavLink
          to="/track-order"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive ? 'text-brand-orange' : 'text-slate-500'
            }`
          }
        >
          <Package className="w-5 h-5" />
          <span>Track</span>
        </NavLink>

        <button
          onClick={openDrawer}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-700 relative"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-slate-700" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-orange text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};
