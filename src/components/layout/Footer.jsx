import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../common/Logo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Coupon code TAKEIT10 applied! Check your email.', 'success');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-24 sm:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Incentive Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl mb-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full mb-3 border border-orange-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              VIP Member Perks
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get 10% OFF Your First Order + VIP Drops
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Join over 45,000+ happy shoppers. Get secret weekend flash sales, viral drops, and tracking updates directly in your inbox.
            </p>

            {subscribed ? (
              <div className="mt-5 flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-800/60">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are in! Use code <strong className="text-white underline">TAKEIT10</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span>Claim 10% OFF</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="takeit home">
              <Logo variant="light" size="md" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curating viral lifestyle innovations and ergonomic essentials directly from specialized manufacturers to your doorstep.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 256-Bit SSL Store</span>
            </div>
          </div>

          {/* Quick Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/catalog" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=trending" className="hover:text-white transition-colors">
                  Trending Viral Tech
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Audio+%26+Tech" className="hover:text-white transition-colors">
                  Audio & Sound
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Home+Living" className="hover:text-white transition-colors">
                  Home Aesthetics
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-brand-orange font-bold hover:underline">
                  Track Your Package 📦
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Shipping & Delivery FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  24/7 Support Desk
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  30-Day Refund Guarantee
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition-colors">
                  Worldwide Shipping Times
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal & Trust</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <span className="text-slate-500 block pt-1">
                  Support: help@takeit.store
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Trust Badges */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {CURRENT_YEAR} takeit Direct Innovations Inc. All rights reserved.
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-2">Secure Payments:</span>
            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded">
              PayPal
            </span>
            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded">
              Visa
            </span>
            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded">
              Mastercard
            </span>
            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded">
              Apple Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
