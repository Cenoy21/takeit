import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Flame } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { formatCurrency } from '../../utils/currencyFormatter';
import { calculatePercentageDiscount } from '../../utils/calculateDiscounts';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export const ProductCard = ({ product, className = '', viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isFavorite = isInWishlist(product.id);
  const discountPercent = calculatePercentageDiscount(product.originalPrice, product.price);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(isFavorite ? 'Removed from Wishlist' : 'Saved to Wishlist ❤️', 'info');
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.title}" to cart! 🛍️`, 'success');
  };

  if (viewMode === 'list') {
    return (
      <div className={`group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 ${className}`}>
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-slate-100 shrink-0">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                {product.category}
              </span>
              <button
                type="button"
                onClick={handleFavoriteClick}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="mt-1 block text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors"
            >
              {product.title}
            </Link>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {product.tagline || product.description}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              {product.stockCount <= 5 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3 animate-pulse" />
                  Only {product.stockCount} left!
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${className}`}>
      {/* Top Image & Overlays */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-400 hover:text-rose-500 hover:bg-white transition-all transform active:scale-90"
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges / Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.badge && (
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm ${product.badgeColor || 'bg-slate-900 text-white'}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge?.includes('%') && (
            <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Scarcity Trigger pill inside image */}
        {product.stockCount <= 5 && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
            <div className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-center gap-1.5 shadow-sm border border-white/10">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Only <span className="text-rose-400 underline decoration-rose-400">{product.stockCount} left</span> in stock!</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-brand-orange uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="xs" />
          </div>

          <Link
            to={`/product/${product.id}`}
            className="font-bold text-sm text-slate-900 group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>
        </div>

        {/* Price & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Free Express shipping eligible
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-brand-orange hover:bg-orange-600 active:scale-95 text-white rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
