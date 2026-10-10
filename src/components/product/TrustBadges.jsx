import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export const TrustBadges = ({ className = '', layout = 'grid' }) => {
  const badges = [
    {
      icon: ShieldCheck,
      title: '30-Day Money-Back',
      desc: '100% risk-free return guarantee',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Lock,
      title: '256-Bit SSL Checkout',
      desc: 'Bank-level encrypted payment',
      color: 'text-sky-600 bg-sky-50',
    },
    {
      icon: Truck,
      title: 'Free Express Tracking',
      desc: 'Real-time milestones provided',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      icon: RotateCcw,
      title: 'Hassle-Free Exchanges',
      desc: 'Instant replacement policy',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  if (layout === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 ${className}`}>
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${b.color}`}>
                <Icon className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-xs font-semibold text-slate-700">{b.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      {badges.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={i}
            className="flex flex-col items-center text-center p-3.5 rounded-xl border border-slate-200/70 bg-white hover:border-slate-300 transition-all shadow-sm"
          >
            <div className={`p-2.5 rounded-xl ${b.color} mb-2`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">{b.title}</span>
            <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">{b.desc}</span>
          </div>
        );
      })}
    </div>
  );
};
