import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import AiDesigner from './pages/AiDesigner';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    let isVisible = false;

    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        if (!isVisible) {
          cursor.style.opacity = '1';
          isVisible = true;
        }
      }
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, .product-card, .expand-cursor')) {
        cursor?.classList.add('expand');
      } else {
        cursor?.classList.remove('expand');
      }
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = '1';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-sans relative">
            <div className="custom-cursor hidden md:block" id="custom-cursor"></div>
            <Navbar />
            <CartDrawer />

            {/* Main content area */}
            <main className="flex-1 pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/designer" element={<AiDesigner />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-sand py-24 px-8 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-16 mt-auto">
              <div className="col-span-1 md:col-span-2">
                <p className="font-serif text-3xl font-light tracking-[0.2em] text-white mb-6">ORM<span className="text-accent">A</span>N</p>
                <p className="text-sm leading-relaxed text-sand font-light max-w-xs">Doğadan ilham alan mobilya tasarımları. Her parça, evinize ömür boyu sürecek bir hikaye ekler.</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-sand font-medium mb-6">Koleksiyon</p>
                <ul className="flex flex-col gap-4">
                  <li><a href="/#products" className="text-sm text-sand/60 hover:text-white font-light transition-colors">Oturma Odası</a></li>
                  <li><a href="/#products" className="text-sm text-sand/60 hover:text-white font-light transition-colors">Yatak Odası</a></li>
                  <li><a href="/#products" className="text-sm text-sand/60 hover:text-white font-light transition-colors">Yemek Odası</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-sand font-medium mb-6">Hesabım</p>
                <ul className="flex flex-col gap-4">
                  <li><a href="/orders" className="text-sm text-sand/60 hover:text-white font-light transition-colors">Siparişlerim</a></li>
                  <li><a href="/favorites" className="text-sm text-sand/60 hover:text-white font-light transition-colors">Favorilerim</a></li>
                  <li><a href="#" className="text-sm text-sand/60 hover:text-white font-light transition-colors">+90 212 000 00 00</a></li>
                </ul>
              </div>
            </footer>
            <div className="bg-[#1A1208] py-6 px-8 md:px-24 flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-xs text-sand/40">© {new Date().getFullYear()} ORMAN Mobilya. Tüm hakları saklıdır.</p>
              <p className="text-xs text-sand/40">Gizlilik Politikası · Kullanım Koşulları</p>
            </div>
          </div>
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
