export const calculatePercentageDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const calculateSavings = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Number((originalPrice - currentPrice).toFixed(2));
};

export const FREE_SHIPPING_THRESHOLD = 75.0;

export const calculateShippingRemaining = (subtotal) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  return {
    remaining: Number(remaining.toFixed(2)),
    progress,
    isQualified: subtotal >= FREE_SHIPPING_THRESHOLD,
  };
};
