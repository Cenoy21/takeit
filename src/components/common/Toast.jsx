import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { toasts, removeToast, recentSale, dismissRecentSale } = useToast();

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  return (
    <>
      {/* Dynamic Toast Notifications (Top Right) */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100/80 text-slate-800"
            >
              <div className="flex items-center gap-3">
                {iconMap[toast.type] || iconMap.info}
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CRO Trigger: Fake Recent Sales Social Proof Toast (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full pointer-events-none hidden sm:block">
        <AnimatePresence>
          {recentSale && (
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
              className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-3.5 flex items-center gap-3.5 transition-shadow hover:shadow-orange-500/10"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange shrink-0 border border-orange-100">
                <ShoppingBag className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-slate-800 truncate">{recentSale.name}</span>
                  <span className="text-slate-400 font-normal">in {recentSale.location}</span>
                </div>
                <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">
                  Purchased <span className="text-slate-900 font-semibold">{recentSale.product}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Purchase
                  </span>
                  <span className="text-[10px] text-slate-400">{recentSale.time}</span>
                </div>
              </div>

              <button
                onClick={dismissRecentSale}
                className="text-slate-300 hover:text-slate-500 p-1 self-start"
                aria-label="Dismiss recent sale"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
