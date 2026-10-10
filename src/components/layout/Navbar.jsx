import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Package, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currencyFormatter';

import { Logo } from '../common/Logo';

export const Navbar = () => {
  const { openDrawer, cartTotalCount, cartSubtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'All Products', path: '/catalog' },
    { label: 'Trending Deals', path: '/catalog?filter=trending' },
    { label: 'Track Order', path: '/track-order', highlight: true },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link to="/" className="group" aria-label="takeit home">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-brand-orange bg-orange-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  } ${link.highlight ? 'text-slate-900 flex items-center gap-1.5' : ''}`
                }
              >
                {link.highlight && <Package className="w-4 h-4 text-brand-orange" />}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Quick Button */}
            <button
              onClick={() => navigate('/catalog')}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:flex items-center"
              title="Search catalog"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/catalog"
              className="p-2.5 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-slate-100 transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute 1.5 top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button with Total & Drawer Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all active:scale-95 group"
              aria-label="Open cart drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white group-hover:text-brand-orange transition-colors" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brand-orange text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left pl-1 border-l border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase font-medium leading-none">
                  Cart
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-orange hover:bg-orange-50 transition-colors"
            >
              <span>{link.label}</span>
              {link.highlight && <Package className="w-4 h-4 text-brand-orange" />}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span>Free Express Shipping at $75</span>
            <span className="text-brand-orange font-bold">Code: TAKEIT15</span>
          </div>
        </div>
      )}
    </header>
  );
};
