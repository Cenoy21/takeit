import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { useSEO } from '../hooks/useSEO';

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Products');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState(150);

  // Sync with searchParams if incoming link has params (e.g. from navbar or footer)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const filter = searchParams.get('filter');
    if (filter === 'trending') setSortBy('featured');
    if (filter === 'best-selling') setSortBy('best-selling');

    const query = searchParams.get('q');
    if (query) setSearchQuery(query);
  }, [searchParams]);

  useSEO({
    title: `Shop Catalog | takeit™ Viral Inventions`,
    description: 'Explore all trending products across tech, home ergonomics, wellness, and acoustics with free global shipping.',
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setSortBy('featured');
    setPriceRange(150);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'best-selling') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // default featured
    });
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title & Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All Products & Innovations
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Discover our curated direct-to-consumer collection. Every item is verified for durability, performance, and 30-day money-back satisfaction.
        </p>
      </div>

      {/* Filter Toolbar */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        totalResults={filteredProducts.length}
        onResetFilters={handleResetFilters}
      />

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        viewMode={viewMode}
        emptyMessage="Try adjusting your search keywords, raising the max price, or switching categories."
      />
    </div>
  );
};
