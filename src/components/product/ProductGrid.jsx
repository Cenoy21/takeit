import React from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  viewMode = 'grid',
  emptyMessage = 'No products found matching your criteria.',
  className = '',
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-lg mx-auto">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mb-3">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No products found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode="grid"
        />
      ))}
    </div>
  );
};
