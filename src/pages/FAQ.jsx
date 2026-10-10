import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const FAQS = [
  {
    category: 'Shipping & Delivery',
    q: 'How long does shipping take and where do packages dispatch from?',
    a: 'We ship directly from our specialized fulfillment hubs in the USA and Europe. Standard express shipping typically takes 5 to 9 business days depending on your destination city. Full real-time courier tracking milestones (DHL / USPS) are emailed immediately upon dispatch.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'How do I qualify for FREE Worldwide Express Shipping?',
    a: 'All orders with a subtotal of $75.00 USD or greater automatically qualify for 100% Free Express Shipping. No coupon code required! For orders below $75, standard insured tracked delivery is only $4.95.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'Will I be charged import duties or customs tariffs?',
    a: 'No! All taxes, VAT, and customs duties are fully prepaid by takeit under our DDP (Delivered Duty Paid) logistics service for USA, UK, Canada, Australia, and European Union destinations.',
  },
  {
    category: 'Returns & Guarantees',
    q: 'What is your 30-Day Money-Back Guarantee policy?',
    a: 'We stand by every product 100%. If you are not satisfied with your item within 30 days of receiving your package, contact our 24/7 support desk at help@takeit.store and our team will provide a prepaid return slip for a full refund.',
  },
  {
    category: 'Orders & Payments',
    q: 'Which payment methods do you accept?',
    a: 'We accept PayPal Express, Visa, Mastercard, American Express, Apple Pay, and Google Pay through our encrypted 256-bit SSL gateway.',
  },
  {
    category: 'Orders & Payments',
    q: 'Can I change my shipping address or cancel my order after placing it?',
    a: 'We process orders quickly! If you need to make changes to your shipping address or items, please message our support desk within 2 hours of checkout. Once packages are transferred to the air freight carrier, addresses cannot be modified.',
  },
];

const CATEGORIES = ['All', 'Shipping & Delivery', 'Returns & Guarantees', 'Orders & Payments'];

export const FAQ = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState([0]); // Open first FAQ by default

  useSEO({
    title: 'Frequently Asked Questions & Shipping Policy | takeit™',
    description: 'Find answers regarding worldwide express delivery times (5-9 days), returns, customs, and payment options.',
  });

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      if (activeCategory !== 'All' && faq.category !== activeCategory) return false;
      if (search.trim() !== '') {
        const query = search.toLowerCase();
        return faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query);
      }
      return true;
    });
  }, [search, activeCategory]);

  const toggleItem = (idx) => {
    setOpenItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange mx-auto flex items-center justify-center">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Clear answers about shipping timelines, guarantees, tracking, and order policies.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search question keywords (e.g. shipping, returns, PayPal)..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-orange shadow-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === c
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openItems.includes(index);
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 hover:text-brand-orange transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-brand-orange shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-3" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Still have a question about your order?
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Our customer service team is available 24 hours a day, 7 days a week.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
