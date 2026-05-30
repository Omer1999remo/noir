import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, Heart } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

export default function Navigation({ onSearchOpen, onCartOpen, onMobileMenuOpen }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const { cartCount } = useCart()
    const { wishlistCount } = useWishlist()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 ${isScrolled || location.pathname !== '/' ? 'bg-noir/95 backdrop-blur-xl py-4' : 'bg-transparent'
            }`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Mobile menu */}
                <button
                    onClick={onMobileMenuOpen}
                    className="md:hidden magnetic-link p-2 hover:text-electric transition-colors"
                    data-cursor="hover"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo */}
                <Link to="/" className="font-display text-2xl font-bold tracking-tighter magnetic-link md:absolute md:left-1/2 md:-translate-x-1/2" data-cursor="hover">
                    N<span className="text-electric">O</span>IR
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        Home
                    </Link>
                    <Link to="/shop" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        Shop
                    </Link>
                    <Link to="/wishlist" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors relative" data-cursor="hover">
                        Wishlist
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 text-[10px] text-electric">({wishlistCount})</span>
                        )}
                    </Link>
                    <Link to="/about" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        About
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onSearchOpen}
                        className="magnetic-link p-2 hover:text-electric transition-colors"
                        data-cursor="hover"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <Link
                        to="/wishlist"
                        className="magnetic-link p-2 hover:text-electric transition-colors relative hidden md:block"
                        data-cursor="hover"
                    >
                        <Heart className="w-5 h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-electric text-noir text-xs font-bold rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={onCartOpen}
                        className="magnetic-link p-2 hover:text-electric transition-colors relative"
                        data-cursor="hover"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-electric text-noir text-xs font-bold rounded-full flex items-center justify-center transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}