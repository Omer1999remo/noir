import React, { useEffect, useState } from 'react'
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
import { CartProvider } from './hooks/useCart'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setIsCartOpen(false)
        setQuickViewProduct(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <CartProvider>
      <div className="relative">
        {/* Noise texture */}
        <div className="noise" />

        {/* Custom cursor */}
        <Cursor />

        {/* Navigation */}
        <Navigation
          onSearchOpen={() => setIsSearchOpen(true)}
          onCartOpen={() => setIsCartOpen(true)}
        />

        {/* Main content */}
        <main>
          <Hero />
          <Marquee />
          <Categories />
          <Arrivals onQuickView={setQuickViewProduct} />
          <Spotlight onQuickView={setQuickViewProduct} />
          <Stats />
          <Newsletter />
        </main>

        <Footer />

        {/* Overlays */}
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
    </CartProvider>
  )
}

export default App