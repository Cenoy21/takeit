import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../hooks/useSEO';

export const Contact = () => {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'Order Tracking & Delivery Inquiry',
    message: '',
  });

  useSEO({
    title: 'Contact Customer Support 24/7 | takeit™',
    description: 'Get in touch with our dedicated customer support desk. Guaranteed response in under 2 hours.',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Support ticket #TKT-' + Math.floor(1000 + Math.random() * 9000) + ' created successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange mx-auto flex items-center justify-center">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          24/7 Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have questions regarding shipping times, item specifications, or exchanges? We are here to help 24/7.
        </p>
      </div>

      {/* Grid: Form and Support Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Thank you for contacting takeit. One of our dedicated care specialists will email you back within 2 hours.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', orderNumber: '', subject: 'Order Tracking & Delivery Inquiry', message: '' });
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="Taylor Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="taylor@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Order Number (Optional)"
                  placeholder="#ORD-9821"
                  value={form.orderNumber}
                  onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Order Tracking & Delivery Inquiry">Order Tracking & Delivery</option>
                    <option value="30-Day Return / Exchange">30-Day Return / Exchange</option>
                    <option value="Product Specification Question">Product Specification Question</option>
                    <option value="Billing or Payment Inquiry">Billing or Payment Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  How Can We Help You?
                </label>
                <textarea
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please describe your question or issue in detail..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-lg shadow-orange-500/20"
                icon={Send}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Support Highlights Sidebar */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5">
            <h3 className="text-base font-bold">Support Guarantee</h3>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-brand-orange shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Under 2-Hour Response</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Average ticket resolution turnaround is 45 minutes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Direct Email</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">help@takeit.store</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-sky-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Dedicated Resolution</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">100% satisfaction guarantee on all customer inquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
