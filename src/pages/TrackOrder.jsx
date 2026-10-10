import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, CheckCircle2, Truck, Plane, Home, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useSEO } from '../hooks/useSEO';

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '#ORD-9821';

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(2); // 0 = Placed, 1 = Processed, 2 = In Transit, 3 = Delivered

  useSEO({
    title: 'Track Your Order | takeit™ Worldwide Tracking',
    description: 'Track your package in real-time. Enter your order number or tracking code to monitor courier dispatch and delivery milestones.',
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setActiveOrder({
      orderId: orderQuery.toUpperCase().startsWith('#') ? orderQuery.toUpperCase() : `#${orderQuery.toUpperCase()}`,
      carrier: 'DHL Express & USPS Insured Priority',
      trackingCode: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}US`,
      origin: 'Los Angeles Central Logistics Hub, CA',
      destination: 'Austin, TX, United States',
      estimatedDelivery: 'Wednesday, Oct 15 by 7:00 PM',
      lastUpdate: 'Package departed regional air sorting facility (In Transit)',
    });
  };

  useEffect(() => {
    if (initialOrderId) {
      setActiveOrder({
        orderId: initialOrderId.toUpperCase().startsWith('#') ? initialOrderId.toUpperCase() : `#${initialOrderId.toUpperCase()}`,
        carrier: 'DHL Express & USPS Insured Priority',
        trackingCode: 'TRK-94820192US',
        origin: 'Los Angeles Central Logistics Hub, CA',
        destination: 'Austin, TX, United States',
        estimatedDelivery: 'Wednesday, Oct 15 by 7:00 PM',
        lastUpdate: 'Package departed regional air sorting facility (In Transit)',
      });
    }
  }, [initialOrderId]);

  const milestones = [
    {
      step: 0,
      title: 'Order Confirmed',
      desc: 'Payment authorized and inventory allocated',
      date: 'Oct 10, 09:30 AM',
      icon: CheckCircle2,
    },
    {
      step: 1,
      title: 'Processing & Quality Inspection',
      desc: 'Tested and packaged securely with anti-shock foam',
      date: 'Oct 11, 02:15 PM',
      icon: Package,
    },
    {
      step: 2,
      title: 'In Transit with Express Courier',
      desc: 'Air transport dispatched & customs cleared',
      date: 'Oct 12, 06:45 PM',
      icon: Plane,
    },
    {
      step: 3,
      title: 'Out for Delivery / Delivered',
      desc: 'Courier driver en route to your shipping address',
      date: 'Estimated Oct 15',
      icon: Home,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange mx-auto flex items-center justify-center">
          <Truck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Live Order Tracking Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Enter your Order Number (e.g. <code className="bg-slate-100 text-slate-800 font-bold px-1.5 py-0.5 rounded">#ORD-9821</code>) to track your package across all international shipping milestones.
        </p>
      </div>

      {/* Tracking Input Form */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order # or Tracking Code"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-orange"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="sm:w-36 font-bold py-3"
            icon={Search}
          >
            Track Status
          </Button>
        </form>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Example test orders: #ORD-9821, #ORD-4491, #ORD-7720</span>
        </div>
      </div>

      {/* Active Tracking Milestones Card */}
      {activeOrder && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {activeOrder.orderId}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Active Shipment
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Carrier: <strong className="text-slate-800">{activeOrder.carrier}</strong> • Code: <strong className="text-slate-800">{activeOrder.trackingCode}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Delivery
              </span>
              <span className="text-base font-extrabold text-brand-orange block">
                {activeOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Milestone Step Progress Tracker */}
          <div className="relative py-4">
            {/* Progress line */}
            <div className="hidden sm:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-100 -z-0">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-brand-orange transition-all duration-500"
                style={{ width: `${(activeStep / (milestones.length - 1)) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
              {milestones.map((m) => {
                const Icon = m.icon;
                const isCompleted = activeStep >= m.step;
                const isCurrent = activeStep === m.step;

                return (
                  <div
                    key={m.step}
                    className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2 cursor-pointer group"
                    onClick={() => setActiveStep(m.step)}
                    title="Click to simulate this milestone"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-100 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-orange-500/20 bg-brand-orange text-white' : ''}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {m.desc}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                        {m.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Milestone Simulator Controls */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-semibold">
              Simulation Stage: <strong>Stage {activeStep + 1} of 4 ({milestones[activeStep].title})</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold disabled:opacity-40"
              >
                Previous Stage
              </button>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}
                disabled={activeStep === 3}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold disabled:opacity-40"
              >
                Next Stage
              </button>
            </div>
          </div>

          {/* Route Transit Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Dispatch Origin
              </span>
              <p className="font-semibold text-slate-800">{activeOrder.origin}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Destination Point
              </span>
              <p className="font-semibold text-slate-800">{activeOrder.destination}</p>
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed transit protection: Packages delayed over 14 business days qualify for express credits.</span>
          </div>
        </div>
      )}
    </div>
  );
};
