import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { PayPalButtonWrapper } from '../components/checkout/PayPalButtonWrapper';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Lock } from 'lucide-react';

export const Checkout = () => {
  const { items, cartSubtotal, isFreeShipping, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [errors, setErrors] = useState({});

  useSEO({
    title: 'Secure Checkout | takeit™ Store',
    description: 'Complete your direct order with 256-Bit SSL encryption, PayPal smart buttons, and tracked global shipping.',
  });

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required for shipment tracking';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required for courier delivery SMS';
    }
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State / Region is required';
    if (!formData.zip) newErrors.zip = 'Postal code is required';

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      addToast('Please complete all required shipping fields', 'error');
    }
    return isValid;
  };

  const isFormValid =
    formData.email.includes('@') &&
    formData.firstName &&
    formData.lastName &&
    formData.address &&
    formData.city &&
    formData.state &&
    formData.zip;

  const promoDiscountAmount = appliedPromo
    ? Number(((cartSubtotal * appliedPromo.discountPercent) / 100).toFixed(2))
    : 0;

  const finalTotal = Number((cartSubtotal - promoDiscountAmount + shippingFee).toFixed(2));

  const handlePaymentSuccess = (paymentDetails) => {
    const orderData = {
      orderId: paymentDetails.orderId || `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: formData,
      items: [...items],
      subtotal: cartSubtotal,
      shippingFee,
      discount: promoDiscountAmount,
      total: finalTotal,
      paymentMethod: paymentDetails.paymentMethod,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    // Store recent order in localStorage for tracking simulator
    try {
      localStorage.setItem('takeit_last_order', JSON.stringify(orderData));
    } catch (e) {
      console.error(e);
    }

    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Your cart is currently empty</h2>
        <p className="text-xs text-slate-500">Add products to your cart before proceeding to checkout.</p>
        <Link to="/catalog" className="inline-block pt-2 text-brand-orange font-bold text-sm underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link to="/cart" className="text-slate-400 hover:text-slate-800 p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Express Checkout
            </h1>
            <p className="text-xs text-slate-500">
              Encrypted SSL connection • Worldwide Tracked Shipping
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-bold">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">256-Bit Bank Level Encryption</span>
          <span className="sm:hidden">SSL Secure</span>
        </div>
      </div>

      {/* Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Shipping Form + PayPal Smart Button */}
        <div className="lg:col-span-7 space-y-6">
          <CheckoutForm
            formData={formData}
            onChange={handleFormChange}
            errors={errors}
          />

          <PayPalButtonWrapper
            amount={finalTotal}
            onSuccess={handlePaymentSuccess}
            isFormValid={isFormValid}
            onValidateForm={validateForm}
          />
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <OrderSummary
              items={items}
              subtotal={cartSubtotal}
              shippingFee={shippingFee}
              isFreeShipping={isFreeShipping}
              appliedPromo={appliedPromo}
              onApplyPromo={setAppliedPromo}
              onRemovePromo={() => setAppliedPromo(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
