import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Truck, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currencyFormatter';
import { useSEO } from '../hooks/useSEO';

const DEFAULT_DEMO_ORDER = {
  orderId: '#ORD-984210',
  date: 'Oct 10, 2026',
  total: 79.99,
  paymentMethod: 'PayPal Express',
  customer: {
    firstName: 'Alex',
    lastName: 'Taylor',
    address: '742 Evergreen Terrace',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'United States',
    email: 'alex.taylor@example.com',
  },
  items: [
    {
      cartItemId: 'demo-1',
      title: 'takeit Pro Max Active Noise Cancelling Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
      price: 79.99,
      quantity: 1,
      selectedColor: 'Midnight Black',
    },
  ],
};

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve order data from location state or fallback to stored demo order
  const order = location.state?.order || (() => {
    try {
      const saved = localStorage.getItem('takeit_last_order');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_ORDER;
    } catch {
      return DEFAULT_DEMO_ORDER;
    }
  })() || DEFAULT_DEMO_ORDER;

  useSEO({
    title: `Order Confirmed ${order.orderId} | takeit™`,
    description: 'Your order has been authorized and dispatched to our regional fulfillment center. View real-time tracking milestones.',
  });

  // Launch celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#10b981', '#3b82f6', '#fbbf24'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Visual Celebration Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Payment Authorized & Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Thank You For Your Order!
        </h1>

        <p className="text-sm text-slate-600 max-w-md mx-auto">
          We have sent a full receipt and confirmation email to{' '}
          <strong className="text-slate-900 font-semibold">{order.customer?.email}</strong>.
        </p>

        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-mono font-bold shadow-md">
          <span>Order Reference:</span>
          <span className="text-brand-orange">{order.orderId}</span>
        </div>
      </motion.div>

      {/* Order Status & Tracking Call-To-Action Card */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-100 flex items-center justify-center sm:justify-start gap-1.5">
            <Truck className="w-4 h-4" />
            Global Express Transit
          </span>
          <h3 className="text-xl font-black">
            Estimated Delivery: 5 - 8 Business Days
          </h3>
          <p className="text-xs text-orange-100">
            Real-time milestones are live on our global tracking simulator.
          </p>
        </div>

        <Button
          variant="dark"
          size="md"
          className="shrink-0 bg-slate-950 text-white hover:bg-black font-bold text-xs px-5 py-3 shadow-lg"
          onClick={() => navigate(`/track-order?orderId=${encodeURIComponent(order.orderId)}`)}
          icon={ArrowRight}
          iconPosition="right"
        >
          Track Live Milestones
        </Button>
      </div>

      {/* Order Summary & Destination Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Order Details
        </h3>

        {/* Purchased Items */}
        <div className="divide-y divide-slate-100">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    Qty: {item.quantity} • {item.selectedColor}
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-900">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping Address Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              Delivery Destination:
            </span>
            <p className="text-slate-600 font-medium">
              {order.customer?.firstName} {order.customer?.lastName}<br />
              {order.customer?.address} {order.customer?.apartment ? `, ${order.customer.apartment}` : ''}<br />
              {order.customer?.city}, {order.customer?.state} {order.customer?.zip}<br />
              {order.customer?.country}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              Payment & Dispatch Info:
            </span>
            <p className="text-slate-600">
              Date: <strong className="text-slate-800">{order.date}</strong><br />
              Payment Method: <strong className="text-slate-800">{order.paymentMethod || 'PayPal Smart Button'}</strong><br />
              Total Charged: <strong className="text-slate-900 font-bold">{formatCurrency(order.total)}</strong>
            </p>
          </div>
        </div>

        {/* Trust Note */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50/70 p-3 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Covered by our 30-Day Money-Back Guarantee & Worldwide Transit Protection</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="text-center pt-4">
        <Link to="/catalog">
          <Button variant="secondary" size="md">
            Continue Browsing More Products
          </Button>
        </Link>
      </div>
    </div>
  );
};
