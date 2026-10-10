import React from 'react';
import { Input } from '../common/Input';
import { Mail, User, MapPin, Building, Phone, Truck } from 'lucide-react';

export const CheckoutForm = ({
  formData,
  onChange,
  errors = {},
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-6">
      {/* Contact Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Contact Details
          </h3>
          <span className="text-xs text-slate-400">Order confirmation will be sent here</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Phone Number (for Courier SMS updates)"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Shipping Address
          </h3>
          <span className="text-xs text-emerald-600 font-semibold">Worldwide Delivery Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            icon={User}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            icon={User}
            required
          />

          <div className="sm:col-span-2">
            <Input
              label="Street Address"
              name="address"
              placeholder="123 Innovation Boulevard"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              icon={MapPin}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Apartment, Suite, Unit (Optional)"
              name="apartment"
              placeholder="Apt 4B"
              value={formData.apartment}
              onChange={handleChange}
              icon={Building}
            />
          </div>

          <Input
            label="City"
            name="city"
            placeholder="Austin"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="State / Region"
              name="state"
              placeholder="TX"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
            />
            <Input
              label="ZIP / Postal"
              name="zip"
              placeholder="78701"
              value={formData.zip}
              onChange={handleChange}
              error={errors.zip}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Country / Destination
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
              >
                <option value="United States">United States (Fast Domestic Dispatch)</option>
                <option value="Canada">Canada (Express Postal)</option>
                <option value="United Kingdom">United Kingdom (Royal Mail Tracked)</option>
                <option value="Australia">Australia (AusPost Express)</option>
                <option value="Germany">Germany (DHL Express)</option>
                <option value="France">France (Colissimo)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method Preview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-50 text-brand-orange">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Global Express Tracked Delivery
            </span>
            <span className="text-[11px] text-slate-500 block">
              Estimated Transit: 5 - 9 Business Days (Full live tracking milestones)
            </span>
          </div>
        </div>
        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          Tracked & Insured
        </span>
      </div>
    </div>
  );
};
