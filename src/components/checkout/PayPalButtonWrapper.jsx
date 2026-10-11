import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/currencyFormatter';

export const PayPalButtonWrapper = ({
  amount,
  onSuccess,
  isFormValid,
  onValidateForm,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState(null);

  // Fallback simulator for rapid sandbox testing or offline evaluation
  const handleSimulatePayment = () => {
    if (!isFormValid) {
      onValidateForm();
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        payer: { name: 'Verified Customer' },
        paymentMethod: 'PayPal Express Sandbox',
        amount,
      });
    }, 1200);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3. Instant Secure Payment
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pay safely with PayPal, Credit/Debit Card, or Express Sandbox
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit SSL</span>
        </div>
      </div>

      <div className="min-h-[140px] flex flex-col justify-center">
        {paypalError ? (
          <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-3">
            Sandbox connection notice: Using guaranteed Instant Test Gateway below.
          </div>
        ) : null}

        {/* Live / Sandbox PayPal Provider */}
        <div className="w-full relative z-10">
          <PayPalScriptProvider
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
              currency: 'USD',
              intent: 'capture',
            }}
          >
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
                height: 44,
              }}
              disabled={!isFormValid}
              onClick={(data, actions) => {
                if (!isFormValid) {
                  onValidateForm();
                  return actions.reject();
                }
                return actions.resolve();
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: 'takeit Order',
                      amount: {
                        value: amount.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  onSuccess({
                    orderId: details.id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
                    payer: details.payer,
                    paymentMethod: 'PayPal Smart Button',
                    amount,
                  });
                });
              }}
              onError={(err) => {
                console.warn('PayPal script error or blocked:', err);
                setPaypalError(err);
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Guaranteed Sandbox Fast-Track Button */}
        <div className="pt-3 border-t border-slate-100 mt-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or Fast-Track Test Mode
            </span>
            <span className="h-px bg-slate-200 flex-1" />
          </div>

          <Button
            type="button"
            variant="dark"
            size="md"
            className="w-full text-xs font-bold py-3"
            onClick={handleSimulatePayment}
            isLoading={isProcessing}
            icon={Zap}
          >
            Instant Sandbox One-Click Test ({formatCurrency(amount)})
          </Button>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Simulates instant payment authorization without real credit card charge.
          </span>
        </div>
      </div>
    </div>
  );
};
