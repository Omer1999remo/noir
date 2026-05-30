import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Categories from './components/Categories'
import Arrivals from './components/Arrivals'
import Spotlight from './components/Spotlight'
import Stats from './components/Stats'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import CartSidebar from './components/CartSidebar'
import QuickViewModal from './components/QuickViewModal'
import MobileMenu from './components/MobileMenu'
import { CartProvider } from './hooks/useCart'
import { WishlistProvider } from './hooks/useWishlist'

// Pages
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Arrivals />
      <Spotlight />
      <Stats />
      <Newsletter />
    </>
  )
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setIsCartOpen(false)
        setIsMobileMenuOpen(false)
        setQuickViewProduct(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (isSearchOpen || isCartOpen || isMobileMenuOpen || quickViewProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSearchOpen, isCartOpen, isMobileMenuOpen, quickViewProduct])

  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="relative">
            <div className="noise" />
            <Cursor />

            <Navigation
              onSearchOpen={() => setIsSearchOpen(true)}
              onCartOpen={() => setIsCartOpen(true)}
              onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
            />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              </Routes>
            </main>

            <Footer />

            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              onCartOpen={() => {
                setIsMobileMenuOpen(false)
                setIsCartOpen(true)
              }}
            />

            <SearchOverlay
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onQuickView={(product) => {
                setQuickViewProduct(product)
                setIsSearchOpen(false)
              }}
            />

            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            <QuickViewModal
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
            />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
