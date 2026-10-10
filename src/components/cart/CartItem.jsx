import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyFormatter';
import { Link } from 'react-router-dom';

export const CartItem = ({ item, onUpdateQuantity, onRemove, onNavigate }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 last:border-b-0 items-start">
      {/* Product Image */}
      <Link
        to={`/product/${item.productId}`}
        onClick={onNavigate}
        className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60 block relative group"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <Link
            to={`/product/${item.productId}`}
            onClick={onNavigate}
            className="text-sm font-semibold text-slate-800 hover:text-brand-orange transition-colors line-clamp-1"
          >
            {item.title}
          </Link>
          <button
            onClick={() => onRemove(item.cartItemId)}
            className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Variant Info */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-1">
          {item.selectedColor && (
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
              {item.selectedColor}
            </span>
          )}
          {item.selectedBundle?.tag && (
            <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
              {item.selectedBundle.tag}
            </span>
          )}
        </div>

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">
              {formatCurrency(item.price * item.quantity)}
            </div>
            {item.originalPrice && item.originalPrice > item.price && (
              <div className="text-xs text-slate-400 line-through">
                {formatCurrency(item.originalPrice * item.quantity)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
