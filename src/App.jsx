import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyMobileNav } from './components/layout/StickyMobileNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { TrackOrder } from './pages/TrackOrder';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Policies } from './pages/Policies';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-orange selection:text-white">
              <AnnouncementBar />
              <Navbar />
              <CartDrawer />
              <Toast />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/refund-policy" element={<Policies />} />
                  <Route path="/shipping-policy" element={<Policies />} />
                  <Route path="/terms-of-service" element={<Policies />} />
                  <Route path="/privacy-policy" element={<Policies />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>

              <Footer />
              <StickyMobileNav />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
