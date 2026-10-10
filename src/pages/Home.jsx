import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Headphones, RotateCcw, Flame, CheckCircle2, Zap } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { StarRating } from '../components/common/StarRating';
import { Button } from '../components/common/Button';
import { TrustBadges } from '../components/product/TrustBadges';
import { useSEO } from '../hooks/useSEO';

export const Home = () => {
  useSEO({
    title: 'takeit™ | Viral Innovations, Lifestyle Tech & Smart Home',
    description: 'Shop TikTok viral lifestyle inventions, noise-cancelling audio, and smart home ergonomics with free express worldwide shipping and a 30-day risk-free guarantee.',
  });

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending || p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-slate-50 pt-8 sm:pt-14 pb-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-orange-200/80 shadow-sm text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span className="text-brand-orange">⚡ TikTok & IG Viral Sensation</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-semibold">Over 45,000+ Verified Buyers</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Next-Gen Lifestyle Inventions <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-rose-600 bg-clip-text text-transparent">
                  Direct From The Factory
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Skip the retail markups. We bring you viral ergonomic solutions, smart home innovations, and studio-grade acoustics with express worldwide dispatch.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/catalog">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto text-base font-bold shadow-xl shadow-orange-500/25 group"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Shop Viral Collection
                  </Button>
                </Link>

                <Link to="/track-order">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto text-sm font-semibold"
                  >
                    Track Existing Order
                  </Button>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                      alt="User"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                      alt="User"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                      alt="User"
                    />
                  </div>
                  <div>
                    <StarRating rating={4.9} showText={false} size="xs" />
                    <span className="text-[11px] text-slate-500 block">4.9/5 from 3,800+ reviews</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-orange" />
                  <span>Free Express Delivery over $75</span>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Product Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl blur-2xl opacity-20 transform -rotate-1" />

                {/* Main Hero Featured Product Card */}
                <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 group">
                    <img
                      src={PRODUCTS[0].images[0]}
                      alt={PRODUCTS[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md animate-pulse">
                      🔥 Save 45% OFF
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center justify-between">
                      <span>Limited Flash Stock</span>
                      <span className="text-rose-400 font-extrabold">Only 4 Left!</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                        Flagship Viral Winner
                      </span>
                      <StarRating rating={4.9} reviewCount={384} size="xs" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">
                      {PRODUCTS[0].title}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-xl font-black text-slate-900">$79.99</div>
                        <div className="text-xs text-slate-400 line-through">$149.99</div>
                      </div>
                      <Link to={`/product/${PRODUCTS[0].id}`}>
                        <Button variant="primary" size="sm" icon={Zap}>
                          Claim Deal Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-orange-50 text-brand-orange shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Worldwide Express</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Free delivery for orders over $75 with live tracking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">30-Day Risk-Free</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Love it or get a 100% full refund guarantee.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Encrypted Security</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">256-bit bank-grade SSL certified checkout.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">24/7 Priority Support</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Dedicated human agents ready to answer anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              <Flame className="w-4 h-4 fill-brand-orange" />
              <span>Trending Right Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Most Wanted Dropshipping Sensations
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs sm:text-sm font-bold text-brand-orange hover:text-orange-600 flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-orange-500/20 text-brand-orange border border-orange-500/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Bundle & Save Promotion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Unlock Up To 25% OFF with Multi-Pack Bundles
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Order one for yourself and gift one to family or friends. Our smart bundles automatically discount your cart at checkout. Plus enjoy free express air tracking.
            </p>
            <div className="pt-2">
              <Link to="/catalog">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore Multi-Pack Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Proven 5-Star Bestsellers
            </h2>
          </div>
          <Link
            to="/catalog?filter=best-selling"
            className="text-xs sm:text-sm font-bold text-brand-orange hover:text-orange-600 flex items-center gap-1 group"
          >
            <span>Shop Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Social Proof & Testimonials Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Verified Shopper Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Loved by Over 45,000+ Customers Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Here is what real verified buyers say about our rapid shipping and build quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={t.rating} size="sm" showText={false} />
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Verified Order
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <span className="text-[11px] text-slate-400 block">{t.role}</span>
                    <span className="text-[10px] text-brand-orange font-semibold block">{t.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Badges Footer */}
          <div className="pt-6">
            <TrustBadges />
          </div>
        </div>
      </section>
    </div>
  );
};
