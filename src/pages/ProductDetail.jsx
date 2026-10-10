import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ImageGallery } from '../components/product/ImageGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { TrustBadges } from '../components/product/TrustBadges';
import { StarRating } from '../components/common/StarRating';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/currencyFormatter';
import { calculatePercentageDiscount } from '../utils/calculateDiscounts';
import { useSEO } from '../hooks/useSEO';
import {
  Flame,
  Truck,
  Heart,
  ShoppingBag,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [selectedBundle, setSelectedBundle] = useState(
    product.bundles?.[0] || { id: 'std', name: 'Standard 1x Pack', qty: 1, discountPercent: 0 }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('highlights');

  // Reset variant options on product id switch
  useEffect(() => {
    if (product.colors?.length) {
      setSelectedColor(product.colors[0].name);
    }
    if (product.bundles?.length) {
      setSelectedBundle(product.bundles[0]);
    }
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isFavorite = isInWishlist(product.id);
  const discountPercent = calculatePercentageDiscount(product.originalPrice, product.price);

  // SEO & JSON-LD Structured Data Schema
  useSEO({
    title: `${product.title} | takeit™`,
    description: product.tagline || product.description,
    ogImage: product.images[0],
    schema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      image: product.images,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'takeit',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.price,
        availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: window.location.href,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    },
  });

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      bundle: selectedBundle,
    });
    addToast(`Added ${quantity}x "${product.title}" to cart! 🛍️`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      bundle: selectedBundle,
    });
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Dynamic calculated unit and total price with bundle discount
  const unitDiscount = selectedBundle.discountPercent || 0;
  const currentUnitPrice = unitDiscount > 0
    ? Number((product.price * (1 - unitDiscount / 100)).toFixed(2))
    : product.price;
  const currentTotal = Number((currentUnitPrice * selectedBundle.qty * quantity).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-slate-900">Catalog</Link>
        <span>/</span>
        <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Multi-Image Gallery with Zoom */}
        <div className="lg:col-span-7">
          <ImageGallery
            images={product.images}
            title={product.title}
            badge={product.badge}
          />
        </div>

        {/* Right: Buy Box & Product Options */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  addToast(isFavorite ? 'Removed from Wishlist' : 'Saved to Wishlist ❤️', 'info');
                }}
                className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-rose-500 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
              {product.tagline}
            </p>

            {/* Ratings & Social Proof Count */}
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              <span className="text-slate-300">|</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Buyer Rating
              </span>
            </div>
          </div>

          {/* Pricing Breakdown & Savings Tag */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                {formatCurrency(currentUnitPrice)}
              </span>
              {product.originalPrice > currentUnitPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-rose-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                  Save {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Urgency Stock Trigger */}
            {product.stockCount <= 5 && (
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200/60">
                <Flame className="w-4 h-4 animate-bounce shrink-0" />
                <span>
                  High Demand: <strong className="underline decoration-rose-400">Only {product.stockCount} items left</strong> in our regional warehouse!
                </span>
              </div>
            )}
          </div>

          {/* Multi-Variant Selector (Colors & Bundles) */}
          <VariantSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={(c) => setSelectedColor(c.name)}
            bundles={product.bundles}
            selectedBundle={selectedBundle}
            onSelectBundle={setSelectedBundle}
            basePrice={product.price}
          />

          {/* Quantity Controls & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <Button
                variant="primary"
                size="lg"
                className="flex-1 text-base font-bold shadow-xl shadow-orange-500/25"
                onClick={handleAddToCart}
                icon={ShoppingBag}
              >
                Add to Cart • {formatCurrency(currentTotal)}
              </Button>
            </div>

            {/* Instant 1-Click Buy Now */}
            <Button
              variant="dark"
              size="lg"
              className="w-full text-sm font-bold"
              onClick={handleBuyNow}
              icon={Zap}
            >
              Express Instant Checkout (PayPal / Card)
            </Button>
          </div>

          {/* Trust & Guarantee Badges below CTA */}
          <TrustBadges className="pt-2" />

          {/* Interactive Accordions: Highlights, Specs, Shipping */}
          <div className="pt-4 border-t border-slate-200/80 space-y-3">
            {/* Highlights Accordion */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'highlights' ? null : 'highlights')}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase tracking-wider text-slate-800"
              >
                <span>Key Features & Benefits</span>
                {activeAccordion === 'highlights' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'highlights' && (
                <div className="p-4 pt-0 text-xs text-slate-600 space-y-2">
                  <p className="leading-relaxed mb-3">{product.description}</p>
                  <ul className="space-y-1.5">
                    {product.highlights?.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Specifications Accordion */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase tracking-wider text-slate-800"
              >
                <span>Technical Specifications</span>
                {activeAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'specs' && (
                <div className="p-4 pt-0 text-xs text-slate-600">
                  <dl className="divide-y divide-slate-100">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="py-1.5 flex justify-between">
                        <dt className="font-semibold text-slate-700">{key}</dt>
                        <dd className="text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Shipping & Returns Accordion */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase tracking-wider text-slate-800"
              >
                <span>Worldwide Shipping & 30-Day Guarantee</span>
                {activeAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'shipping' && (
                <div className="p-4 pt-0 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Truck className="w-4 h-4 text-brand-orange" />
                    <span>Estimated Transit: {product.shippingInfo?.estimatedDelivery || '5-9 Business Days'}</span>
                  </div>
                  <p>
                    Every package is assigned an end-to-end global tracking milestone number upon dispatch. Insured against loss or damage.
                  </p>
                  <p className="font-semibold text-emerald-700">
                    30-Day Risk Free Trial: If you are not 100% satisfied, simply message our team for a prepaid return label.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Customer Reviews Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Customer Reviews ({product.reviewCount})
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              100% Verified Buyer reviews with real feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-slate-900">{product.rating}</div>
            <div>
              <StarRating rating={product.rating} showText={false} size="md" />
              <span className="text-xs text-slate-500 font-medium block">
                Based on {product.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 divide-y divide-slate-100">
          {product.reviews?.map((r) => (
            <div key={r.id} className="pt-6 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {r.author[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{r.author}</span>
                    <span className="text-[10px] text-slate-400 block">{r.location} • {r.date}</span>
                  </div>
                </div>
                {r.verified && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Purchase
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={r.rating} showText={false} size="xs" />
                <h4 className="text-xs font-bold text-slate-800">{r.title}</h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
              <div className="text-[11px] text-slate-400 pt-1">
                {r.helpfulCount} customers found this helpful
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Frequently Bought Together
          </h3>
          <Link to="/catalog" className="text-xs font-bold text-brand-orange hover:underline">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-extrabold text-slate-900 truncate">
            {product.title}
          </div>
          <div className="text-sm font-black text-brand-orange">
            {formatCurrency(currentUnitPrice)}
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="shrink-0 font-bold px-4"
          onClick={handleAddToCart}
          icon={ShoppingBag}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
