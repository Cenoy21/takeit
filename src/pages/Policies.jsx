import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, FileText, Lock } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const Policies = () => {
  const location = useLocation();
  const path = location.pathname;

  let policyType = 'refund';
  if (path.includes('shipping')) policyType = 'shipping';
  if (path.includes('terms')) policyType = 'terms';
  if (path.includes('privacy')) policyType = 'privacy';

  useSEO({
    title: `${policyType.toUpperCase()} Policy | takeit™`,
    description: 'Read our transparent 30-day money-back guarantee, global transit times, privacy protections, and terms of service.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Policy Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <Link
          to="/refund-policy"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            policyType === 'refund' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>30-Day Refund Policy</span>
        </Link>

        <Link
          to="/shipping-policy"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            policyType === 'shipping' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Transit</span>
        </Link>

        <Link
          to="/privacy-policy"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            policyType === 'privacy' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy Policy</span>
        </Link>

        <Link
          to="/terms-of-service"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            policyType === 'terms' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </Link>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
        {policyType === 'refund' && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              30-Day Risk-Free Money-Back Guarantee
            </h1>
            <p className="text-slate-500">Last updated: October 2026</p>

            <h3 className="text-base font-bold text-slate-900">1. Our Promise to You</h3>
            <p className="text-slate-600">
              At takeit™, customer satisfaction is our highest metric. If for any reason you are not completely thrilled with your purchase within 30 days of receiving your item, you are eligible for an immediate return or exchange.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. How to Initiate a Return</h3>
            <p className="text-slate-600">
              Simply send an email to <strong className="text-slate-900">help@takeit.store</strong> with your order number (e.g. #ORD-9821). Our dedicated care team will issue a prepaid return merchandise authorization (RMA) label within 2 hours.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Refund Processing</h3>
            <p className="text-slate-600">
              Once your returned package is scanned by the courier, your full purchase price will be automatically refunded back to your original payment method (PayPal, Credit Card, Apple Pay) within 2-3 business days.
            </p>
          </div>
        )}

        {policyType === 'shipping' && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Worldwide Shipping & Transit Guidelines
            </h1>
            <p className="text-slate-500">Last updated: October 2026</p>

            <h3 className="text-base font-bold text-slate-900">1. Dispatch & Fulfillment</h3>
            <p className="text-slate-600">
              All orders are processed and inspected for quality at our regional logistics hubs within 24 to 48 business hours. You will receive an automated tracking link as soon as your package has been handed over to the courier.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Estimated Delivery Windows</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>United States:</strong> 5 - 8 Business Days (USPS Priority / DHL Express)</li>
              <li><strong>Canada & United Kingdom:</strong> 6 - 9 Business Days (Canada Post / Royal Mail)</li>
              <li><strong>Europe & Australia:</strong> 6 - 11 Business Days (DHL Express / AusPost)</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900">3. Customs & Import Duties</h3>
            <p className="text-slate-600">
              We ship DDP (Delivered Duty Paid). There are zero surprise import fees, customs charges, or extra delivery tariffs upon arrival.
            </p>
          </div>
        )}

        {policyType === 'privacy' && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Privacy & Security Policy
            </h1>
            <p className="text-slate-500">Last updated: October 2026</p>

            <p className="text-slate-600">
              takeit strictly respects customer privacy. We implement 256-bit SSL encryption across every checkout page and never sell, rent, or distribute personal customer information to third-party advertising brokers.
            </p>

            <h3 className="text-base font-bold text-slate-900">Payment Security</h3>
            <p className="text-slate-600">
              Payment credentials are processed directly through certified PCI-DSS Level 1 compliant processors (PayPal & Stripe). Our servers never store raw credit card numbers.
            </p>
          </div>
        )}

        {policyType === 'terms' && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Terms of Service
            </h1>
            <p className="text-slate-500">Last updated: October 2026</p>

            <p className="text-slate-600">
              By visiting our website and purchasing products from takeit, you engage in our service and agree to be bound by the following terms and conditions.
            </p>

            <h3 className="text-base font-bold text-slate-900">Accuracy of Information</h3>
            <p className="text-slate-600">
              We attempt to display colors, features, and specifications of our products as accurately as possible. If a product offered by us is not as described, your sole remedy is our 30-day return policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
