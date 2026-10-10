# 🛍️ takeit™ — Multi-Product Dropshipping & CRO Store

A modern, production-grade, highly responsive Multi-Product Dropshipping E-Commerce Store built from scratch using **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, and **@paypal/react-paypal-js**.

---

## ✨ Features & CRO Architecture

### 🚀 High-Converting Dropshipping (CRO) Features
- **Dynamic Stock Scarcity**: Real-time inventory pill triggers (*"Only 3 items left in stock!"*).
- **Subtle Recent Sales Social Proof Ticker**: Non-intrusive toast notification cycling recent verified purchases.
- **Dynamic Free Shipping Threshold Progress Bar**: Visual progress bar in cart drawer & cart page with unlock animations.
- **Multi-Variant & Bundle Deals Selector**:
  - Color swatches with live preview rings.
  - Tiered quantity bundles: **Buy 2 Save 15%**, **Buy 3 Save 25%** (Proven AOV booster).
- **Security & Trust Badges**: 30-Day Money-Back Guarantee, 256-Bit SSL Encrypted Checkout, Free Global Tracking.
- **Live Order Tracking Simulator (`/track-order`)**: Milestone progression simulator (Order Confirmed → Processing → In Transit with Courier → Delivered).
- **PayPal Smart Buttons & Express Checkout**: Integrated with `@paypal/react-paypal-js` (Sandbox & 1-click test mode).
- **Dynamic SEO & Schema**: Built-in JSON-LD microdata (`Product`, `Offer`, `AggregateRating`) and OpenGraph metadata.

---

## 🛠️ Tech Stack

- **Build Tool**: Vite 8
- **UI Framework**: React 19 (ESM)
- **Routing**: `react-router-dom` v7 with automated `ScrollToTop`
- **Styling**: Tailwind CSS with custom glowing accents & responsive breakpoints
- **Icons**: `lucide-react`
- **Animations**: `framer-motion` & `canvas-confetti`
- **Payments**: `@paypal/react-paypal-js`
- **Coding Standard**: Arrow functions only (`const Component = () => { ... }`)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── assets/                          # Static brand assets
├── components/
│   ├── common/                      # Button, Input, Modal, Badge, StarRating, Logo, Toast
│   ├── layout/                      # Navbar, AnnouncementBar, Footer, StickyMobileNav
│   ├── cart/                        # CartDrawer, CartItem, FreeShippingBar
│   ├── product/                     # ProductCard, ProductGrid, ProductFilters, ImageGallery, VariantSelector, TrustBadges
│   └── checkout/                    # PayPalButtonWrapper, OrderSummary, CheckoutForm
├── context/                         # CartContext, WishlistContext, ToastContext (localStorage persistent)
├── data/                            # products.js (Flagship viral catalog with pricing, reviews, variants)
├── hooks/                           # useCart, useScrollLock, useSEO
├── pages/                           # Home, Catalog, ProductDetail, Cart, Checkout, OrderSuccess, TrackOrder, FAQ, Contact, Policies
├── utils/                           # currencyFormatter, calculateDiscounts, seoHelper
├── App.jsx                          # App routing & providers
├── index.css                        # Tailwind directives & utilities
└── main.jsx                         # App entry point
```

---

## 💳 Testing Checkout (Sandbox / Test Mode)

1. Add products to your cart and open the slide-over drawer or navigate to `/checkout`.
2. Enter your shipping address.
3. Test coupon codes:
   - **`TAKEIT15`** — 15% OFF
   - **`TAKEIT10`** — 10% OFF
4. Click **Instant Sandbox One-Click Test** to simulate an instant authorized payment, or test with your PayPal sandbox account.
5. Review the celebration screen at `/order-success` and test milestone tracking at `/track-order`.

---

## 📄 License
MIT License. © 2026 takeit Direct Innovations Inc. All rights reserved.
