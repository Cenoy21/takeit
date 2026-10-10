import React, { createContext, useContext, useState, useEffect } from 'react';
import { FAKE_SALES_NOTIFICATIONS } from '../data/products';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [recentSale, setRecentSale] = useState(null);
  const [salesDismissed, setSalesDismissed] = useState(false);

  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // CRO Trigger: Fake Recent Sales Social Proof Toast (cycles every 22 seconds subtly)
  useEffect(() => {
    if (salesDismissed) return;

    let index = 0;
    const initialDelay = setTimeout(() => {
      setRecentSale(FAKE_SALES_NOTIFICATIONS[0]);
    }, 4000);

    const interval = setInterval(() => {
      index = (index + 1) % FAKE_SALES_NOTIFICATIONS.length;
      setRecentSale(FAKE_SALES_NOTIFICATIONS[index]);

      // Automatically hide after 6.5 seconds
      setTimeout(() => {
        setRecentSale(null);
      }, 6500);
    }, 24000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [salesDismissed]);

  const dismissRecentSale = () => {
    setRecentSale(null);
    setSalesDismissed(true);
  };

  const value = {
    toasts,
    addToast,
    removeToast,
    recentSale,
    dismissRecentSale,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
