import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '../utils/calculateDiscounts';

const CartContext = createContext(null);

const STORAGE_KEY = 'takeit_store_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1, options = {}) => {
    const selectedColor = options.color || product.colors?.[0]?.name || 'Standard';
    const selectedBundle = options.bundle || product.bundles?.[0] || { name: 'Standard 1x Pack', qty: 1, discountPercent: 0 };
    
    // Calculate final unit price considering bundle discount if applicable
    const unitPrice = selectedBundle.discountPercent > 0
      ? Number((product.price * (1 - selectedBundle.discountPercent / 100)).toFixed(2))
      : product.price;

    const cartItemId = `${product.id}-${selectedColor}-${selectedBundle.id || 'std'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem = {
        cartItemId,
        productId: product.id,
        title: product.title,
        price: unitPrice,
        originalPrice: product.originalPrice,
        image: options.image || product.images[0],
        selectedColor,
        selectedBundle,
        quantity,
      };

      return [...prevItems, newItem];
    });

    setIsDrawerOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const cartSubtotal = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return Number(subtotal.toFixed(2));
  }, [items]);

  const cartOriginalTotal = useMemo(() => {
    const total = items.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
    return Number(total.toFixed(2));
  }, [items]);

  const cartSavings = useMemo(() => {
    const savings = Math.max(0, cartOriginalTotal - cartSubtotal);
    return Number(savings.toFixed(2));
  }, [cartOriginalTotal, cartSubtotal]);

  const cartTotalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartSubtotal === 0 ? 0 : (isFreeShipping ? 0 : 4.95);
  const orderTotal = Number((cartSubtotal + shippingFee).toFixed(2));

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    cartSubtotal,
    cartOriginalTotal,
    cartSavings,
    cartTotalCount,
    isFreeShipping,
    shippingFee,
    orderTotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
